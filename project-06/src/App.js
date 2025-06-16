import React from 'react';
import './App.css';
import BirthdayList from './components/BirthdayList';
import { birthdayData } from './data/birthdayData';

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>Birthday Reminder</h1>
        <BirthdayList birthdays={birthdayData} />
      </div>
    </div>
  );
}

export default App;
