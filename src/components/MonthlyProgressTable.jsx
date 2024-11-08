import React from 'react';

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function MonthlyProgressTable({ goalName, monthlyData }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-4">
      <h3>{goalName} - {currentYear}</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Month</th>
            <th>{goalName} Total (minutes)</th>
            <th>{goalName} Time (hh:mm)</th>
          </tr>
        </thead>
        <tbody>
          {monthNames.map((month, index) => {
            const monthData = monthlyData.find(data => data.month === index + 1) || { totalMinutes: 0, formattedTime: '00:00' };
            return (
              <tr key={month}>
                <td>{month}</td>
                <td>{monthData.totalMinutes}</td>
                <td>{monthData.formattedTime}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MonthlyProgressTable;