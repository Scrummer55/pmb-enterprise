
export enum EmployeeStatus {
  ACTIVE = 'Active',
  ONBOARDING = 'Onboarding',
  OFFBOARDING = 'Offboarding',
  EXITED = 'Exited'
}

export type MutationType = 'Functiewijziging' | 'Salaris' | 'Contract' | 'Uitstroom' | 'Instroom';
export type MutationStatus = 'Concept' | 'Ingediend' | 'Verwerkt' | 'Afgebroken';

export interface Mutation {
  id: string;
  employeeId: string;
  type: MutationType;
  effectiveDate: string;
  status: MutationStatus;
  description: string;
  createdBy: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  leadId: string;
  memberIds: string[];
  projectIds: string[];
}

export enum Department {
  PMO = 'PMO',
  STRATEGY = 'Strategy',
  ENGINEERING = 'Engineering',
  OPERATIONS = 'Operations',
  HR = 'HR',
  COMMUNICATIE = 'Communicatie',
  SOCIAAL = 'Sociaal Domein'
}

export type OfferStatus = 'Concept' | 'Ter goedkeuring' | 'Goedgekeurd' | 'Verstuurd' | 'Geaccepteerd' | 'Afgewezen' | 'Verlopen';

export interface OfferItem {
  id: string;
  offerId: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  total: number;
  role: string;
}

export interface Offer {
  id: string;
  referenceNumber: string;
  projectId?: string;
  clientName: string;
  dateSubmitted: string;
  expiryDate: string;
  totalAmount: number;
  status: OfferStatus;
  onderwerp: string;
  items: OfferItem[];
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  department: string;
  status: EmployeeStatus;
  joinDate: string;
  exitDate?: string;
  currentProject?: string;
  skills: string[];
  ambitions: string[];
  availabilityHours: number;
  hourlyRate: number;
  performanceRating?: number;
  achievements: string[];
  professionalJournal?: { title?: string; entry: string; date: string }[];
  avatar?: string;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  clientName: string;
  managerId?: string;
  status: 'planning' | 'active' | 'completed' | 'onhold';
  progress: number;
  description?: string;
  requiredSkills: string[];
  requiredAvailability: string;
  maxRate?: number;
}

export interface Match {
  id: string;
  talentId: string;
  projectId: string;
  matchScore: number;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Activity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  userId?: string;
}
