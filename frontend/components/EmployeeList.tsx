
import React, { useState } from 'react';
import { Employee, EmployeeStatus } from '../types';
import { Search, Filter, MoreVertical, Edit2, Trash2, Mail, ExternalLink, ArrowUpDown } from 'lucide-react';
import { generatePerformanceSummary } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

interface EmployeeListProps {
  employees: Employee[];
}

const EmployeeList: React.FC<EmployeeListProps> = ({ employees }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [summary, setSummary] = useState<{ [key: string]: string }>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredEmployees = employees.filter(e => 
    `${e.firstName} ${e.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGenerateSummary = async (emp: Employee) => {
    setLoadingId(emp.id);
    const text = await generatePerformanceSummary(emp);
    setSummary(prev => ({ ...prev, [emp.id]: text }));
    setLoadingId(null);
  };

  const getStatusStyle = (status: EmployeeStatus) => {
    switch (status) {
      case EmployeeStatus.ACTIVE: return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case EmployeeStatus.ONBOARDING: return 'bg-sky-50 text-sky-700 border-sky-100';
      case EmployeeStatus.OFFBOARDING: return 'bg-amber-50 text-amber-700 border-amber-100';
      case EmployeeStatus.EXITED: return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/30">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Zoek in talent pool..."
            className="w-full pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-medium text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 text-slate-600 transition-all font-bold text-sm shadow-sm">
            <Filter size={18} />
            <span>Project Filter</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 text-slate-600 transition-all font-bold text-sm shadow-sm">
            <ArrowUpDown size={18} />
            <span>Sorteer</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Expertise</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Huidige Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Unit</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">AI Talent Insights</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <AnimatePresence>
              {filteredEmployees.map((emp) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={emp.id} 
                  className="group hover:bg-indigo-50/20 transition-all"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-indigo-100">
                        {emp.firstName[0]}{emp.lastName[0]}
                      </div>
                      <div>
                        <div className="font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">{emp.firstName} {emp.lastName}</div>
                        <div className="text-xs font-bold text-slate-400 flex items-center gap-1 uppercase tracking-wider mt-0.5">
                          {emp.role}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest border ${getStatusStyle(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-bold text-slate-700">{emp.department}</div>
                    <div className="text-[10px] text-slate-400 font-medium truncate max-w-[120px]">
                      {emp.currentProject || 'Bench'}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    {summary[emp.id] ? (
                      <div className="text-xs text-slate-600 leading-relaxed max-w-[280px] bg-slate-50 p-3 rounded-xl italic">
                        "{summary[emp.id]}"
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleGenerateSummary(emp)}
                        disabled={loadingId === emp.id}
                        className="group/ai flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-50"
                      >
                        {loadingId === emp.id ? (
                          <span className="flex items-center gap-2">
                            <span className="animate-pulse">Analysing...</span>
                          </span>
                        ) : (
                          <>
                            <span className="group-hover/ai:animate-bounce">⚡</span>
                            <span>Genereer Insight</span>
                          </>
                        )}
                      </button>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-md transition-all shadow-sm">
                        <Mail size={16} />
                      </button>
                      <button className="p-2.5 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-md transition-all shadow-sm">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      {filteredEmployees.length === 0 && (
        <div className="p-20 text-center">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="text-slate-300" size={32} />
          </div>
          <h4 className="text-slate-900 font-bold mb-1">Geen resultaten gevonden</h4>
          <p className="text-slate-400 text-sm">Probeer een andere zoekterm of verwijder je filters.</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
