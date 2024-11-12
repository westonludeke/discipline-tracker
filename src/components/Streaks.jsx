import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGoals } from '../api/goals';

function Streaks() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const fetchedGoals = await getGoals();
      console.log('Fetched goals for Streaks page:', JSON.stringify(fetchedGoals, null, 2));
      setGoals(fetchedGoals);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Current Streaks</h1>
      <ul className="list-group">
        {goals.map((goal) => (
          <li key={goal._id} className="list-group-item d-flex justify-content-between align-items-center">
            <Link to={`/streak-calendar/${goal._id}`}>{goal.name}</Link>
            <span className="badge bg-primary rounded-pill">{goal.currentStreak} days</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Streaks;