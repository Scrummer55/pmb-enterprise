
import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Briefcase, CheckCircle2, Clock, Target, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard: React.FC<{ employees: any[], projects: any[] }> = ({ employees, projects }) => {
  const kpis = [
    { label: 'Uren deze week', value: '32.5', unit: 'HRS', sub: 'Norm: 36h', icon: Clock, color: 'black' },
    { label: 'Actieve Projecten', value: '04', unit: 'PRJ', sub: '2 deadlines', icon: Briefcase, color: 'red' },
    { label: 'Openstaande Taken', value: '12', unit: 'TSK', sub: '4 prioritair', icon: CheckCircle2, color: 'black' },
    { label: 'Verlof Saldo', value: '142', unit: 'HRS', sub: 'Wettelijk', icon: Target, color: 'red' },
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

  return (
    <div className="space-y-12 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {kpis.map((kpi, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            key={i} 
            className={`p-10 border-4 border-black relative overflow-hidden group ams-shadow-hover transition-all bg-white`}
          >
            <div className={`mb-8 flex justify-between items-start ${kpi.color === 'red' ? 'text-[#ED1C24]' : 'text-black'}`}>
              <kpi.icon size={32} strokeWidth={3} />
              <ArrowUpRight size={20} className="text-black/10 group-hover:text-black transition-colors" />
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 bg-white p-12 border-4 border-black ams-shadow">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h3 className="text-3xl font-black text-black uppercase tracking-tighter">Productiviteit Matrix</h3>
              <p className="text-[11px] font-bold text-black/40 uppercase tracking-[0.3em] mt-2 italic">Gerealiseerde uren per dag • Week 24</p>
            </div>
            <div className="text-right">
              <span className="text-5xl font-black text-black">82%</span>
              <p className="text-[10px] font-black text-[#ED1C24] uppercase tracking-widest">Efficiency</p>
            </div>
          </div>
          <div className="h-[400px]">
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
                    dy={20}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#000', fontSize: 12, fontWeight: 800}}
                />
                <Tooltip 
                  cursor={{stroke: '#000', strokeWidth: 4}}
                  contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '0', color: '#fff', padding: '20px' }} 
                  itemStyle={{ fontWeight: 900, textTransform: 'uppercase' }}
                />
                <Area 
                    type="stepAfter" 
                    dataKey="h" 
                    stroke="#ED1C24" 
                    strokeWidth={6} 
                    fillOpacity={1} 
                    fill="url(#colorH)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-black text-white p-12 ams-shadow flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-12">Taken Regie</h3>
            <div className="h-[250px] relative">
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie 
                        data={taskStatus} 
                        innerRadius={80} 
                        outerRadius={110} 
                        paddingAngle={5} 
                        dataKey="value"
                        stroke="none"
                    >
                    {taskStatus.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-5xl font-black">72%</span>
                <span className="text-[10px] font-bold text-[#ED1C24] uppercase tracking-widest">Done</span>
                </div>
            </div>
          </div>
          
          <div className="space-y-6 mt-12">
            {taskStatus.map(s => (
              <div key={s.name} className="flex justify-between items-center border-b border-white/10 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4" style={{ backgroundColor: s.color }}></div>
                  <span className="text-xs font-black tracking-widest uppercase">{s.name}</span>
                </div>
                <span className="text-lg font-black">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
