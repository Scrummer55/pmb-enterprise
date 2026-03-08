
import { Employee, EmployeeStatus, Project, Offer } from '../types';

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    firstName: 'Eva',
    lastName: 'de Groot',
    email: 'eva.degroot@pmo.nl',
    phone: '06-12345671',
    role: 'Projectleider Sociaal Domein',
    department: 'Sociaal Domein en Zorg',
    status: EmployeeStatus.ACTIVE,
    joinDate: '2022-03-15',
    currentProject: 'Green Energy Transition',
    skills: ['Stakeholdermanagement', 'Beleidsadvies', 'Agile'],
    ambitions: ['Programmamanagement', 'Leidinggevende rol'],
    availabilityHours: 8,
    hourlyRate: 75,
    performanceRating: 4.8,
    achievements: ['Project of the Year 2023'],
    professionalJournal: []
  },
  {
    id: 'emp-2',
    firstName: 'Mohammed',
    lastName: 'Ali',
    email: 'm.ali@pmo.nl',
    phone: '06-12345672',
    role: 'Adviseur Omgevingswet',
    department: 'Ruimtelijke Ordening',
    status: EmployeeStatus.ACTIVE,
    joinDate: '2023-01-10',
    currentProject: 'Digital Transformation II',
    skills: ['Omgevingswet', 'Juridisch Advies', 'Procesmanagement'],
    ambitions: ['Senior Adviseur'],
    availabilityHours: 16,
    hourlyRate: 80,
    performanceRating: 4.2,
    achievements: ['Data Wizard 2024']
  }
];

export const PROJECTS: Project[] = [
  { 
    id: 'p1', 
    code: 'AMS-HKDA-001',
    name: 'Huisvesting Kwetsbare Doelgroepen', 
    clientName: 'Gemeente Amsterdam', 
    status: 'active', 
    progress: 65,
    description: 'Analyse en uitvoering van huisvestingsstrategie in Noord.',
    requiredSkills: ['Stakeholdermanagement', 'Beleidsadvies'],
    requiredAvailability: 'full-time',
    maxRate: 80
  }
];

export const INITIAL_OFFERS: Offer[] = [
  { 
    id: 'offer-1', 
    referenceNumber: 'OFF2024-001', 
    clientName: 'Stadsontwikkeling', 
    dateSubmitted: '2024-07-15', 
    expiryDate: '2024-08-15', 
    totalAmount: 15000,
    status: 'Verstuurd',
    onderwerp: 'Analyse waterkwaliteit',
    items: [],
  }
];
