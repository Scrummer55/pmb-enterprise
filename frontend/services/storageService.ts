
import { Employee, Activity } from '../types';
import { INITIAL_EMPLOYEES } from '../data/mockData';

const EMPLOYEES_KEY = 'talpulse_employees';
const ACTIVITIES_KEY = 'talpulse_activities';

export const storage = {
  getEmployees: (): Employee[] => {
    const data = localStorage.getItem(EMPLOYEES_KEY);
    return data ? JSON.parse(data) : INITIAL_EMPLOYEES;
  },
  saveEmployees: (employees: Employee[]) => {
    localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
  },
  getActivities: (): Activity[] => {
    const data = localStorage.getItem(ACTIVITIES_KEY);
    return data ? JSON.parse(data) : [];
  },
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const activities = storage.getActivities();
    const newActivity: Activity = {
      ...activity,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify([newActivity, ...activities].slice(0, 50)));
  }
};
