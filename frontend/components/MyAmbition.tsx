
import React, { useState } from 'react';
import { Target, Zap, Award, Edit3, Plus, Trash2, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { Employee } from '../types';

interface AmbitionProps {
  employee: Employee;
  onUpdate: (data: Employee) => void;
}

const MyAmbition: React.FC<AmbitionProps> = ({ employee, onUpdate }) => {
  const [newSkill, setNewSkill] = useState('');
  const [journalEntry, setJournalEntry] = useState('');

  const addSkill = () => {
    if (!newSkill) return;
    onUpdate({ ...employee, skills: [...employee.skills, newSkill] });
    setNewSkill('');
  };

  const addLog = () => {
    if (!journalEntry) return;
    const entry = { entry: journalEntry, date: new Date().toISOString(), title: 'Nieuwe reflectie' };
    onUpdate({ ...employee, professionalJournal: [entry, ...(employee.professionalJournal || [])] });
    setJournalEntry('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 text-slate-50 opacity-10 pointer-events-none"><Target size={200} /></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1 space-y-8">
            <header>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Mijn Ambitie & Talent</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">Professional Growth Log</p>
            </header>

            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2"><Zap size={20} className="text-amber-500" />Mijn Vaardigheden</h3>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map(skill => (
                  <span key={skill} className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-2xl text-xs font-bold border border-indigo-100 flex items-center gap-2 group">
                    {skill}
                    <button onClick={() => onUpdate({...employee, skills: employee.skills.filter(s => s !== skill)})} className="opacity-0 group-hover:opacity-100 hover:text-rose-500 transition-all"><Trash2 size={14} /></button>
                  </span>
                ))}
                <div className="flex gap-2">
                  <input type="text" placeholder="Skill..." className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-1.5 text-xs focus:ring-2 focus:ring-indigo-100 outline-none" value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyPress={e => e.key === 'Enter' && addSkill()} />
                  <button onClick={addSkill} className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"><Plus size={16} /></button>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-8 border-t border-slate-50">
              <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2"><BookOpen size={20} className="text-emerald-500" />Professioneel Logboek</h3>
              <div className="space-y-4">
                <textarea 
                  placeholder="Wat heb je vandaag geleerd of bereikt?"
                  className="w-full p-6 bg-slate-50 border-none rounded-[2rem] text-sm focus:ring-4 focus:ring-indigo-100 outline-none min-h-[120px]"
                  value={journalEntry}
                  onChange={e => setJournalEntry(e.target.value)}
                />
                <button onClick={addLog} className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all">Notitie Opslaan</button>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                {employee.professionalJournal?.map((log, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">{new Date(log.date).toLocaleDateString()}</p>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">{log.entry}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-80 space-y-6">
            <div className="bg-indigo-600 text-white p-8 rounded-[2.5rem] shadow-xl shadow-indigo-100">
              <Award className="mb-4" size={32} />
              <h4 className="font-black text-xl mb-4">Achievements</h4>
              <div className="space-y-4">
                {employee.achievements.map((ach, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl backdrop-blur-sm">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">#</div>
                    <span className="text-xs font-bold">{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAmbition;
