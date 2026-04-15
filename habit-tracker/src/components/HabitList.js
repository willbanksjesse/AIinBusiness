import React from 'react';
import HabitItem from './HabitItem';

function HabitList({ habits, onToggle, onDelete, onEdit }) {
  return (
    <div className="max-w-4xl mx-auto">
      {habits.map(habit => (
        <HabitItem key={habit.id} habit={habit} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}

export default HabitList;