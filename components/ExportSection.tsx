
import React from 'react';
import { Employee } from '../types';
import { FileDown, Table, Database, CheckCircle2 } from 'lucide-react';

// For a real production app we would use 'xlsx' or 'file-saver'. 
// Here we implement a CSV downloader that adheres to Excel standards.

interface ExportSectionProps {
  employees: Employee[];
}

const ExportSection: React.FC<ExportSectionProps> = ({ employees }) => {
  
  const downloadExcelTemplate = () => {
    // Construct CSV Header and rows for Power BI / Power Apps ingestion
    const headers = [
      'EmployeeID', 'FirstName', 'LastName', 'Email', 'Role', 
      'Department', 'Status', 'JoinDate', 'ExitDate', 'CurrentProject', 
      'Skills', 'PerformanceRating'
    ];
    
    const rows = employees.map(e => [
      e.id,
      e.firstName,
      e.lastName,
      e.email,
      e.role,
      e.department,
      e.status,
      e.joinDate,
      e.exitDate || '',
      e.currentProject || '',
      e.skills.join(';'),
      e.performanceRating || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `PMO_HR_Export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-emerald-100 p-3 rounded-lg">
            <Database className="text-emerald-600" size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Power Model Export</h2>
            <p className="text-gray-500">Exporteer gegevens voor gebruik in Power Apps, Power Automate of Power BI.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Table size={20} className="text-indigo-500" />
              Dataset Specificaties
            </h3>
            <ul className="space-y-2">
              {[
                'Excel Template V2 Compatible',
                'Inclusief Instroom/Uitstroom tijdstempels',
                'UTF-8 Encoding voor speciale karakters',
                'Project-toewijzing mapping'
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-gray-500 mb-4">Gereed voor export ({employees.length} records)</p>
            <button
              onClick={downloadExcelTemplate}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-md active:scale-95"
            >
              <FileDown size={20} />
              Download .CSV voor Power BI
            </button>
            <p className="text-[10px] text-gray-400 mt-4 uppercase">Let op: CSV is het voorkeursformaat voor automatische Power Platform verwerking</p>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
        <h4 className="font-semibold text-indigo-900 mb-2">Hoe te gebruiken in Power Apps?</h4>
        <ol className="list-decimal list-inside space-y-2 text-sm text-indigo-800">
          <li>Download het CSV bestand via de knop hierboven.</li>
          <li>Open je Power Model App / SharePoint Lijst / Excel Online.</li>
          <li>Kies 'Gegevens importeren uit bestand'.</li>
          <li>Map de kolommen overeenkomstig de TalentPulse velden.</li>
        </ol>
      </div>
    </div>
  );
};

export default ExportSection;
