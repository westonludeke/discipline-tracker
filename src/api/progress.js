import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const saveProgress = async (goalId, minutes) => {
  try {
    const response = await axios.post(`${API_URL}/goals/progress`, { goalId, minutes });
    console.log(`Progress for goal ${goalId}: ${minutes} minutes saved successfully`);
    return response.data;
  } catch (error) {
    console.error('Error saving progress:', error.response ? error.response.data : error);
    throw error;
  }
};