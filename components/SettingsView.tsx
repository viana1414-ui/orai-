import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Clock, Info } from 'lucide-react';
import { UserSettings } from '../types';

interface SettingsViewProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdateSettings }) => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>(Notification.permission);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert("Este navegador não suporta notificações.");
      return;
    }
    const permission = await Notification.requestPermission();
    setPermissionStatus(permission);
    if (permission === 'granted') {
      onUpdateSettings({ ...settings, notificationsEnabled: true });
    } else {
      onUpdateSettings({ ...settings, notificationsEnabled: false });
    }
  };

  const handleToggleNotifications = () => {
    if (!settings.notificationsEnabled) {
      if (permissionStatus === 'granted') {
        onUpdateSettings({ ...settings, notificationsEnabled: true });
      } else {
        requestPermission();
      }
    } else {
      onUpdateSettings({ ...settings, notificationsEnabled: false });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSettings({ ...settings, notificationTime: e.target.value });
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-500">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Ajustes</h2>
        <p className="text-slate-500">Personalize sua experiência.</p>
      </header>

      {/* Notifications Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${settings.notificationsEnabled ? 'bg-primary-100 text-primary-600' : 'bg-slate-100 text-slate-400'}`}>
               {settings.notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
            </div>
            <div>
              <p className="font-semibold text-slate-700">Lembretes Diários</p>
              <p className="text-xs text-slate-500">Receba mensagens espirituais</p>
            </div>
          </div>
          
          <button 
            onClick={handleToggleNotifications}
            className={`w-12 h-7 rounded-full transition-colors duration-300 relative focus:outline-none ${settings.notificationsEnabled ? 'bg-primary-500' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-300 ${settings.notificationsEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
          </button>
        </div>

        {settings.notificationsEnabled && (
          <div className="p-4 bg-primary-50/50 flex items-center justify-between animate-in slide-in-from-top-2">
            <div className="flex items-center space-x-3 text-slate-700">
              <Clock size={18} className="text-primary-500" />
              <span className="text-sm font-medium">Horário do lembrete</span>
            </div>
            <input
              type="time"
              value={settings.notificationTime}
              onChange={handleTimeChange}
              className="bg-white border border-slate-200 text-slate-800 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 outline-none shadow-sm"
            />
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start space-x-3">
        <Info size={20} className="text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-blue-800 leading-relaxed">
          Para garantir que os lembretes funcionem, mantenha esta aba aberta ou instale o aplicativo se seu navegador permitir.
        </p>
      </div>

      <div className="text-center pt-8">
        <p className="text-xs text-slate-400 font-medium">Ora+ v1.0.0</p>
        <p className="text-[10px] text-slate-300 mt-1">Feito com ❤️ e Fé</p>
      </div>
    </div>
  );
};

export default SettingsView;