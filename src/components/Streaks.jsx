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
      console.error('Full error:', error);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">Current Streaks</h1>
      <ul className="list-group list-group-flush">
        {goals.map((goal) => (
          <li key={goal._id} className="list-group-item d-flex justify-content-between align-items-center py-3">
            <Link to={`/streak-calendar/${goal._id}`} className="text-decoration-none fs-5">{goal.name}</Link>
            <span className="badge bg-primary rounded-pill fs-6">{goal.currentStreak} days</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Streaks;