import React, { useState } from 'react';

function GoalsList({ goals, onSaveProgress }) {
  const [enteredMinutes, setEnteredMinutes] = useState({});

  const handleInputChange = (goalId, value) => {
    setEnteredMinutes(prev => ({
      ...prev,
      [goalId]: value
    }));
    onSaveProgress(goalId, value).catch(error => {
      console.error('Error saving progress:', error.response ? error.response.data : error);
    });
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
                  min="0"
                  value={enteredMinutes[goal._id] || ''}
                  onChange={(e) => handleInputChange(goal._id, e.target.value)}
                  className="form-control d-inline-block mr-2"
                  style={{ width: '80px' }}
                />
                <span>{(enteredMinutes[goal._id] || 0)}/{goal.targetMinutes} minutes</span>
                <button
                  onClick={() => onSaveProgress(goal._id, enteredMinutes[goal._id])}
                  className="btn btn-primary btn-sm ml-2"
                >
                  Save
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoalsList;