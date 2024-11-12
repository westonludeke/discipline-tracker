import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Goals from './components/Goals';
import Reports from './components/Reports';
import Streaks from './components/Streaks';
import StreakCalendar from './components/StreakCalendar';
import Navigation from './components/Navigation';

function AppRouter() {
  console.log('Rendering AppRouter with new Streaks route');
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/streaks" element={<Streaks />} />
        <Route path="/streak-calendar/:goalId" element={<StreakCalendar />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;