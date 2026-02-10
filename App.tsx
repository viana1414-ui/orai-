import React, { useState, useEffect } from 'react';
import { AppTab, PrayerRecord, UserSettings, Verse } from './types';
import { VERSES, APP_NAME, APP_SLOGAN, NOTIFICATION_MESSAGES } from './constants';
import { getTodayDateString, getDailySeed } from './utils';
import Navigation from './components/Navigation';
import DailyVerseCard from './components/DailyVerseCard';
import PrayerButton from './components/PrayerButton';
import HistoryView from './components/HistoryView';
import SettingsView from './components/SettingsView';

const App: React.FC = () => {
  // --- State ---
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.HOME);
  const [history, setHistory] = useState<PrayerRecord[]>([]);
  const [settings, setSettings] = useState<UserSettings>({
    notificationsEnabled: false,
    notificationTime: "08:00",
  });
  const [dailyVerse, setDailyVerse] = useState<Verse>(VERSES[0]);
  const [todayDate, setTodayDate] = useState<string>(getTodayDateString());

  // --- Effects ---

  // Load Data
  useEffect(() => {
    const storedHistory = localStorage.getItem('ora_history');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }

    const storedSettings = localStorage.getItem('ora_settings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }

    // Set Daily Verse deterministically based on date
    const seed = getDailySeed();
    const verseIndex = seed % VERSES.length;
    setDailyVerse(VERSES[verseIndex]);
  }, []);

  // Update date check on focus (in case app stays open overnight)
  useEffect(() => {
    const handleFocus = () => setTodayDate(getTodayDateString());
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Simple Notification Polling (Simulates background worker)
  useEffect(() => {
    if (!settings.notificationsEnabled) return;

    const checkTime = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      if (currentTime === settings.notificationTime && now.getSeconds() < 5) {
        // Prevent double notification in the same minute roughly
        const lastNotified = localStorage.getItem('ora_last_notified');
        if (lastNotified !== todayDate) {
           sendNotification();
           localStorage.setItem('ora_last_notified', todayDate);
        }
      }
    };

    const interval = setInterval(checkTime, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, [settings, todayDate]);

  // --- Handlers ---

  const sendNotification = () => {
    if (Notification.permission === 'granted') {
      const randomMsg = NOTIFICATION_MESSAGES[Math.floor(Math.random() * NOTIFICATION_MESSAGES.length)];
      new Notification(APP_NAME, {
        body: randomMsg.text,
        icon: '/vite.svg' // Fallback icon
      });
    }
  };

  const handlePray = () => {
    if (isPrayedToday) return;

    const newRecord: PrayerRecord = {
      date: todayDate,
      timestamp: Date.now(),
    };

    const newHistory = [...history, newRecord];
    setHistory(newHistory);
    localStorage.setItem('ora_history', JSON.stringify(newHistory));

    // Optional: visual feedback vibration
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const handleUpdateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    localStorage.setItem('ora_settings', JSON.stringify(newSettings));
  };

  // --- Computed ---
  const isPrayedToday = history.some(record => record.date === todayDate);

  // --- Render ---

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.HOME:
        return (
          <div className="flex flex-col h-full animate-in fade-in duration-300">
             <header className="mb-6 flex flex-col items-center pt-4">
                <h1 className="text-3xl font-bold text-primary-600 tracking-tight">{APP_NAME}</h1>
                <p className="text-slate-500 text-sm font-medium mt-1">{APP_SLOGAN}</p>
             </header>

             <div className="flex-1 flex flex-col items-center justify-center -mt-8">
                <PrayerButton isPrayed={isPrayedToday} onPray={handlePray} />
                <div className="w-full mt-8">
                  <DailyVerseCard verse={dailyVerse} />
                </div>
             </div>
          </div>
        );
      case AppTab.HISTORY:
        return <HistoryView records={history} />;
      case AppTab.SETTINGS:
        return <SettingsView settings={settings} onUpdateSettings={handleUpdateSettings} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-primary-100">
      <main className="max-w-md mx-auto min-h-screen bg-white shadow-2xl overflow-hidden relative">
        <div className="h-full px-6 pt-6 overflow-y-auto no-scrollbar scroll-smooth" style={{ height: 'calc(100vh - 80px)' }}>
          {renderContent()}
        </div>
        <Navigation currentTab={activeTab} onTabChange={setActiveTab} />
      </main>
    </div>
  );
};

export default App;