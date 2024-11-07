import React, { useState, useEffect } from 'react';

function GoalsList({ goals, onSaveProgress, date }) {
  const [progressInputs, setProgressInputs] = useState({});

  useEffect(() => {
    const initialInputs = goals.reduce((acc, goal) => {
      acc[goal._id] = goal.progress.toString();
      return acc;
    }, {});
    setProgressInputs(initialInputs);
  }, [goals]);

  const handleProgressChange = (goalId, value) => {
    setProgressInputs(prevInputs => ({
      ...prevInputs,
      [goalId]: value
    }));
  };

  const handleSave = (goalId) => {
    onSaveProgress(goalId, progressInputs[goalId], date)
      .then(() => console.log(`Progress for goal ${goalId} on ${date} saved successfully`))
      .catch(error => {
        console.error('Error saving progress:', error.response ? error.response.data : error);
        console.error('Full error:', error);
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
                  value={progressInputs[goal._id] || ''}
                  onChange={(e) => handleProgressChange(goal._id, e.target.value)}
                  className="form-control d-inline-block mr-2"
                  style={{ width: '80px' }}
                />
                <span>{(progressInputs[goal._id] || 0)}/{goal.targetMinutes} minutes</span>
                <button
                  onClick={() => handleSave(goal._id)}
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