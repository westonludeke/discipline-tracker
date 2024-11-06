import React, { useState } from 'react';

function GoalsList({ goals, onSaveProgress }) {
  const [progress, setProgress] = useState({});

  const handleProgressChange = (goalId, value) => {
    setProgress(prevProgress => ({
      ...prevProgress,
      [goalId]: value
    }));
    onSaveProgress(goalId, value);
  };

  return (
    <div className="goals-list mt-4">
      <h3>Your Goals</h3>
      {goals.length === 0 ? (
        <p>No goals added yet. Add some goals to get started!</p>
      ) : (
        <ul className="list-group">
          {goals.map((goal) => (
            <li key={goal._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{goal.name}</span>
              <div>
                <input
                  type="number"
                  className="form-control d-inline-block mr-2"
                  style={{ width: '80px' }}
                  value={progress[goal._id] || ''}
                  onChange={(e) => handleProgressChange(goal._id, e.target.value)}
                  placeholder="Minutes"
                />
                <span className="badge bg-primary rounded-pill">{goal.targetMinutes} min</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoalsList;