
import React from 'react';
import { Gift, Car, Laptop, HelpCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  { id: 'bloemen', label: 'Bloemen & Cadeau', icon: Gift, color: 'rose', desc: 'Bestel een attentie voor een collega of klant.' },
  { id: 'auto', label: 'Auto Reserveren', icon: Car, color: 'indigo', desc: 'Reserveer een deelauto voor projectbezoeken.' },
  { id: 'ict', label: 'ICT Support', icon: Laptop, color: 'sky', desc: 'Vraag nieuwe hardware aan of meld een defect.' },
  { id: 'overig', label: 'Overige Aanvraag', icon: HelpCircle, color: 'slate', desc: 'Staat je verzoek er niet bij? Gebruik dit formulier.' },
];

const Facilitair: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <header>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Facilitaire Diensten</h2>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-2">Selecteer een dienst om een aanvraag te starten</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((s, i) => (
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={s.id}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all text-left flex gap-6 items-center group"
          >
            <div className={`p-5 rounded-3xl bg-${s.color}-50 text-${s.color}-600 group-hover:scale-110 transition-transform`}>
              <s.icon size={32} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-black text-slate-900">{s.label}</h3>
              <p className="text-sm text-slate-400 font-medium mt-1 leading-relaxed">{s.desc}</p>
            </div>
            <ArrowRight className="text-slate-200 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all" size={24} />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Facilitair;
