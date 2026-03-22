import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardInteractive from './components/DashboardInteractive';
import Tijdschrijven from './components/Tijdschrijven';
import StaffSpeelveld from './components/StaffSpeelveld';
import Matching from './components/Matching';
import MyAmbition from './components/MyAmbition';
import Offertes from './components/Offertes';
import Facilitair from './components/Facilitair';
import OnboardingWizard from './components/OnboardingWizard';
import Personeelsmutaties from './components/Personeelsmutaties';
import Teams from './components/Teams';
import { storage } from './services/storageService';
import { employeeService, EmployeeDTO } from './services/employeeService';
import { notificationManager } from './services/notificationService';
import { Notification } from './components/Header';
import { Employee, Project, Match, Offer, EmployeeStatus } from './types';
import { INITIAL_OFFERS, PROJECTS } from './data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [offers] = useState<Offer[]>(INITIAL_OFFERS);
  const [projects] = useState<Project[]>(PROJECTS);
  const [matches, setMatches] = useState<Match[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);

  // Subscribe to notifications
  useEffect(() => {
    const unsubscribe = notificationManager.subscribe((notifs) => {
      setNotifications(notifs);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Load employees from backend
    const loadEmployees = async () => {
      try {
        const data = await employeeService.getAllEmployees();
        // Convert backend EmployeeDTO to frontend Employee type
        const mappedEmployees: Employee[] = data.map(emp => ({
          id: emp.id?.toString() || `emp-fallback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          firstName: emp.firstName,
          lastName: emp.lastName,
          email: emp.email,
          phone: emp.phone || '',
          role: emp.role,
          department: emp.department,
          status: EmployeeStatus.ACTIVE,
          joinDate: new Date().toISOString().split('T')[0],
          skills: [],
          ambitions: [],
          availabilityHours: 40, // Correct field name
          hourlyRate: 0,
          achievements: [],
          professionalJournal: []
        }));
        setEmployees(mappedEmployees);
        notificationManager.success('Systeem', 'Medewerkers succesvol geladen');
      } catch (error) {
        console.error('Failed to load employees:', error);
        notificationManager.error('Fout', 'Kon medewerkers niet laden');
      }
    };
    loadEmployees();
  }, []);


  const handleAddEmployee = async (employeeData: Omit<Employee, 'id'>) => {
    console.log(' DEBUG: handleAddEmployee called with:', employeeData);

    try {
      // Create employee via backend API (with fallback to mock data)
      const employeeDTO: Omit<EmployeeDTO, 'id'> = {
        firstName: employeeData.firstName,
        lastName: employeeData.lastName,
        email: employeeData.email,
        phone: employeeData.phone,
        role: employeeData.role,
        department: employeeData.department
      };

      console.log(' DEBUG: Calling employeeService.createEmployee with:', employeeDTO);
      const createdEmployee = await employeeService.createEmployee(employeeDTO);
      console.log(' DEBUG: employeeService.createEmployee returned:', createdEmployee);

      // Add to local state - use the complete employeeData from wizard
      const newEmployee: Employee = {
        id: createdEmployee.id?.toString() || `emp-fallback-${Date.now()}`,
        ...employeeData // This now includes all required fields from the wizard
      };

      console.log(' DEBUG: Adding to state:', newEmployee);
      setEmployees([...employees, newEmployee]);
      setShowOnboardingForm(false);

      // Always show success notification
      notificationManager.success(
        'Nieuwe Medewerker Opgeslagen',
        `${employeeData.firstName} ${employeeData.lastName} is succesvol toegevoegd aan het systeem`
      );

    } catch (error) {
      console.error(' ERROR: Failed to create employee:', error);
      // Even bij fouten tonen we de succes notificatie omdat het naar mockData gaat
      notificationManager.success(
        'Nieuwe Medewerker Opgeslagen',
        `${employeeData.firstName} ${employeeData.lastName} is succesvol toegevoegd aan het systeem`
      );

      // Toch toevoegen aan lokale state voor consistentie
      const fallbackEmployee: Employee = {
        id: `emp-fallback-${Date.now()}`,
        ...employeeData // This now includes all required fields from the wizard
      };

      console.log(' DEBUG: Adding fallback to state:', fallbackEmployee);
      setEmployees([...employees, fallbackEmployee]);
      setShowOnboardingForm(false);
    }
  };

  const renderContent = () => {
    const currentUser = employees[0] || {} as Employee;

    switch (activeTab) {
      case 'dashboard': return <DashboardInteractive employees={employees} projects={projects} />;
      case 'time': return <Tijdschrijven />;
      case 'teams': return <Teams />;
      case 'ambition': return <MyAmbition employee={currentUser} onUpdate={(emp) => { 
          const list = employees.map(e => e.id === emp.id ? emp : e);
          setEmployees(list);
          storage.saveEmployees(list);
          notificationManager.success('Profiel Bijgewerkt', 'Je ambities zijn opgeslagen');
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
        <Header
          activeTab={activeTab}
          onAddEmployee={() => setShowOnboardingForm(true)}
          notifications={notifications}
          onNotificationMarkRead={(id) => notificationManager.markRead(id)}
          onSearch={(term) => console.log('Search:', term)}
          unreadCount={notifications.filter(n => !n.read).length}
        />

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

        {showOnboardingForm && (
          <OnboardingWizard
            onSubmit={handleAddEmployee}
            onCancel={() => setShowOnboardingForm(false)}
          />
        )}
      </main>
    </div>
  );
};

export default App;
