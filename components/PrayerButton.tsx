import React from 'react';
import { Heart, Check } from 'lucide-react';

interface PrayerButtonProps {
  isPrayed: boolean;
  onPray: () => void;
}

const PrayerButton: React.FC<PrayerButtonProps> = ({ isPrayed, onPray }) => {
  return (
    <div className="flex flex-col items-center justify-center my-8">
      <button
        onClick={onPray}
        disabled={isPrayed}
        className={`relative group w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl ${
          isPrayed 
            ? 'bg-green-500 shadow-green-200 cursor-default' 
            : 'bg-gradient-to-b from-primary-400 to-primary-600 shadow-primary-200 hover:scale-105 active:scale-95'
        }`}
      >
        {/* Pulse effect when not prayed */}
        {!isPrayed && (
          <span className="absolute w-full h-full rounded-full bg-primary-400 opacity-20 animate-ping"></span>
        )}
        
        <div className="flex flex-col items-center text-white z-10">
          {isPrayed ? (
            <>
              <Check size={48} className="mb-2 animate-[bounce_0.5s_ease-out]" strokeWidth={3} />
              <span className="font-bold text-lg">Amém!</span>
              <span className="text-xs opacity-90">Oração Registrada</span>
            </>
          ) : (
            <>
              <Heart size={48} className="mb-2 fill-white/20" />
              <span className="font-bold text-xl">Já orei hoje</span>
              <span className="text-xs opacity-80 mt-1">Toque para confirmar</span>
            </>
          )}
        </div>
      </button>
      
      {!isPrayed && (
        <p className="text-slate-400 text-sm mt-6 animate-pulse">
          Reserve um momento para Deus
        </p>
      )}
      
      {isPrayed && (
        <p className="text-green-600 font-medium text-sm mt-6">
          Sua paz começa na oração.
        </p>
      )}
    </div>
  );
};

export default PrayerButton;