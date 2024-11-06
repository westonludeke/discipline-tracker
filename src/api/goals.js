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

export const getGoals = async () => {
  try {
    const response = await axios.get(`${API_URL}/goals`);
    console.log('Goals fetched successfully', response.data);
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