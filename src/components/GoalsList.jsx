import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GoalsList({ goals, onSaveProgress, currentDay }) {
  console.log('GoalsList props:', { goals, currentDay });
  const [progressInputs, setProgressInputs] = useState({});
  const [streaks, setStreaks] = useState({});

  useEffect(() => {
    const initialInputs = goals.reduce((acc, goal) => {
      acc[goal._id] = goal.progress.toString();
      return acc;
    }, {});
    setProgressInputs(initialInputs);
    fetchStreaks();
  }, [goals]);

  const fetchStreaks = async () => {
    const streakData = {};
    for (const goal of goals) {
      try {
        const response = await axios.get(`http://localhost:3000/api/goals/${goal._id}/streak`);
        streakData[goal._id] = response.data.currentStreak;
      } catch (error) {
        console.error(`Error fetching streak for goal ${goal._id}:`, error);
        console.error('Full error:', error);
        streakData[goal._id] = 0;
      }
    }
    setStreaks(streakData);
  };

  const handleProgressChange = (goalId, value) => {
    setProgressInputs(prevInputs => ({
      ...prevInputs,
      [goalId]: value
    }));
  };

  const handleSave = async (goalId) => {
    try {
      console.log(`Saving progress for goal ${goalId}`);
      console.log(`Progress value: ${progressInputs[goalId]}`);
      await onSaveProgress(goalId, progressInputs[goalId]);
      console.log(`Progress for goal ${goalId} saved successfully`);
      const response = await axios.get(`http://localhost:3000/api/goals/${goalId}/streak`);
      setStreaks(prevStreaks => ({
        ...prevStreaks,
        [goalId]: response.data.currentStreak
      }));
    } catch (error) {
      console.error('Error saving progress:', error);
      console.error('Full error:', error);
    }
  };

  const getDayName = (dayIndex) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[dayIndex];
  };

  return (
    <div className="goals-list mt-4">
      {goals.length === 0 ? (
        <p>No goals added yet. Add some goals to get started!</p>
      ) : (
        <ul className="list-group">
          {goals.map((goal) => {
            console.log('Rendering goal:', goal, 'Current day:', currentDay, 'Target minutes:', goal.targetMinutes[getDayName(currentDay)]);
            return (
              <li key={goal._id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{goal.name}</span>
                <div>
                  <input
                    type="number"
                    min="0"
                    value={progressInputs[goal._id] || ''}
                    onChange={(e) => handleProgressChange(goal._id, e.target.value)}
                    className="form-control d-inline-block mr-2"
                    style={{ width: '80px' }}
                  />
                  <span>
                    {(progressInputs[goal._id] || 0)}/{goal.targetMinutes[getDayName(currentDay)] || 0} minutes
                  </span>
                  <button
                    onClick={() => handleSave(goal._id)}
                    className="btn btn-primary btn-sm ml-2"
                  >
                    Save
                  </button>
                  <span className="ml-2 badge badge-info">Streak: {streaks[goal._id] || 0} days</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default GoalsList;