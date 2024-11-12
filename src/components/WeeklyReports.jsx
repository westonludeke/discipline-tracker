import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const WeeklyReports = () => {
  const [weeklyData, setWeeklyData] = useState([]);
  const [startDate, setStartDate] = useState(dayjs().startOf('week'));

  useEffect(() => {
    fetchWeeklyData();
  }, [startDate]);

  const fetchWeeklyData = async () => {
    try {
      console.log('Fetching weekly data for startDate:', startDate.format('YYYY-MM-DD'));
      const response = await axios.get(`http://localhost:3000/api/weekly-report?startDate=${startDate.format('YYYY-MM-DD')}`);
      console.log('Received weekly data:', JSON.stringify(response.data, null, 2));
      setWeeklyData(response.data);
    } catch (error) {
      console.error('Error fetching weekly data:', error);
    }
  };

  const renderTable = () => {
    if (weeklyData.length === 0) return <p>No data available for this week.</p>;

    const goals = Object.keys(weeklyData[0]).filter(key => key !== 'date');
    console.log('Rendering table with goals:', goals);

    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            {goals.map(goal => (
              <React.Fragment key={goal}>
                <th>{goal}</th>
                <th>Target</th>
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeklyData.map((day, index) => (
            <tr key={index}>
              <td>{dayjs(day.date).format('dddd, MMMM D')}</td>
              {goals.map(goal => (
                <React.Fragment key={goal}>
                  <td>{day[goal]?.minutes || 0}</td>
                  <td>{day[goal]?.target || 0}</td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mt-5">
      <h1>Weekly Reports</h1>
      <h2>Week of {startDate.format('MMMM D, YYYY')}</h2>
      {renderTable()}
    </div>
  );
};

export default WeeklyReports;