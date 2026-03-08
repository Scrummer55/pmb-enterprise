
import React from 'react';
import { 
  LayoutDashboard, Users, Briefcase, 
  LogOut, Target, Box, Calendar, ShieldCheck,
  TrendingUp, PieChart, Info, HelpCircle, FileText, UserPlus
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const sections = [
    {
      title: 'Medewerker',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'time', label: 'Urenregistratie', icon: Calendar },
        { id: 'projects', label: 'Mijn Projecten', icon: Briefcase },
        { id: 'teams', label: 'Mijn Teams', icon: Users },
        { id: 'ambition', label: 'Talent & Ambitie', icon: Target },
        { id: 'service', label: 'Facilitair Portaal', icon: Box },
      ]
    },
    {
      title: 'Back Office Staf',
      items: [
        { id: 'matching', label: 'Regie & Matching', icon: PieChart },
        { id: 'speelveld', label: 'Talent Speelveld', icon: UserPlus },
        { id: 'mutaties', label: 'Mutatiebeheer', icon: FileText },
        { id: 'fco', label: 'Financiën (FCO)', icon: TrendingUp },
        { id: 'hr', label: 'Personeel (HR)', icon: ShieldCheck },
      ]
    }
  ];

  return (
    <div className="w-80 bg-black h-screen flex flex-col sticky top-0 z-50 border-r-4 border-black text-white overflow-hidden">
      <div className="p-10 pb-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-[#ED1C24] w-12 h-12 flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_white]">
            X
          </div>
          <div>
            <h1 className="text-2xl font-extrabold leading-none tracking-tighter">
              TALENT<br/>PULSE
            </h1>
            <p className="text-[10px] font-bold text-[#ED1C24] uppercase mt-1 tracking-widest">Amsterdam PMB</p>
          </div>
        </div>
        <div className="flex gap-1.5 mb-4">
          <div className="h-1 flex-1 bg-[#ED1C24]"></div>
          <div className="h-1 flex-1 bg-white/20"></div>
          <div className="h-1 flex-1 bg-white/20"></div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-10 overflow-y-auto sidebar-scroll">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="px-6 text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 transition-all relative group ${
                    activeTab === item.id 
                      ? 'bg-[#ED1C24] text-white font-black' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <item.icon size={20} strokeWidth={activeTab === item.id ? 3 : 2} />
                  <span className="text-sm font-bold uppercase tracking-tight">{item.label}</span>
                  {activeTab === item.id && (
                    <motion.div layoutId="nav-pill" className="absolute left-0 w-2 h-full bg-white" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-8 bg-white/5 border-t border-white/10">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-white flex items-center justify-center font-black text-black text-xl">JS</div>
          <div className="flex-1">
            <p className="text-sm font-black uppercase truncate">Jan Smid</p>
            <p className="text-[9px] text-[#ED1C24] font-bold uppercase tracking-widest">Staff PMO</p>
          </div>
          <button className="text-white/20 hover:text-[#ED1C24] transition-colors"><LogOut size={20} /></button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
