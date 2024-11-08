import React, { useState, useEffect } from 'react';
import { getChartData } from '../api/progress';
import MonthlyProgressTable from './MonthlyProgressTable';

function Reports() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChartData();
        console.log('Fetched chart data:', data);
        setChartData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Full error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Reports</h1>
      {chartData.map(goalData => (
        <MonthlyProgressTable
          key={goalData.goalId}
          goalName={goalData.goalName}
          monthlyData={goalData.monthlyData}
          yearlyTotal={goalData.yearlyTotal}
        />
      ))}
    </div>
  );
}

export default Reports;