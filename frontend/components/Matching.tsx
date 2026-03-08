
import React, { useState } from 'react';
import { Zap, UserPlus, Search, Filter, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Employee, Project, Match } from '../types';

interface MatchingProps {
  employees: Employee[];
  projects: Project[];
  matches: Match[];
  onAddMatch: (match: Match) => void;
}

const Matching: React.FC<MatchingProps> = ({ employees, projects, matches, onAddMatch }) => {
  const [selectedTalent, setSelectedTalent] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<string>('');

  const calculateScore = (talentId: string, projectId: string) => {
    const talent = employees.find(e => e.id === talentId);
    const project = projects.find(p => p.id === projectId);
    if (!talent || !project) return 0;
    let score = 20;
    const matchSkills = talent.skills.filter(s => project.requiredSkills.includes(s)).length;
    score += (matchSkills / Math.max(project.requiredSkills.length, 1)) * 50;
    if (talent.hourlyRate <= (project.maxRate || 100)) score += 30;
    return Math.min(100, Math.round(score));
  };

  const handleCreateMatch = () => {
    if (!selectedTalent || !selectedProject) return;
    const score = calculateScore(selectedTalent, selectedProject);
    const newMatch: Match = {
      id: `match-${Date.now()}`,
      talentId: selectedTalent,
      projectId: selectedProject,
      matchScore: score,
      status: 'pending'
    };
    onAddMatch(newMatch);
    setSelectedTalent('');
    setSelectedProject('');
  };

  return (
    <div className="space-y-12">
      <div className="bg-black text-white p-12 ams-shadow border-l-[16px] border-[#ED1C24]">
        <h3 className="text-4xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4">
          <Zap className="text-[#ED1C24]" size={40} strokeWidth={3} />
          Capaciteitsregie & Matching
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">1. Selecteer Professional</label>
            <select 
              className="w-full p-6 bg-white/10 border-4 border-white/20 font-black text-xl uppercase text-white outline-none focus:border-[#ED1C24] transition-all appearance-none"
              value={selectedTalent}
              onChange={(e) => setSelectedTalent(e.target.value)}
            >
              <option value="" className="bg-black text-white">Selecteer Talent...</option>
              {employees.map(e => <option key={e.id} value={e.id} className="bg-black text-white">{e.firstName} {e.lastName}</option>)}
            </select>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">2. Selecteer Opgave</label>
            <select 
              className="w-full p-6 bg-white/10 border-4 border-white/20 font-black text-xl uppercase text-white outline-none focus:border-[#ED1C24] transition-all appearance-none"
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
            >
              <option value="" className="bg-black text-white">Kies Project...</option>
              {projects.map(p => <option key={p.id} value={p.id} className="bg-black text-white">{p.name}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button 
              onClick={handleCreateMatch}
              disabled={!selectedTalent || !selectedProject}
              className="w-full py-6 bg-[#ED1C24] text-white font-black text-lg uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-20 flex items-center justify-center gap-4"
            >
              <UserPlus strokeWidth={4} />
              Voorstel Maken
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence>
            {matches.map((match) => {
            const talent = employees.find(e => e.id === match.talentId);
            const project = projects.find(p => p.id === match.projectId);
            if (!talent || !project) return null;

            return (
                <motion.div 
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={match.id} 
                    className="bg-white p-10 border-4 border-black ams-shadow-hover relative group transition-all"
                >
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h4 className="font-black text-3xl tracking-tighter uppercase leading-none">{talent.firstName}<br/>{talent.lastName}</h4>
                            <p className="text-[10px] font-black text-black/40 uppercase tracking-widest mt-2">{talent.role}</p>
                        </div>
                        <div className="bg-[#ED1C24] text-white w-20 h-20 flex flex-col items-center justify-center ams-shadow">
                            <span className="text-2xl font-black leading-none">{match.matchScore}%</span>
                            <span className="text-[8px] font-bold uppercase mt-1">FIT</span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-[#F3F3F3] p-6 border-l-8 border-black">
                            <div className="text-[10px] font-black text-black/40 uppercase mb-1">Toewijzing aan:</div>
                            <div className="text-lg font-black uppercase tracking-tight truncate">{project.name}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t-4 border-black pt-6">
                            <div>
                                <span className="text-[9px] font-black text-black/40 uppercase tracking-widest block">Beschikbaarheid</span>
                                <span className="text-xl font-black">{talent.availabilityHours}u/w</span>
                            </div>
                            <div>
                                <span className="text-[9px] font-black text-black/40 uppercase tracking-widest block">Uurtarief</span>
                                <span className="text-xl font-black">€{talent.hourlyRate}</span>
                            </div>
                        </div>

                        <button className="w-full py-4 border-4 border-black font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all flex items-center justify-center gap-3">
                            Details Bekijken <ChevronRight size={16} strokeWidth={4} />
                        </button>
                    </div>
                </motion.div>
            );
            })}
        </AnimatePresence>
        
        {matches.length === 0 && (
            <div className="col-span-full py-32 flex flex-col items-center justify-center opacity-20 space-y-6">
                <div className="flex gap-4">
                    <span className="text-9xl font-black">X</span>
                    <span className="text-9xl font-black text-[#ED1C24]">X</span>
                    <span className="text-9xl font-black">X</span>
                </div>
                <p className="text-2xl font-black uppercase tracking-[0.4em]">Geen actieve matches gevonden</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Matching;
