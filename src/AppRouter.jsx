import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Goals from './components/Goals';
import Reports from './components/Reports';
import StreaksPage from './components/StreaksPage';
import Navigation from './components/Navigation';

function AppRouter() {
  console.log('Rendering AppRouter with new StreaksPage route');
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/streaks" element={<StreaksPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;