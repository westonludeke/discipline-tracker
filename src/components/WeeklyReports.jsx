import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const WeeklyReports = () => {
  const [weeksData, setWeeksData] = useState([]);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const numberOfWeeksToShow = 4;

  useEffect(() => {
    fetchMultipleWeeksData();
  }, []);

  const fetchMultipleWeeksData = async () => {
    try {
      const currentDate = dayjs();
      const weeksPromises = [];

      for (let i = 0; i < numberOfWeeksToShow; i++) {
        const startDate = currentDate.subtract(i, 'week').startOf('week');
        weeksPromises.push(fetchWeeklyData(startDate));
      }

      const resolvedWeeksData = await Promise.all(weeksPromises);
      setWeeksData(resolvedWeeksData.sort((a, b) => b.startDate.diff(a.startDate)));
    } catch (error) {
      console.error('Error fetching multiple weeks data:', error);
      console.error('Full error:', error);
    }
  };

  const fetchWeeklyData = async (startDate) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/weekly-report?startDate=${startDate.format('YYYY-MM-DD')}`);
      return {
        startDate,
        data: response.data
      };
    } catch (error) {
      console.error('Error fetching weekly data:', error);
      console.error('Full error:', error);
      return null;
    }
  };

  const calculateTotals = (weekData) => {
    const totals = {};
    weekData.forEach(day => {
      Object.keys(day).forEach(key => {
        if (key !== 'date') {
          if (!totals[key]) {
            totals[key] = { minutes: 0, target: 0, remaining: 0 };
          }
          totals[key].minutes += day[key].minutes;
          totals[key].target += day[key].target;
          totals[key].remaining += day[key].remaining;
        }
      });
    });
    return totals;
  };

  const headerStyle = {
    backgroundColor: '#000000',
    color: '#ffffff'
  };

  const goalColumnStyle = {
    backgroundColor: '#e6f3ff'  // Light blue
  };

  const targetColumnStyle = {
    backgroundColor: '#fff0e6'  // Light orange
  };

  const totalsRowStyle = {
    backgroundColor: '#74dcf2'
  };

  const renderTable = (weekData) => {
    if (!weekData || weekData.data.length === 0) return <p>No data available for this week.</p>;

    const goals = Object.keys(weekData.data[0]).filter(key => key !== 'date');
    const totals = calculateTotals(weekData.data);

    return (
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th style={headerStyle}>Date</th>
              {goals.map(goal => (
                <React.Fragment key={goal}>
                  <th style={headerStyle}>{goal}</th>
                  <th style={headerStyle}>Target</th>
                  <th style={headerStyle}>Remaining</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {weekData.data.map((day, index) => (
              <tr key={index}>
                <td>{dayjs(day.date).format('dddd, MMMM D')}</td>
                {goals.map(goal => {
                  const { minutes, target, remaining } = day[goal];
                  return (
                    <React.Fragment key={goal}>
                      <td style={goalColumnStyle}>{minutes}</td>
                      <td style={targetColumnStyle}>{target}</td>
                      <td>{remaining}</td>
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
            <tr style={totalsRowStyle}>
              <td><strong>Totals</strong></td>
              {goals.map(goal => (
                <React.Fragment key={goal}>
                  <td><strong>{totals[goal]?.minutes || 0}</strong></td>
                  <td><strong>{totals[goal]?.target || 0}</strong></td>
                  <td><strong>{totals[goal]?.remaining || 0}</strong></td>
                </React.Fragment>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const handlePreviousWeek = () => {
    setCurrentWeekIndex(prevIndex => Math.min(prevIndex + 1, weeksData.length - 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Weekly Reports</h1>
      {weeksData.map((weekData, index) => (
        <div key={index} className={`mb-5 ${index === currentWeekIndex ? '' : 'd-none'}`}>
          <h2 className="mb-3">Week of {weekData.startDate.format('MMMM D, YYYY')}</h2>
          {renderTable(weekData)}
        </div>
      ))}
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-primary"
          onClick={handlePreviousWeek}
          disabled={currentWeekIndex === weeksData.length - 1}
        >
          Previous Week
        </button>
        <button
          className="btn btn-primary"
          onClick={handleNextWeek}
          disabled={currentWeekIndex === 0}
        >
          Next Week
        </button>
      </div>
    </div>
  );
};

export default WeeklyReports;