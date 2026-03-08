
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Save, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const Tijdschrijven: React.FC = () => {
    const days = ['MA', 'DI', 'WO', 'DO', 'VR', 'ZA', 'ZO'];
    const projects = [
        { id: 'P1', name: 'ZUIDAS INFRA', code: 'AMS-2024-001' },
        { id: 'P2', name: 'DIGITAAL LOKET', code: 'AMS-2024-042' },
        { id: 'P3', name: 'GROENBEHEER OOST', code: 'AMS-2024-088' },
    ];

    const [hours, setHours] = useState<any>({});

    const handleUpdate = (pId: string, day: string, val: string) => {
        setHours({ ...hours, [`${pId}-${day}`]: val });
    };

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-4xl font-black uppercase tracking-tighter">Weekregistratie</h3>
                    <p className="text-black/40 font-bold uppercase tracking-[0.2em] mt-2">Week 24 • 10 Juni - 16 Juni 2024</p>
                </div>
                <div className="flex gap-4">
                    <button className="p-4 border-4 border-black hover:bg-black hover:text-white transition-all"><ChevronLeft strokeWidth={4} /></button>
                    <button className="p-4 border-4 border-black hover:bg-black hover:text-white transition-all"><ChevronRight strokeWidth={4} /></button>
                </div>
            </div>

            <div className="bg-white border-4 border-black ams-shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-black text-white">
                            <th className="p-8 text-[12px] font-black uppercase tracking-[0.3em] w-1/4">Project / Activiteit</th>
                            {days.map(d => (
                                <th key={d} className="p-8 text-[12px] font-black uppercase tracking-[0.3em] text-center border-l border-white/10">{d}</th>
                            ))}
                            <th className="p-8 text-[12px] font-black uppercase tracking-[0.3em] text-center border-l border-white/10 text-[#ED1C24]">TOTAAL</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y-4 divide-black">
                        {projects.map(p => (
                            <tr key={p.id} className="group hover:bg-[#F3F3F3]">
                                <td className="p-8 border-r-4 border-black">
                                    <div className="text-xl font-black uppercase tracking-tight">{p.name}</div>
                                    <div className="text-[10px] font-bold text-black/40 mt-1">{p.code}</div>
                                </td>
                                {days.map(d => (
                                    <td key={d} className="p-0 border-r-4 border-black relative">
                                        <input 
                                            type="number" 
                                            placeholder="0.0"
                                            className="w-full h-24 text-center text-2xl font-black bg-transparent outline-none focus:bg-white focus:text-[#ED1C24] transition-all placeholder:text-black/5"
                                            value={hours[`${p.id}-${d}`] || ''}
                                            onChange={(e) => handleUpdate(p.id, d, e.target.value)}
                                        />
                                    </td>
                                ))}
                                <td className="p-8 bg-black/5 text-center">
                                    <span className="text-2xl font-black">8.5</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="bg-[#F3F3F3] border-t-4 border-black font-black">
                            <td className="p-8 uppercase tracking-widest text-[12px]">Dagtotaal</td>
                            {days.map(d => (
                                <td key={d} className="p-8 text-center text-2xl">8.0</td>
                            ))}
                            <td className="p-8 text-center text-3xl text-[#ED1C24]">40.0</td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="flex justify-between items-center bg-[#ED1C24] p-10 ams-shadow text-white">
                <div className="flex items-center gap-6">
                    <AlertTriangle size={40} strokeWidth={3} />
                    <div>
                        <h4 className="text-2xl font-black uppercase italic">Validatie vereist</h4>
                        <p className="text-sm font-bold uppercase tracking-widest opacity-80">Je hebt 2.5 uur minder geregistreerd dan je contracturen.</p>
                    </div>
                </div>
                <button className="bg-black text-white px-12 py-5 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-4">
                    <Save size={20} strokeWidth={4} />
                    Uren Indienen
                </button>
            </div>
        </div>
    );
};

export default Tijdschrijven;
