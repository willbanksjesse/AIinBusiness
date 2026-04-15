import React from 'react';

function StreakDisplay({ streak, darkMode }) {
  return (
    <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      Streak: {streak} days
    </div>
  );
}

export default StreakDisplay;