import React, { useState, useEffect } from 'react';
import { getHistoricalData } from '../api/progress';
import HistoricalLog from './HistoricalLog';

function Reports() {
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const data = await getHistoricalData();
        setHistoricalData(data);
      } catch (error) {
        console.error('Error fetching historical data:', error);
        console.error('Full error:', error);
      }
    };

    fetchHistoricalData();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Reports</h1>
      <HistoricalLog data={historicalData} />
    </div>
  );
}

export default Reports;