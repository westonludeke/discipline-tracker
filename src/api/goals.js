import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const createGoal = async (goalData) => {
  try {
    const response = await axios.post(`${API_URL}/goals`, goalData);
    return response.data;
  } catch (error) {
    console.error('Error creating goal:', error.response ? error.response.data : error);
    throw error;
  }
};

export const getGoals = async () => {
  try {
    const response = await axios.get(`${API_URL}/goals`);
    return response.data;
  } catch (error) {
    console.error('Error fetching goals:', error.response ? error.response.data : error);
    throw error;
  }
};