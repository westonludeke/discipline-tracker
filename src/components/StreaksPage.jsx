import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StreaksPage() {
  const [streaks, setStreaks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStreaks();
  }, []);

  const fetchStreaks = async () => {
    try {
      console.log('Fetching goals from API');
      const response = await axios.get('http://localhost:3000/api/goals');
      console.log('Goals fetched:', response.data);

      const goalsWithStreaks = await Promise.all(response.data.map(async (goal) => {
        console.log(`Fetching streak for goal: ${goal.name} (${goal._id})`);
        const streakResponse = await axios.get(`http://localhost:3000/api/goals/${goal._id}/streak`);
        console.log(`Streak response for ${goal.name}:`, streakResponse.data);
        return {
          ...goal,
          currentStreak: streakResponse.data.currentStreak
        };
      }));
      console.log('Goals with streaks:', goalsWithStreaks);
      setStreaks(goalsWithStreaks);
    } catch (error) {
      console.error('Error fetching streaks:', error.response ? error.response.data : error);
    }
  };

  const handleGoalClick = (goalId) => {
    navigate(`/streak-calendar/${goalId}`);
  };

  return (
    <div className="container mt-5">
      <h1>Streaks</h1>
      <ul className="list-group">
        {streaks.map((goal) => (
          <li
            key={goal._id}
            className="list-group-item d-flex justify-content-between align-items-center"
            onClick={() => handleGoalClick(goal._id)}
            style={{ cursor: 'pointer' }}
          >
            {goal.name}
            <span className="badge bg-primary text-dark">
              Current streak: {goal.currentStreak} days
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreaksPage;