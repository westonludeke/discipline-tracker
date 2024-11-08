import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StreaksPage() {
  const [streaks, setStreaks] = useState([]);

  useEffect(() => {
    fetchStreaks();
  }, []);

  const fetchStreaks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/goals');
      const goalsWithStreaks = await Promise.all(response.data.map(async (goal) => {
        const streakResponse = await axios.get(`http://localhost:3000/api/goals/${goal._id}/streak`);
        return {
          ...goal,
          currentStreak: streakResponse.data.currentStreak
        };
      }));
      setStreaks(goalsWithStreaks);
    } catch (error) {
      console.error('Error fetching streaks:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Streaks</h1>
      <ul className="list-group">
        {streaks.map((goal) => (
          <li key={goal._id} className="list-group-item d-flex justify-content-between align-items-center">
            {goal.name}
            <span className="badge badge-primary badge-pill">
              Current streak: {goal.currentStreak} days
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreaksPage;