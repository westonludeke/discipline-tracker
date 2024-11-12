import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGoalStreakData } from '../api/goals';

function StreakCalendar() {
  const { goalId } = useParams();
  const [goalData, setGoalData] = useState(null);

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const data = await getGoalStreakData(goalId);
        setGoalData(data);
      } catch (error) {
        console.error('Error fetching goal streak data:', error);
      }
    };

    fetchGoalData();
  }, [goalId]);

  if (!goalData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>{goalData.name} Streak Calendar</h1>
      <p>Current Streak: {goalData.currentStreak} days</p>
      {/* TODO: Implement calendar view in the next task */}
    </div>
  );
}

export default StreakCalendar;