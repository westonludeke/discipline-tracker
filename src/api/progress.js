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