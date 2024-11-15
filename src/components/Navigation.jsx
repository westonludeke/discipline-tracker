import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Discipline Tracker</Link>
        <div className="navbar-nav">
          <Link className="nav-item nav-link" to="/">Home</Link>
          <Link className="nav-item nav-link" to="/goals">Goals</Link>
          <Link className="nav-item nav-link" to="/reports">Reports</Link>
          <Link className="nav-item nav-link" to="/streaks">Streaks</Link>
          <Link className="nav-item nav-link" to="/weekly-reports">Weekly Reports</Link>
          <Link className="nav-item nav-link" to="/import">Import</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;