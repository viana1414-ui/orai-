export interface Verse {
  text: string;
  reference: string;
}

export interface NotificationMessage {
  id: number;
  text: string;
}

export interface PrayerRecord {
  date: string; // ISO Date string YYYY-MM-DD
  timestamp: number;
}

export enum AppTab {
  HOME = 'home',
  HISTORY = 'history',
  SETTINGS = 'settings',
}

export interface UserSettings {
  notificationsEnabled: boolean;
  notificationTime: string; // "HH:MM" format
  name?: string;
}