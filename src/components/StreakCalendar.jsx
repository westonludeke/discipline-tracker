import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function StreakCalendar() {
  const { goalId } = useParams();
  const [goal, setGoal] = useState(null);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/goals/${goalId}`);
        setGoal(response.data);
      } catch (error) {
        console.error('Error fetching goal:', error);
      }
    };

    fetchGoal();
  }, [goalId]);

  if (!goal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Streak Calendar for {goal.name}</h1>
      {/* Calendar implementation will be added in the next task */}
    </div>
  );
}

export default StreakCalendar;