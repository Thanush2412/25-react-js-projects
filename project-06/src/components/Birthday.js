import React, { useState } from 'react';

function Birthday({ person, onRemove }) {
  const { name, age, image, date } = person;
  const [isHovered, setIsHovered] = useState(false);
  
  // Format the date to show month and day
  const birthdayDate = new Date(date);
  const formattedDate = birthdayDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });

  // Calculate days until next birthday
  const today = new Date();
  const nextBirthday = new Date(today.getFullYear(), birthdayDate.getMonth(), birthdayDate.getDate());
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

  return (
    <div 
      className="birthday-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={image} alt={name} className="person-image" />
      <div className="person-info">
        <h3>{name}</h3>
        <p className="age">{age} years old</p>
        <p className="date">{formattedDate}</p>
        {isHovered && (
          <p className="days-until">
            {daysUntilBirthday === 0 
              ? "🎉 Today's the day! 🎉" 
              : `${daysUntilBirthday} days until birthday`}
          </p>
        )}
      </div>
      <button 
        className="remove-btn"
        onClick={() => onRemove(person.id)}
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        ×
      </button>
    </div>
  );
}

export default Birthday; 