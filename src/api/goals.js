import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const createGoal = async (goalData) => {
  try {
    const response = await axios.post(`${API_URL}/goals`, goalData);
    console.log('Goal created successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating goal:', error.response ? error.response.data : error);
    throw error;
  }
};

export const getGoals = async (date) => {
  try {
    const url = date ? `${API_URL}/goals?date=${date}` : `${API_URL}/goals`;
    console.log('Requesting goals from API:', url);
    const response = await axios.get(url);
    console.log('API response for goals:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error fetching goals:', error.response ? error.response.data : error);
    throw error;
  }
};

export const updateGoal = async (id, goalData) => {
  try {
    const response = await axios.put(`${API_URL}/goals/${id}`, goalData);
    console.log('Goal updated successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating goal:', error.response ? error.response.data : error);
    throw error;
  }
};

export const deleteGoal = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/goals/${id}`);
    console.log('Goal deleted successfully', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting goal:', error.response ? error.response.data : error);
    throw error;
  }
};

export const getGoalStreakData = async (goalId) => {
  try {
    const response = await axios.get(`${API_URL}/goals/${goalId}/streak-data`);
    console.log('API response for goal streak data:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error fetching goal streak data:', error);
    throw error;
  }
};