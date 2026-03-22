import React, { useState } from 'react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line
} from 'recharts';
import { Briefcase, CheckCircle2, Clock, Target, ArrowUpRight, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardInteractiveProps {
  employees: any[];
  projects: any[];
}

type DetailView = null | 'hours' | 'projects' | 'tasks' | 'leave';

const DashboardInteractive: React.FC<DashboardInteractiveProps> = ({ employees, projects }) => {
  const [selectedDetail, setSelectedDetail] = useState<DetailView>(null);
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('week');

  const kpis = [
    { label: 'Uren deze week', value: '32.5', unit: 'HRS', sub: 'Norm: 36h', icon: Clock, color: 'black', detail: 'hours' },
    { label: 'Actieve Projecten', value: '04', unit: 'PRJ', sub: '2 deadlines', icon: Briefcase, color: 'red', detail: 'projects' },
    { label: 'Openstaande Taken', value: '12', unit: 'TSK', sub: '4 prioritair', icon: CheckCircle2, color: 'black', detail: 'tasks' },
    { label: 'Verlof Saldo', value: '142', unit: 'HRS', sub: 'Wettelijk', icon: Target, color: 'red', detail: 'leave' },
  ];

  const timeData = [
    { name: 'MA', h: 8 }, { name: 'DI', h: 9 }, { name: 'WO', h: 6 },
    { name: 'DO', h: 8.5 }, { name: 'VR', h: 1 },
  ];

  const taskStatus = [
    { name: 'VOLTOOID', value: 70, color: '#000000' },
    { name: 'BEZIG', value: 20, color: '#ED1C24' },
    { name: 'TODO', value: 10, color: '#CCCCCC' },
  ];

  const projectDetails = [
    { name: 'Project Alpha', status: '75% complete', team: 5 },
    { name: 'Project Beta', status: '45% complete', team: 3 },
    { name: 'Project Gamma', status: '30% complete', team: 2 },
    { name: 'Project Delta', status: '90% complete', team: 4 },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {kpis.map((kpi, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            layoutId={`kpi-${i}`}
            whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
            onClick={() => setSelectedDetail(selectedDetail === kpi.detail ? null : (kpi.detail as DetailView))}
            className={`p-10 border-4 border-black relative overflow-hidden group cursor-pointer transition-all bg-white ${
              selectedDetail === kpi.detail ? 'ring-4 ring-[#ED1C24] ring-offset-2' : ''
            }`}
          >
            <div className={`mb-8 flex justify-between items-start ${kpi.color === 'red' ? 'text-[#ED1C24]' : 'text-black'}`}>
              <kpi.icon size={32} strokeWidth={3} />
              <motion.div
                animate={{ rotate: selectedDetail === kpi.detail ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight size={20} className="text-black/10 group-hover:text-black transition-colors" />
              </motion.div>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-7xl font-black tracking-tighter text-black leading-none">{kpi.value}</h3>
              <span className="text-sm font-black text-[#ED1C24]">{kpi.unit}</span>
            </div>
            <p className="text-[12px] font-black text-black/40 uppercase tracking-[0.2em] mt-4">{kpi.label}</p>
            <div className={`mt-8 h-2 w-full ${kpi.color === 'red' ? 'bg-[#ED1C24]' : 'bg-black'}`}></div>
          </motion.div>
        ))}
      </div>

      {/* Detail View */}
      <AnimatePresence>
        {selectedDetail && (
          <motion.div
            key={selectedDetail}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gradient-to-r from-[#ED1C24]/10 to-black/5 border-4 border-[#ED1C24] rounded-xl p-8"
          >
            {selectedDetail === 'projects' && (
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Projecten Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectDetails.map((proj, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white border-2 border-black p-4 rounded-lg"
                    >
                      <h4 className="font-black text-sm mb-2">{proj.name}</h4>
                      <div className="w-full bg-black/10 h-2 rounded-full mb-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-[#ED1C24]"
                          initial={{ width: 0 }}
                          animate={{ width: proj.status.split('%')[0] + '%' }}
                          transition={{ delay: idx * 0.1 + 0.3, duration: 0.8 }}
                        />
                      </div>
                      <div className="flex justify-between text-xs font-bold">
                        <span>{proj.status}</span>
                        <span>👥 {proj.team}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {selectedDetail === 'hours' && (
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Uren Analyse</h3>
                <div className="flex gap-4 mb-6">
                  {['week', 'month', 'year'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setDateRange(range as any)}
                      className={`px-4 py-2 font-black uppercase text-sm rounded transition-all ${
                        dateRange === range
                          ? 'bg-[#ED1C24] text-white'
                          : 'bg-white border-2 border-black text-black hover:bg-black/5'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-black/70 font-bold">Jij hebt een gemiddelde productiviteit van <span className="font-black text-[#ED1C24]">82%</span></p>
              </div>
            )}

            {selectedDetail === 'tasks' && (
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Taak Overzicht</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'VOLTOOID', value: 70, color: '#000000' },
                    { label: 'BEZIG', value: 20, color: '#ED1C24' },
                    { label: 'TODO', value: 10, color: '#CCCCCC' },
                  ].map((task, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white border-2 border-black p-4 rounded-lg text-center"
                    >
                      <div className="text-3xl font-black mb-2" style={{ color: task.color }}>
                        {task.value}%
                      </div>
                      <p className="text-xs font-bold uppercase">{task.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {selectedDetail === 'leave' && (
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Verlof Saldo</h3>
                <div className="bg-white border-2 border-black p-6 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-black/60 font-bold mb-1">TOTAAL RECHT</p>
                      <p className="text-3xl font-black">200 hrs</p>
                    </div>
                    <div>
                      <p className="text-xs text-black/60 font-bold mb-1">OPGENOMEN</p>
                      <p className="text-3xl font-black text-[#ED1C24]">58 hrs</p>
                    </div>
                  </div>
                  <div className="mt-4 w-full bg-black/10 h-3 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#ED1C24]"
                      initial={{ width: 0 }}
                      animate={{ width: '29%' }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    />
                  </div>
                  <p className="text-xs text-black/60 font-bold mt-3">142 hrs resterend (71%)</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white p-12 border-4 border-black rounded-xl"
        >
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-3xl font-black text-black uppercase tracking-tighter">Productiviteit</h3>
              <p className="text-[11px] font-bold text-black/40 uppercase tracking-[0.3em] mt-2">Gerealiseerde uren • Week 24</p>
            </div>
            <div className="text-right">
              <span className="text-5xl font-black text-black">82%</span>
              <p className="text-[10px] font-black text-[#ED1C24] uppercase tracking-widest">Efficiency</p>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeData}>
                <defs>
                  <linearGradient id="colorH" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ED1C24" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ED1C24" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#EEEEEE" />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{fill: '#000', fontSize: 12, fontWeight: 800}}
                />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#000', fontSize: 12, fontWeight: 800}} />
                <Tooltip
                  contentStyle={{border: '2px solid black', borderRadius: '8px', background: 'white'}}
                  formatter={(value: any) => [`${value}h`, 'Uren']}
                  cursor={{ stroke: '#ED1C24', strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="h"
                  stroke="#ED1C24"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorH)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-12 border-4 border-black rounded-xl"
        >
          <h3 className="text-3xl font-black text-black uppercase tracking-tighter mb-8">Taak Status</h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={taskStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {taskStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-3">
            {taskStatus.map((task, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{background: task.color}}></div>
                <span className="text-sm font-black text-black/70">{task.name}</span>
                <span className="ml-auto text-sm font-black">{task.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardInteractive;

