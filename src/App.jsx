import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import Goals from './components/Goals';
import Reports from './components/Reports';
import Streaks from './components/Streaks';
import WeeklyReports from './components/WeeklyReports';
import Import from './components/Import';
import StreakCalendar from './components/StreakCalendar';
import './App.css';

console.log('App.jsx is being executed');

function App() {
  console.log('App component is rendering');
  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="container mt-4">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/streaks" element={<Streaks />} />
            <Route path="/weekly-reports" element={<WeeklyReports />} />
            <Route path="/import" element={<Import />} />
            <Route path="/streak-calendar/:goalId" element={<StreakCalendar />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;