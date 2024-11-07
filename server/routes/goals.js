import express from 'express';
import Goal from '../models/Goal.js';
import Progress from '../models/Progress.js'; // Importing the Progress model

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('Received POST request to /api/goals:', req.body);
  try {
    const { name, targetMinutes } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Goal name cannot be empty' });
    }

    if (!targetMinutes || isNaN(targetMinutes) || targetMinutes <= 0) {
      return res.status(400).json({ message: 'Target minutes must be a positive number' });
    }

    const goal = new Goal({
      name: name.trim(),
      targetMinutes: parseInt(targetMinutes),
    });

    const savedGoal = await goal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    console.error('Error creating goal:', error);
    res.status(500).json({ message: 'Error creating goal', error: error.message });
  }
});

router.get('/', async (req, res) => {
  console.log('Received GET request to /api/goals with date:', req.query.date);
  try {
    const { date } = req.query;
    const goals = await Goal.find();
    const goalsWithProgress = await Promise.all(goals.map(async (goal) => {
      const progress = date ? await Progress.findOne({ goalId: goal._id, date }) : await Progress.findOne({ goalId: goal._id }).sort({ date: -1 });
      return {
        ...goal.toObject(),
        progress: progress ? progress.minutes : 0
      };
    }));
    console.log('Sending goals with progress for date:', date, goalsWithProgress);
    res.json(goalsWithProgress);
  } catch (error) {
    console.error('Error fetching goals for date:', req.query.date, error);
    res.status(500).json({ message: 'Error fetching goals', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  console.log('Received PUT request to /api/goals/:id', req.params.id, req.body);
  try {
    const { name, targetMinutes } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Goal name cannot be empty' });
    }

    if (!targetMinutes || isNaN(targetMinutes) || targetMinutes <= 0) {
      return res.status(400).json({ message: 'Target minutes must be a positive number' });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), targetMinutes: parseInt(targetMinutes) },
      { new: true, runValidators: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json(updatedGoal);
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(500).json({ message: 'Error updating goal', error: error.message });
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

// Updated route for saving progress
router.post('/progress', async (req, res) => {
  try {
    const { goalId, minutes, date } = req.body;
    console.log(`Saving progress: Goal ID ${goalId}, ${minutes} minutes, Date: ${date}`);
    const goal = await Goal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    let progress = await Progress.findOne({ goalId, date });
    if (progress) {
      progress.minutes = minutes;
      await progress.save();
    } else {
      progress = new Progress({ goalId, minutes, date });
      await progress.save();
    }
    console.log('Saved progress:', progress);
    res.status(200).json({ message: 'Progress saved successfully', progress });
  } catch (error) {
    console.error('Error saving progress:', error);
    res.status(500).json({ message: 'Error saving progress', error: error.message });
  }
});

export default router;