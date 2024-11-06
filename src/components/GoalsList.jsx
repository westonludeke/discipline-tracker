import React from 'react';

function GoalsList({ goals }) {
  return (
    <div className="goals-list mt-4">
      <h3>Your Goals</h3>
      {goals.length === 0 ? (
        <p>No goals added yet. Add some goals to get started!</p>
      ) : (
        <ul className="list-group">
          {goals.map((goal) => (
            <li key={goal._id} className="list-group-item d-flex justify-content-between align-items-center">
              {goal.name}
              <span className="badge bg-primary rounded-pill">{goal.targetMinutes} min</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoalsList;