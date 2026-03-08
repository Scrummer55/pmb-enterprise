
import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, ArrowUpRight, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Mutation, MutationStatus } from '../types';

const Personeelsmutaties: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const mockMutations: Mutation[] = [
        { id: 'MUT-001', employeeId: 'emp-1', type: 'Functiewijziging', effectiveDate: '2024-07-01', status: 'Verwerkt', description: 'Promotie naar Senior Projectleider', createdBy: 'HR Admin' },
        { id: 'MUT-002', employeeId: 'emp-2', type: 'Salaris', effectiveDate: '2024-08-01', status: 'Ingediend', description: 'Periodieke verhoging schaal 11', createdBy: 'Manager A' },
        { id: 'MUT-003', employeeId: 'emp-1', type: 'Contract', effectiveDate: '2024-09-01', status: 'Concept', description: 'Urenuitbreiding naar 36u', createdBy: 'HR Admin' },
    ];

    const getStatusUI = (status: MutationStatus) => {
        switch (status) {
            case 'Verwerkt': return { color: 'bg-black text-white', icon: CheckCircle };
            case 'Ingediend': return { color: 'bg-[#ED1C24] text-white', icon: Clock };
            case 'Concept': return { color: 'bg-white text-black border-2 border-black', icon: FileText };
            default: return { color: 'bg-slate-200 text-slate-600', icon: AlertCircle };
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center bg-white p-8 border-4 border-black ams-shadow">
                <div className="flex-1 max-w-2xl relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" size={24} strokeWidth={3} />
                    <input 
                        type="text" 
                        placeholder="ZOEK MUTATIES (NAAM, ID, TYPE)..."
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none font-black text-sm uppercase outline-none focus:ring-4 focus:ring-[#ED1C24]/10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <button className="p-4 border-4 border-black hover:bg-black hover:text-white transition-all"><Filter size={24} strokeWidth={3}/></button>
                    <button className="bg-black text-white px-10 py-4 font-black uppercase text-sm flex items-center gap-3 hover:bg-[#ED1C24] transition-all ams-shadow">
                        <Plus size={20} strokeWidth={4}/>
                        Nieuwe Mutatie
                    </button>
                </div>
            </div>

            <div className="bg-white border-4 border-black ams-shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black text-white">
                            <th className="p-8 text-[11px] font-black uppercase tracking-[0.3em]">ID & Type</th>
                            <th className="p-8 text-[11px] font-black uppercase tracking-[0.3em]">Omschrijving</th>
                            <th className="p-8 text-[11px] font-black uppercase tracking-[0.3em]">Ingangsdatum</th>
                            <th className="p-8 text-[11px] font-black uppercase tracking-[0.3em] text-center">Status</th>
                            <th className="p-8 text-[11px] font-black uppercase tracking-[0.3em] text-right">Actie</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-4 divide-black">
                        {mockMutations.map((mut) => {
                            const ui = getStatusUI(mut.status);
                            return (
                                <tr key={mut.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-8">
                                        <div className="text-xl font-black uppercase tracking-tight">{mut.id}</div>
                                        <div className="text-[10px] font-bold text-[#ED1C24] uppercase tracking-widest mt-1">{mut.type}</div>
                                    </td>
                                    <td className="p-8">
                                        <div className="text-sm font-bold text-black max-w-xs">{mut.description}</div>
                                        <div className="text-[10px] text-black/40 font-bold uppercase mt-1">Door: {mut.createdBy}</div>
                                    </td>
                                    <td className="p-8 font-black text-black">{mut.effectiveDate}</td>
                                    <td className="p-8">
                                        <div className="flex justify-center">
                                            <span className={`px-5 py-2 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest ${ui.color}`}>
                                                <ui.icon size={14} strokeWidth={3} />
                                                {mut.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-8 text-right">
                                        <button className="p-4 border-2 border-black hover:bg-[#ED1C24] hover:text-white transition-all">
                                            <ArrowUpRight size={20} strokeWidth={3} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Personeelsmutaties;
