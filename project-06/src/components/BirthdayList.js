import React, { useState } from 'react';
import Birthday from './Birthday';

function BirthdayList({ birthdays }) {
  const [people, setPeople] = useState(birthdays);

  const clearAll = () => {
    setPeople([]);
  };

  const removePerson = (id) => {
    setPeople(people.filter(person => person.id !== id));
  };

  return (
    <div className="birthday-list">
      <h2>{people.length} birthdays today</h2>
      {people.map(person => (
        <Birthday 
          key={person.id} 
          person={person} 
          onRemove={() => removePerson(person.id)}
        />
      ))}
      <button 
        className="clear-btn"
        onClick={clearAll}
      >
        Clear All
      </button>
    </div>
  );
}

export default BirthdayList; 