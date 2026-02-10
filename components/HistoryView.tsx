import React, { useMemo } from 'react';
import { Calendar, Award, TrendingUp } from 'lucide-react';
import { PrayerRecord } from '../types';
import { getTodayDateString, getDayOfWeek, formatDateBr } from '../utils';

interface HistoryViewProps {
  records: PrayerRecord[];
}

const HistoryView: React.FC<HistoryViewProps> = ({ records }) => {
  const today = getTodayDateString();

  // Generate last 7 days for the chart
  const weeklyData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      const isPrayed = records.some(r => r.date === dateStr);
      days.push({ date: dateStr, isPrayed, label: getDayOfWeek(dateStr) });
    }
    return days;
  }, [records]);

  const totalPrayers = records.length;
  
  // Calculate current streak (naive implementation)
  const streak = useMemo(() => {
    let count = 0;
    const sortedRecords = [...records].sort((a, b) => b.date.localeCompare(a.date));
    const todayRec = sortedRecords.find(r => r.date === today);
    
    // If prayed today, start count at 1, else 0 (but check yesterday)
    let currentDate = new Date();
    if (!todayRec) {
        currentDate.setDate(currentDate.getDate() - 1); // Start checking from yesterday
    }
    
    while (true) {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const checkStr = `${year}-${month}-${day}`;
        
        if (records.some(r => r.date === checkStr)) {
            count++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }
    return count;
  }, [records, today]);

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-500">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Sua Jornada</h2>
        <p className="text-slate-500">Acompanhe sua constância espiritual.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="bg-orange-100 p-2 rounded-full text-orange-600 mb-2">
                <TrendingUp size={20} />
            </div>
            <span className="text-2xl font-bold text-slate-800">{streak}</span>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Dias Seguidos</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-2 rounded-full text-blue-600 mb-2">
                <Award size={20} />
            </div>
            <span className="text-2xl font-bold text-slate-800">{totalPrayers}</span>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">Total de Orações</span>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center space-x-2 mb-6">
            <Calendar size={18} className="text-slate-400" />
            <h3 className="font-semibold text-slate-700">Últimos 7 dias</h3>
        </div>
        
        <div className="flex justify-between items-end h-32">
            {weeklyData.map((day) => (
                <div key={day.date} className="flex flex-col items-center space-y-2 w-full">
                    <div className="relative w-full flex justify-center h-full items-end">
                        <div 
                            className={`w-3 rounded-t-full transition-all duration-700 ease-out ${
                                day.isPrayed ? 'bg-primary-500 h-[80%]' : 'bg-slate-100 h-[20%]'
                            }`}
                        ></div>
                    </div>
                    <span className={`text-[10px] font-bold ${day.isPrayed ? 'text-primary-600' : 'text-slate-400'}`}>
                        {day.label}
                    </span>
                </div>
            ))}
        </div>
      </div>

      {/* Recent History List */}
      <div className="space-y-3">
        <h3 className="font-semibold text-slate-700 ml-1">Histórico Recente</h3>
        {records.length === 0 ? (
             <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <p>Nenhuma oração registrada ainda.</p>
             </div>
        ) : (
            [...records]
                .sort((a, b) => b.timestamp - a.timestamp)
                .slice(0, 5)
                .map((record) => (
                    <div key={record.date} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="bg-green-100 text-green-600 p-2 rounded-full">
                                <Award size={16} />
                            </div>
                            <div>
                                <p className="font-medium text-slate-800">Oração realizada</p>
                                <p className="text-xs text-slate-500">{formatDateBr(record.date)}</p>
                            </div>
                        </div>
                    </div>
                ))
        )}
      </div>
    </div>
  );
};

export default HistoryView;