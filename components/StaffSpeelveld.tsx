
import React, { useState } from 'react';
import { Search, Filter, Mail, Phone, Calendar, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StaffSpeelveld: React.FC<{ employees: any[] }> = ({ employees }) => {
  const [filter, setFilter] = useState('');

  const filtered = employees.filter(e => 
    `${e.firstName} ${e.lastName}`.toLowerCase().includes(filter.toLowerCase()) ||
    e.skills.some((s: string) => s.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Filter op talent, rol of vaardigheid..."
            className="w-full pl-14 pr-8 py-4 bg-slate-50 border-none rounded-2xl focus:ring-4 focus:ring-indigo-100 transition-all font-bold text-slate-700 placeholder:text-slate-300"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-600 font-black text-xs uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all">
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filtered.map((emp, i) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.05 }}
              key={emp.id} 
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all group overflow-hidden"
            >
              <div className="p-8 pb-4">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-indigo-500 to-indigo-700 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-indigo-100">
                    {emp.firstName[0]}{emp.lastName[0]}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">Beschikbaarheid</span>
                    <span className="text-lg font-black text-emerald-500">{emp.availabilityHours}h/w</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                  {emp.firstName} {emp.lastName}
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mt-1">{emp.role}</p>

                <div className="flex flex-wrap gap-1.5 mt-6">
                  {emp.skills.slice(0, 3).map((s: string) => (
                    <span key={s} className="bg-slate-50 text-slate-500 px-3 py-1.5 rounded-xl text-[10px] font-bold border border-slate-100">
                      {s}
                    </span>
                  ))}
                  {emp.skills.length > 3 && (
                    <span className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold">+{emp.skills.length - 3}</span>
                  )}
                </div>
              </div>

              <div className="mt-4 px-8 py-6 bg-slate-50 flex items-center justify-between border-t border-slate-100">
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                    <Mail size={16} />
                  </button>
                  <button className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                    <Calendar size={16} />
                  </button>
                </div>
                <button className="flex items-center gap-2 text-xs font-black text-indigo-600 hover:gap-4 transition-all uppercase tracking-widest">
                  Profiel
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StaffSpeelveld;
