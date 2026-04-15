import React, { useState, useEffect } from 'react';
import AddHabitForm from './components/AddHabitForm';
import HabitList from './components/HabitList';
import Stats from './components/Stats';

function App() {
  const [habits, setHabits] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedHabits = localStorage.getItem('habits');
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name) => {
    const newHabit = {
      id: Date.now(),
      name,
      completions: {},
    };
    setHabits([...habits, newHabit]);
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const editHabit = (id, newName) => {
    setHabits(habits.map(h => h.id === id ? { ...h, name: newName } : h));
  };

  const exportData = () => {
    const dataStr = JSON.stringify(habits, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'habits.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const toggleCompletion = (id, date, intensity) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const completions = { ...habit.completions };
        completions[date] = intensity;
        return { ...habit, completions };
      }
      return habit;
    }));
  };

  const totalScore = habits.reduce((total, habit) => {
    return total + Object.values(habit.completions).reduce((sum, val) => sum + (val || 0), 0);
  }, 0);

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200'}`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-4xl font-bold text-center ${darkMode ? 'text-white' : 'text-purple-900'}`}>Habit Tracker</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className={`text-center mb-4 text-lg font-semibold ${darkMode ? 'text-gray-300' : 'text-indigo-800'}`}>Total Score: {totalScore}</div>
      <div className="text-center mb-4">
        <button onClick={exportData} className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
          Export Data
        </button>
      </div>
      <Stats habits={habits} darkMode={darkMode} />
      <AddHabitForm onAdd={addHabit} darkMode={darkMode} />
      <HabitList habits={habits} onToggle={toggleCompletion} onDelete={deleteHabit} onEdit={editHabit} darkMode={darkMode} />
    </div>
  );
}

export default App;