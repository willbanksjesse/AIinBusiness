import React, { useState } from 'react';
import WeeklyCalendar from './WeeklyCalendar';
import StreakDisplay from './StreakDisplay';

function HabitItem({ habit, onToggle, onDelete, onEdit, darkMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(habit.name);
  const today = new Date().toISOString().split('T')[0];

  const toggleToday = (intensity) => {
    onToggle(habit.id, today, intensity);
  };

  const calculateStreak = () => {
    const completions = habit.completions;
    let streak = 0;
    let date = new Date(today);
    while (true) {
      const dateStr = date.toISOString().split('T')[0];
      if (completions[dateStr] > 0) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const streak = calculateStreak();

  const badges = [];
  if (streak >= 7) badges.push('7-day');
  if (streak >= 30) badges.push('30-day');
  if (streak >= 100) badges.push('100-day');

  const handleEdit = () => {
    if (isEditing) {
      onEdit(habit.id, editName);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={`p-4 rounded-lg shadow-lg mb-4 border-2 ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gradient-to-r from-pink-100 to-yellow-100 border-purple-300'}`}>
      <div className="flex justify-between items-center mb-2">
        {isEditing ? (
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className={`text-xl font-semibold border rounded px-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : ''}`}
          />
        ) : (
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-gray-200' : 'text-purple-800'}`}>{habit.name}</h2>
        )}
        <div className="flex items-center">
          <button onClick={handleEdit} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button onClick={() => onDelete(habit.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
            Delete
          </button>
          <StreakDisplay streak={streak} darkMode={darkMode} />
          {badges.map(badge => (
            <span key={badge} className={`ml-2 px-2 py-1 rounded text-xs border ${darkMode ? 'bg-yellow-600 border-yellow-800 text-white' : 'bg-yellow-500 text-white border-yellow-700'}`}>
              {badge} 🏆
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center mb-4">
        {[1,2,3,4,5].map(level => (
          <button
            key={level}
            onClick={() => toggleToday(level)}
            className={`px-2 py-1 mx-1 rounded-full ${habit.completions[today] === level ? 'bg-green-500 text-white shadow-md' : darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}
          >
            {level}
          </button>
        ))}
        <button
          onClick={() => toggleToday(0)}
          className={`px-4 py-1 mx-1 rounded-full ${habit.completions[today] === 0 || !habit.completions[today] ? 'bg-red-500 text-white shadow-md' : darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`}
        >
          Skip
        </button>
      </div>
      <WeeklyCalendar habit={habit} darkMode={darkMode} />
    </div>
  );
}

export default HabitItem;