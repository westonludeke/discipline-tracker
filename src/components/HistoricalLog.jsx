import React from 'react';

function HistoricalLog({ data }) {
  return (
    <div className="historical-log">
      <h2>Historical Log</h2>
      {data.map(goal => (
        <div key={goal.goalId} className="goal-history">
          <h3>{goal.goalName}</h3>
          <div className="weekly-data">
            <h4>Weekly Data</h4>
            <ul>
              {goal.weekly.map(({ week, minutes }) => (
                <li key={week}>{week}: {minutes} minutes</li>
              ))}
            </ul>
          </div>
          <div className="monthly-data">
            <h4>Monthly Data</h4>
            <ul>
              {goal.monthly.map(({ month, minutes }) => (
                <li key={month}>{month}: {minutes} minutes</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoricalLog;