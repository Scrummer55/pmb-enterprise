import React, { useState, useEffect } from 'react';
import { Employee, EmployeeStatus, Department } from '../types';
import { UserPlus, X, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnboardingWizardProps {
  onSubmit: (employee: Omit<Employee, 'id'>) => void;
  onCancel: () => void;
}

const STEPS = [
  { id: 1, label: 'Persoonlijke Gegevens', icon: '👤' },
  { id: 2, label: 'Functie Details', icon: '💼' },
  { id: 3, label: 'Bevestiging', icon: '✓' }
];

const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [draftSaved, setDraftSaved] = useState(false);
  const [formData, setFormData] = useState({
    firstName: localStorage.getItem('draft_firstName') || '',
    lastName: localStorage.getItem('draft_lastName') || '',
    email: localStorage.getItem('draft_email') || '',
    phone: localStorage.getItem('draft_phone') || '',
    role: localStorage.getItem('draft_role') || '',
    department: localStorage.getItem('draft_department') || Department.PMO,
    skills: [],
    availability: 40,
    hourlyRate: parseFloat(localStorage.getItem('draft_hourlyRate') || '0')
  });

  // Auto-save draft to localStorage
  useEffect(() => {
    localStorage.setItem('draft_firstName', formData.firstName);
    localStorage.setItem('draft_lastName', formData.lastName);
    localStorage.setItem('draft_email', formData.email);
    localStorage.setItem('draft_phone', formData.phone);
    localStorage.setItem('draft_role', formData.role);
    localStorage.setItem('draft_department', formData.department);
    localStorage.setItem('draft_hourlyRate', formData.hourlyRate.toString());

    setDraftSaved(true);
    const timer = setTimeout(() => setDraftSaved(false), 2000);
    return () => clearTimeout(timer);
  }, [formData]);

  const validateStep = (step: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'Voornaam is verplicht';
      if (!formData.lastName.trim()) newErrors.lastName = 'Achternaam is verplicht';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is verplicht';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Ongeldig email adres';
      }
    } else if (step === 2) {
      if (!formData.role.trim()) newErrors.role = 'Rol is verplicht';
      if (!formData.department) newErrors.department = 'Afdeling is verplicht';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🧪 DEBUG: OnboardingWizard handleSubmit called');

    if (validateStep(currentStep)) {
      console.log('🧪 DEBUG: Validation passed, transforming formData');

      // Transform formData to match Employee interface
      const employeeData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        department: formData.department,
        availabilityHours: formData.availability, // Correct field name
        hourlyRate: formData.hourlyRate,
        // Add default values for required Employee fields
        status: EmployeeStatus.ACTIVE,
        joinDate: new Date().toISOString().split('T')[0],
        skills: [],
        ambitions: [],
        achievements: [],
        professionalJournal: []
      };

      console.log('🧪 DEBUG: Calling onSubmit with:', employeeData);
      onSubmit(employeeData);

      // Clear draft
      localStorage.removeItem('draft_firstName');
      localStorage.removeItem('draft_lastName');
      localStorage.removeItem('draft_email');
      localStorage.removeItem('draft_phone');
      localStorage.removeItem('draft_role');
      localStorage.removeItem('draft_department');
      localStorage.removeItem('draft_hourlyRate');
    } else {
      console.log('🧪 DEBUG: Validation failed');
    }
  };

  const isFieldInvalid = (fieldName: string) => !!errors[fieldName];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full"
      >
        {/* Header */}
        <div className="p-8 border-b-4 border-black bg-gradient-to-r from-black to-[#ED1C24] text-white flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center text-2xl font-black">
              {STEPS[currentStep - 1].icon}
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Nieuwe Medewerker</h2>
              <p className="text-sm text-white/80 mt-1">Stap {currentStep} van {STEPS.length}</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-3 hover:bg-white/10 rounded-2xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex gap-3">
            {STEPS.map((step, idx) => (
              <motion.div
                key={step.id}
                className={`flex-1 h-2 rounded-full transition-all ${
                  idx + 1 <= currentStep ? 'bg-[#ED1C24]' : 'bg-black/10'
                }`}
                layoutId={`progress-${step.id}`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {STEPS.map((step) => (
              <span key={step.id} className="text-xs font-bold uppercase text-black/40">
                {step.label}
              </span>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 min-h-72">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-black text-black/60 uppercase tracking-widest mb-3">
                    Voornaam *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 border-4 rounded-xl font-bold text-lg transition-all ${
                      isFieldInvalid('firstName')
                        ? 'border-red-500 bg-red-50 focus:ring-red-100'
                        : 'border-black focus:ring-[#ED1C24]/20'
                    } focus:outline-none focus:ring-4`}
                    placeholder="Jan"
                  />
                  {isFieldInvalid('firstName') && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-600 text-sm font-bold mt-2 flex items-center gap-2">
                      <AlertCircle size={16} /> {errors.firstName}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-black text-black/60 uppercase tracking-widest mb-3">
                    Achternaam *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 border-4 rounded-xl font-bold text-lg transition-all ${
                      isFieldInvalid('lastName')
                        ? 'border-red-500 bg-red-50 focus:ring-red-100'
                        : 'border-black focus:ring-[#ED1C24]/20'
                    } focus:outline-none focus:ring-4`}
                    placeholder="Jansen"
                  />
                  {isFieldInvalid('lastName') && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-600 text-sm font-bold mt-2 flex items-center gap-2">
                      <AlertCircle size={16} /> {errors.lastName}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-black text-black/60 uppercase tracking-widest mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 border-4 rounded-xl font-bold text-lg transition-all ${
                      isFieldInvalid('email')
                        ? 'border-red-500 bg-red-50 focus:ring-red-100'
                        : 'border-black focus:ring-[#ED1C24]/20'
                    } focus:outline-none focus:ring-4`}
                    placeholder="jan.jansen@pmb.nl"
                  />
                  {isFieldInvalid('email') && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-600 text-sm font-bold mt-2 flex items-center gap-2">
                      <AlertCircle size={16} /> {errors.email}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-black text-black/60 uppercase tracking-widest mb-3">
                    Telefoon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-4 border-black rounded-xl font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#ED1C24]/20 transition-all"
                    placeholder="+31 6 12 345 678"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-black text-black/60 uppercase tracking-widest mb-3">
                    Rol *
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 border-4 rounded-xl font-bold text-lg transition-all ${
                      isFieldInvalid('role')
                        ? 'border-red-500 bg-red-50 focus:ring-red-100'
                        : 'border-black focus:ring-[#ED1C24]/20'
                    } focus:outline-none focus:ring-4`}
                    placeholder="Project Manager"
                  />
                  {isFieldInvalid('role') && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-red-600 text-sm font-bold mt-2 flex items-center gap-2">
                      <AlertCircle size={16} /> {errors.role}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-black text-black/60 uppercase tracking-widest mb-3">
                    Afdeling *
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full px-5 py-4 border-4 rounded-xl font-bold text-lg transition-all ${
                      isFieldInvalid('department')
                        ? 'border-red-500 bg-red-50'
                        : 'border-black focus:ring-[#ED1C24]/20'
                    } focus:outline-none focus:ring-4`}
                  >
                    <option value={Department.PMO}>PMO</option>
                    <option value={Department.STRATEGY}>Strategy</option>
                    <option value={Department.ENGINEERING}>Engineering</option>
                    <option value={Department.OPERATIONS}>Operations</option>
                    <option value={Department.HR}>HR</option>
                    <option value={Department.COMMUNICATIE}>Communicatie</option>
                    <option value={Department.SOCIAAL}>Sociaal Domein</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-black text-black/60 uppercase tracking-widest mb-3">
                    Beschikbare Uren (per week)
                  </label>
                  <input
                    type="number"
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-4 border-black rounded-xl font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#ED1C24]/20 transition-all"
                    placeholder="40"
                    min="0"
                    step="0.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-black/60 uppercase tracking-widest mb-3">
                    Uurtarief (€)
                  </label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border-4 border-black rounded-xl font-bold text-lg focus:outline-none focus:ring-4 focus:ring-[#ED1C24]/20 transition-all"
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-[#ED1C24]/10 border-4 border-[#ED1C24] rounded-xl p-6">
                  <h3 className="font-black text-lg uppercase tracking-tight mb-4 text-black">
                    Overzicht Medewerker
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-black/60 font-bold">Voornaam:</span>
                      <span className="font-black">{formData.firstName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/60 font-bold">Achternaam:</span>
                      <span className="font-black">{formData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/60 font-bold">Email:</span>
                      <span className="font-black text-sm">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-black/60 font-bold">Telefoon:</span>
                      <span className="font-black">{formData.phone || '-'}</span>
                    </div>
                    <div className="border-t-2 border-[#ED1C24] pt-3 mt-3">
                      <div className="flex justify-between mb-2">
                        <span className="text-black/60 font-bold">Rol:</span>
                        <span className="font-black">{formData.role}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-black/60 font-bold">Afdeling:</span>
                        <span className="font-black">{formData.department}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-black/60 font-bold">Uren/week:</span>
                        <span className="font-black">{formData.availability}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-black/60 font-bold">Uurtarief:</span>
                        <span className="font-black">€{formData.hourlyRate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-black/60 font-bold leading-relaxed">
                  Controleer alles goed en klik op "Medewerker Toevoegen" om door te gaan.
                  Je kunt altijd nog aanpassingen maken in het systeem.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Footer with Draft Saved indicator */}
        <div className="px-8 pb-8 flex items-center justify-between">
          {draftSaved && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest"
            >
              ✓ Concept opgeslagen
            </motion.span>
          )}
          <div className="flex-1" />

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-4 border-4 border-black text-black font-black uppercase tracking-widest hover:bg-black/5 transition-all rounded-xl"
            >
              Annuleren
            </button>

            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="px-8 py-4 border-4 border-black text-black font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all rounded-xl flex items-center gap-2"
              >
                <ChevronLeft size={20} />
                Terug
              </button>
            )}

            {currentStep < STEPS.length && (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-4 bg-black text-white font-black uppercase tracking-widest hover:bg-[#ED1C24] transition-all rounded-xl flex items-center gap-2 border-4 border-black"
              >
                Volgende
                <ChevronRight size={20} />
              </button>
            )}

            {currentStep === STEPS.length && (
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-8 py-4 bg-[#ED1C24] text-white font-black uppercase tracking-widest hover:bg-black transition-all rounded-xl border-4 border-black"
              >
                Medewerker Toevoegen
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingWizard;

