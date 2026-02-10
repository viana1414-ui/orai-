export const getTodayDateString = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDateBr = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

export const getDayOfWeek = (dateString: string): string => {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const date = new Date(dateString + 'T12:00:00'); // Fix timezone issue by setting noon
  return days[date.getDay()];
};

// Simple pseudo-random generator seeded by date to pick the same verse for everyone on the same day
export const getDailySeed = (): number => {
  const today = new Date();
  return today.getFullYear() * 1000 + (today.getMonth() + 1) * 100 + today.getDate();
};