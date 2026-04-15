import React, { useState } from 'react';

function AddHabitForm({ onAdd, darkMode }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex justify-center">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add a new habit"
        className={`border rounded-l px-4 py-2 w-64 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'border-gray-300'}`}
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
        Add
      </button>
    </form>
  );
}

export default AddHabitForm;