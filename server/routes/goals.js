import express from 'express';
import Goal from '../models/Goal.js';

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('Received POST request to /api/goals:', req.body);
  try {
    const { name, targetMinutes } = req.body;
    const newGoal = new Goal({ name, targetMinutes });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  console.log('Received GET request to /api/goals');
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  console.log('Received PUT request to /api/goals/:id', req.params.id, req.body);
  try {
    const { id } = req.params;
    const { name, targetMinutes } = req.body;
    const updatedGoal = await Goal.findByIdAndUpdate(id, { name, targetMinutes }, { new: true });
    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json(updatedGoal);
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  console.log('Received DELETE request to /api/goals/:id', req.params.id);
  try {
    const { id } = req.params;
    const deletedGoal = await Goal.findByIdAndDelete(id);
    if (!deletedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Error deleting goal:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;