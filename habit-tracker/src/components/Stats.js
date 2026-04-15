import React from 'react';

function Stats({ habits, darkMode }) {
  const totalHabits = habits.length;
  const totalCompletions = habits.reduce((total, habit) => {
    return total + Object.values(habit.completions).filter(val => val > 0).length;
  }, 0);
  const averageStreak = habits.length > 0 ? habits.reduce((total, habit) => {
    let streak = 0;
    let date = new Date();
    while (true) {
      const dateStr = date.toISOString().split('T')[0];
      if (habit.completions[dateStr] > 0) {
        streak++;
        date.setDate(date.getDate() - 1);
      } else {
        break;
      }
    }
    return total + streak;
  }, 0) / habits.length : 0;

  return (
    <div className={`p-4 rounded-lg shadow-lg mb-4 border-2 ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-gradient-to-r from-green-100 to-blue-100 border-green-300'}`}>
      <h2 className={`text-2xl font-bold text-center mb-4 ${darkMode ? 'text-gray-200' : 'text-green-800'}`}>Statistics</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{totalHabits}</div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Total Habits</div>
        </div>
        <div>
          <div className={`text-3xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>{totalCompletions}</div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Total Completions</div>
        </div>
        <div>
          <div className={`text-3xl font-bold ${darkMode ? 'text-pink-400' : 'text-pink-600'}`}>{Math.round(averageStreak)}</div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>Avg Streak</div>
        </div>
      </div>
    </div>
  );
}

export default Stats;