import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const saveProgress = async (goalId, minutes, date) => {
  try {
    const response = await axios.post(`${API_URL}/goals/progress`, { goalId, minutes, date });
    console.log(`Progress for goal ${goalId}: ${minutes} minutes on ${date} saved successfully`);
    return response.data;
  } catch (error) {
    console.error('Error saving progress:', error.response ? error.response.data : error);
    console.error('Full error:', error);
    throw error;
  }
};

export const getHistoricalData = async () => {
  try {
    const response = await axios.get(`${API_URL}/goals/historical`);
    console.log('Historical data fetched successfully');
    return response.data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    console.error('Full error:', error);
    throw error;
  }
};

export const getChartData = async () => {
  try {
    const response = await axios.get(`${API_URL}/goals/chart-data`);
    console.log('Raw chart data from API:', response.data); // Updated log message as per instructions
    return response.data;
  } catch (error) {
    console.error('Error fetching chart data:', error);
    console.error('Full error:', error);
    throw error;
  }
};