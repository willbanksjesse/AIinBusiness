import React from 'react';

function WeeklyCalendar({ habit, darkMode }) {
  const today = new Date();
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    days.push(date);
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getColor = (intensity) => {
    if (intensity === 0 || !intensity) return 'bg-red-500';
    if (intensity === 1) return 'bg-green-200';
    if (intensity === 2) return 'bg-green-300';
    if (intensity === 3) return 'bg-green-500';
    if (intensity === 4) return 'bg-green-700';
    return 'bg-green-900';
  };

  return (
    <div className="flex justify-between">
      {days.map((date, index) => {
        const dateStr = date.toISOString().split('T')[0];
        const intensity = habit.completions[dateStr] || 0;
        return (
          <div key={dateStr} className="text-center">
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{dayNames[date.getDay()]}</div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${getColor(intensity)}`}>
              {date.getDate()}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WeeklyCalendar;