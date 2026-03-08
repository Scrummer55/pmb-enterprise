
import React, { useState, useRef } from 'react';
import { Upload, FileType, CheckCircle2, AlertCircle, RefreshCw, Database } from 'lucide-react';
import { Employee, EmployeeStatus, Department } from '../types';
import { motion } from 'framer-motion';

interface ImportSectionProps {
  onImport: (newEmployees: Employee[]) => void;
}

const ImportSection: React.FC<ImportSectionProps> = ({ onImport }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'parsing' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (text: string) => {
    const lines = text.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    const results: Employee[] = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = values[index];
      });

      // Fixed: Added hourlyRate property to satisfy the required field in the Employee interface
      results.push({
        id: obj.EmployeeID || Math.random().toString(36).substr(2, 5),
        firstName: obj.FirstName || 'Unknown',
        lastName: obj.LastName || '',
        email: obj.Email || '',
        role: obj.Role || 'Consultant',
        department: (obj.Department as Department) || Department.PMO,
        status: (obj.Status as EmployeeStatus) || EmployeeStatus.ACTIVE,
        joinDate: obj.JoinDate || new Date().toISOString().split('T')[0],
        currentProject: obj.CurrentProject,
        skills: obj.Skills ? obj.Skills.split(';') : [],
        ambitions: obj.Ambitions ? obj.Ambitions.split(';') : [],
        availabilityHours: parseInt(obj.Availability) || 36,
        hourlyRate: parseFloat(obj.HourlyRate) || 0,
        performanceRating: parseFloat(obj.PerformanceRating) || 0,
        achievements: obj.Achievements ? obj.Achievements.split(';') : []
      });
    }
    return results;
  };

  const processFile = (file: File) => {
    setStatus('parsing');
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const newEmployees = parseCSV(text);
        onImport(newEmployees);
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      } catch (err) {
        setStatus('error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 text-slate-50 opacity-10 pointer-events-none">
          <Database size={200} />
        </div>
        
        <div className="relative z-10">
          <header className="mb-10">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Systeem Synchronisatie</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">Connect TalentPulse with Power Model</p>
          </header>

          <div 
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); if(e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]); }}
            className={`relative border-4 border-dashed rounded-[2.5rem] p-20 transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
              isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-100 hover:border-indigo-400 bg-slate-50/50'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input type="file" ref={fileInputRef} onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])} className="hidden" accept=".csv" />
            
            {status === 'idle' && (
              <>
                <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200 mb-6 text-indigo-600">
                  <Upload size={40} />
                </div>
                <p className="text-slate-900 text-xl font-black mb-2 tracking-tight">Sleep je Power Model export hiernaartoe</p>
                <p className="text-slate-400 text-sm font-medium">Ondersteunt .CSV geëxporteerd vanuit Power BI of SharePoint</p>
              </>
            )}

            {status === 'parsing' && (
              <div className="flex flex-col items-center">
                <RefreshCw className="text-indigo-600 animate-spin mb-6" size={48} />
                <p className="text-slate-900 font-black text-xl">Data wordt gesynchroniseerd...</p>
              </div>
            )}

            {status === 'success' && (
              <div className="flex flex-col items-center">
                <CheckCircle2 className="text-emerald-500 mb-6" size={64} />
                <p className="text-emerald-700 font-black text-xl">Sync Voltooid!</p>
                <p className="text-emerald-600 text-sm font-medium">De lokale database is nu volledig up-to-date.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportSection;
