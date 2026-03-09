
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Tijdschrijven from './components/Tijdschrijven';
import StaffSpeelveld from './components/StaffSpeelveld';
import Matching from './components/Matching';
import MyAmbition from './components/MyAmbition';
import Offertes from './components/Offertes';
import Facilitair from './components/Facilitair';
import OnboardingForm from './components/OnboardingForm';
import Personeelsmutaties from './components/Personeelsmutaties';
import Teams from './components/Teams';
import { storage } from './services/storageService';
import { employeeService, EmployeeDTO } from './services/employeeService';
import { Employee, Project, Match, Offer } from './types';
import { INITIAL_OFFERS, PROJECTS } from './data/mockData';
import { Bell, Search, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [offers] = useState<Offer[]>(INITIAL_OFFERS);
  const [projects] = useState<Project[]>(PROJECTS);
  const [matches, setMatches] = useState<Match[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);

  useEffect(() => {
    setEmployees(storage.getEmployees());
  }, []);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleAddEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      ...employeeData,
      id: `emp-${Date.now()}`,
    };
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    storage.saveEmployees(updatedEmployees);
    setShowOnboardingForm(false);
    notify("NIEUWE MEDEWERKER TOEGEVOEGD");
  };

  const renderContent = () => {
    const currentUser = employees[0] || {} as Employee;

    switch (activeTab) {
      case 'dashboard': return <Dashboard employees={employees} projects={projects} />;
      case 'time': return <Tijdschrijven />;
      case 'teams': return <Teams />;
      case 'ambition': return <MyAmbition employee={currentUser} onUpdate={(emp) => { 
          const list = employees.map(e => e.id === emp.id ? emp : e);
          setEmployees(list);
          storage.saveEmployees(list);
          notify("PROFIEL BIJGEWERKT");
      }} />;
      case 'speelveld': return <StaffSpeelveld employees={employees} />;
      case 'matching': return <Matching employees={employees} projects={projects} matches={matches} onAddMatch={(m) => setMatches([m, ...matches])} />;
      case 'mutaties': return <Personeelsmutaties />;
      case 'fco': return <Offertes offers={offers} />;
      case 'service': return <Facilitair />;
      default:
        return (
          <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
            <div className="flex gap-4">
              <span className="text-8xl font-black text-black/5">X</span>
              <span className="text-8xl font-black text-[#ED1C24]/10">X</span>
              <span className="text-8xl font-black text-black/5">X</span>
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Module in refinement</h2>
            <p className="text-black/40 font-bold uppercase tracking-widest">Sectie: {activeTab}</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-white selection:bg-[#ED1C24] selection:text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b-4 border-black px-12 py-10 flex justify-between items-center z-40">
          <div className="flex items-center gap-8">
            <div className="h-16 w-1.5 bg-[#ED1C24]"></div>
            <div>
              <h2 className="text-5xl font-black text-black tracking-tighter uppercase leading-none">
                {activeTab.replace('-', ' ')}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">Systeem Status:</span>
                <span className="w-2 h-2 bg-emerald-500"></span>
                <span className="text-[10px] font-extrabold uppercase text-emerald-600">Live</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center border-4 border-black p-1">
              <div className="px-4 py-3 bg-black text-white">
                <Search size={20} strokeWidth={3} />
              </div>
              <input 
                type="text" 
                placeholder="ZOEKEN..." 
                className="px-6 py-3 font-black uppercase text-sm w-64 outline-none placeholder:text-black/20"
              />
            </div>
            
            <button className="p-4 border-4 border-black hover:bg-[#ED1C24] hover:text-white transition-all group">
              <Bell size={24} strokeWidth={3} />
            </button>
            
            <button
              className="bg-black text-white px-10 py-5 font-black text-sm uppercase tracking-widest hover:bg-[#ED1C24] transition-all ams-shadow-hover flex items-center gap-4"
              onClick={() => setShowOnboardingForm(true)}
            >
              <Plus size={20} strokeWidth={4} />
              Nieuwe Employee
            </button>
          </div>
        </header>

        <div className="flex-1 p-12 overflow-y-auto grid-bg relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: "circOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className="fixed bottom-12 right-12 z-50 bg-black text-white p-1 border-l-[12px] border-[#ED1C24] shadow-2xl flex items-center gap-8 ams-shadow"
            >
              <div className="px-8 py-6">
                <div className="text-[10px] font-black text-[#ED1C24] uppercase tracking-[0.4em] mb-1">Systeem Melding</div>
                <span className="text-xl font-black uppercase tracking-tight">{notification}</span>
              </div>
              <div className="pr-8 text-4xl font-black text-white/10 italic">XXX</div>
            </motion.div>
          )}
        </AnimatePresence>

        {showOnboardingForm && (
          <OnboardingForm
            onSubmit={handleAddEmployee}
            onCancel={() => setShowOnboardingForm(false)}
          />
        )}
      </main>
    </div>
  );
};

export default App;
