
import React, { useState } from 'react';
import { Employee, EmployeeStatus } from '../types';
import { UserPlus, X } from 'lucide-react';

interface OnboardingFormProps {
  onSubmit: (employee: Omit<Employee, 'id'>) => void;
  onCancel: () => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    department: '',
//     status: EmployeeStatus.ONBOARDING,
//     joinDate: new Date().toISOString().split('T')[0],
//     currentProject: '',
//     skills: '',
//     ambitions: '',
//     availabilityHours: 0,
//     hourlyRate: 0,
//     performanceRating: 0,
//     achievements: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as any); // Temporary: alleen backend velden
  };
// return a modal form for onboarding a new employee, with fields for personal and job-related information. The form should have a header with an icon and title, and buttons to submit or cancel the form. The form should be styled with Tailwind CSS for a modern look and feel.
  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <UserPlus className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Nieuwe Medewerker</h2>
              <p className="text-sm text-slate-600 font-medium">Voeg een nieuwe medewerker toe aan het systeem</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-3 hover:bg-white rounded-2xl transition-all text-slate-400 hover:text-slate-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Persoonlijke Gegevens */}
            <div className="md:col-span-2">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Persoonlijke Gegevens</h3>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Voornaam *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Achternaam *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Telefoon</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            {/* Functie Gegevens */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Functie Gegevens</h3>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Rol *</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Afdeling *</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div>

            {/* Temporary uitgecommentarieerd - nog niet in backend model */}
            {/* <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              >
                <option value={EmployeeStatus.ONBOARDING}>Onboarding</option>
                <option value={EmployeeStatus.ACTIVE}>Active</option>
                <option value={EmployeeStatus.OFFBOARDING}>Offboarding</option>
                <option value={EmployeeStatus.EXITED}>Exited</option>
              </select>
            </div> */}

            {/* <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Startdatum *</label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div> */}

            {/* <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Huidig Project</label>
              <input
                type="text"
                name="currentProject"
                value={formData.currentProject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div> */}

            {/* <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Beschikbare Uren *</label>
              <input
                type="number"
                name="availabilityHours"
                value={formData.availabilityHours}
                onChange={handleChange}
                required
                min="0"
                step="0.5"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div> */}

            {/* <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Uurtarief (€) *</label>
              <input
                type="number"
                name="hourlyRate"
                value={formData.hourlyRate}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div> */}

            {/* <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Performance Rating (0-5)</label>
              <input
                type="number"
                name="performanceRating"
                value={formData.performanceRating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all"
              />
            </div> */}

            {/* Skills & Ambities */}
            {/* <div className="md:col-span-2 mt-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Skills & Ontwikkeling</h3>
            </div> */}

            {/* <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Skills (comma-separated)</label>
              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows={2}
                placeholder="bijv. Projectmanagement, Agile, Stakeholdermanagement"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
              />
            </div> */}

            {/* <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Ambities (comma-separated)</label>
              <textarea
                name="ambitions"
                value={formData.ambitions}
                onChange={handleChange}
                rows={2}
                placeholder="bijv. Senior Consultant, Teamleider"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
              />
            </div> */}

            {/* <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Prestaties (comma-separated)</label>
              <textarea
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                rows={2}
                placeholder="bijv. Project of the Year 2023, Best Performer Q4"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all resize-none"
              />
            </div> */}
          </div>

          <div className="flex gap-4 mt-8 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-all"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Medewerker Toevoegen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;
