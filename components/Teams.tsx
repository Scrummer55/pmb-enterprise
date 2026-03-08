
import React from 'react';
import { Users, Folder, ChevronRight, UserPlus, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Teams: React.FC = () => {
    const mockTeams = [
        { id: 'T1', name: 'Team Sociaal Domein', lead: 'Eva de Groot', members: 12, projects: 4, active: true },
        { id: 'T2', name: 'Team Infrastructuur', lead: 'Mohammed Ali', members: 8, projects: 2, active: true },
        { id: 'T3', name: 'Strategie & Beleid', lead: 'Jan Smid', members: 5, projects: 1, active: false },
    ];

    return (
        <div className="space-y-12">
            <header className="flex justify-between items-end border-b-8 border-black pb-8">
                <div>
                    <h3 className="text-5xl font-black uppercase tracking-tighter">Mijn Teams</h3>
                    <p className="text-black/40 font-bold uppercase tracking-[0.3em] mt-2 italic">Operationele Eenheden PMB Amsterdam</p>
                </div>
                <button className="bg-[#ED1C24] text-white px-10 py-5 font-black uppercase text-sm tracking-widest ams-shadow hover:bg-black transition-all">
                    Nieuw Team Formeren
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {mockTeams.map((team, i) => (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        key={team.id}
                        className="bg-white border-4 border-black p-10 ams-shadow-hover group"
                    >
                        <div className="flex justify-between items-start mb-10">
                            <div className="bg-black text-white w-16 h-16 flex items-center justify-center font-black text-2xl">
                                {team.id}
                            </div>
                            {team.active && <div className="text-[#ED1C24]"><Star size={24} fill="currentColor" /></div>}
                        </div>
                        
                        <h4 className="text-3xl font-black uppercase tracking-tighter mb-2 group-hover:text-[#ED1C24] transition-colors">
                            {team.name}
                        </h4>
                        <div className="text-[10px] font-black text-black/40 uppercase tracking-widest mb-10">Lead: {team.lead}</div>

                        <div className="space-y-4 mb-12">
                            <div className="flex justify-between items-center border-b-2 border-black pb-2">
                                <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest">
                                    <Users size={16} strokeWidth={3} /> Leden
                                </span>
                                <span className="text-xl font-black">{team.members}</span>
                            </div>
                            <div className="flex justify-between items-center border-b-2 border-black pb-2">
                                <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest">
                                    <Folder size={16} strokeWidth={3} /> Lopende Opgaven
                                </span>
                                <span className="text-xl font-black">{team.projects}</span>
                            </div>
                        </div>

                        <button className="w-full py-5 bg-black text-white font-black uppercase text-xs tracking-[0.3em] hover:bg-[#ED1C24] transition-all flex items-center justify-center gap-4">
                            Details <ChevronRight size={16} strokeWidth={4} />
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Teams;
