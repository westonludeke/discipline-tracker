import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import Goals from './components/Goals';

function App() {
  console.log('Rendering App component');
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Discipline Tracker</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/goals">Goals</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
    </>
  );
}

export default App;