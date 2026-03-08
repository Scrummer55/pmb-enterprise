
import React from 'react';
import { FileText, MoreVertical, Search, Filter, ArrowUpRight, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Offer, OfferStatus } from '../types';

const Offertes: React.FC<{ offers: Offer[] }> = ({ offers }) => {
  const getStatusColor = (status: OfferStatus) => {
    switch (status) {
      case 'Goedgekeurd': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Verstuurd': return 'bg-sky-50 text-sky-700 border-sky-100';
      case 'Concept': return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'Afgewezen': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-slate-50 text-slate-500 border-slate-100';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
          <input 
            type="text" 
            placeholder="Doorzoek offertes..."
            className="w-full pl-12 pr-6 py-3 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-100"
          />
        </div>
        <div className="flex gap-2">
          <button className="p-3 bg-slate-50 text-slate-500 rounded-2xl hover:bg-slate-100 transition-all"><Filter size={20} /></button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Referentie</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Onderwerp</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Klant</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Bedrag</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {offers.map((offer) => (
              <tr key={offer.id} className="hover:bg-slate-50/50 transition-all group">
                <td className="px-8 py-6 font-black text-slate-900">{offer.referenceNumber}</td>
                <td className="px-8 py-6">
                  <div className="text-sm font-bold text-slate-700">{offer.onderwerp}</div>
                  <div className="text-[10px] text-slate-400 font-medium">Ingediend: {offer.dateSubmitted}</div>
                </td>
                <td className="px-8 py-6 text-sm font-bold text-slate-600">{offer.clientName}</td>
                <td className="px-8 py-6 text-sm font-black text-slate-900">€ {offer.totalAmount.toLocaleString()}</td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getStatusColor(offer.status)}`}>
                    {offer.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="p-2 text-slate-300 hover:text-indigo-600 transition-colors"><ArrowUpRight size={20} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Offertes;
