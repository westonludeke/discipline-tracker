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
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="display-4 mb-5">Reports</h1>
          {chartData.map(goalData => (
            <div key={goalData.goalId} className="mb-5">
              <MonthlyProgressTable
                goalName={goalData.goalName}
                monthlyData={goalData.monthlyData}
                yearlyTotal={goalData.yearlyTotal}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reports;