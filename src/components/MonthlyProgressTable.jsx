import React from 'react';

const monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

function MonthlyProgressTable({ goalName, monthlyData, yearlyTotal }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="table-responsive mt-4">
      <h3>{goalName} - {currentYear}</h3>
      <table className="table table-striped table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Month</th>
            <th>Total Minutes</th>
            <th>Time (hh:mm)</th>
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
          <tr className="table-info">
            <td><strong>Yearly Total</strong></td>
            <td><strong>{yearlyTotal.totalMinutes}</strong></td>
            <td><strong>{yearlyTotal.formattedTime}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MonthlyProgressTable;