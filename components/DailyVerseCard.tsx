import React from 'react';
import { Quote } from 'lucide-react';
import { Verse } from '../types';

interface DailyVerseCardProps {
  verse: Verse;
}

const DailyVerseCard: React.FC<DailyVerseCardProps> = ({ verse }) => {
  return (
    <div className="bg-gradient-to-br from-white to-primary-50 rounded-2xl p-6 shadow-sm border border-primary-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5">
        <Quote size={80} className="text-primary-600 transform rotate-12" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-3">
          <div className="h-1 w-8 bg-primary-400 rounded-full"></div>
          <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">Versículo do Dia</span>
        </div>
        
        <p className="text-slate-700 text-lg leading-relaxed font-medium italic mb-4">
          "{verse.text}"
        </p>
        
        <p className="text-slate-500 text-sm font-semibold text-right">
          — {verse.reference}
        </p>
      </div>
    </div>
  );
};

export default DailyVerseCard;