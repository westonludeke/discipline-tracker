import express from 'express';
import Goal from '../models/Goal.js';
import Progress from '../models/Progress.js'; // Importing the Progress model
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
import isoWeek from 'dayjs/plugin/isoWeek.js';

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

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
    console.log('Found goals:', goals);

    const goalsWithProgress = await Promise.all(goals.map(async (goal) => {
      let progress = null;
      if (date) {
        const queryDate = new Date(date);
        const startOfDay = new Date(Date.UTC(queryDate.getUTCFullYear(), queryDate.getUTCMonth(), queryDate.getUTCDate()));
        const endOfDay = new Date(Date.UTC(queryDate.getUTCFullYear(), queryDate.getUTCMonth(), queryDate.getUTCDate(), 23, 59, 59, 999));

        progress = await Progress.findOne({
          goalId: goal._id,
          date: { $gte: startOfDay, $lte: endOfDay }
        }).sort({ date: -1 });
      }

      console.log(`Progress for goal ${goal._id} on date ${date}:`, progress);
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

router.post('/progress', async (req, res) => {
  try {
    const { goalId, minutes, date } = req.body;
    console.log(`Attempting to save or update progress: Goal ID ${goalId}, ${minutes} minutes, Date: ${date}`);
    const goal = await Goal.findById(goalId);
    if (!goal) {
      console.error(`Goal not found for ID: ${goalId}`);
      return res.status(404).json({ message: 'Goal not found' });
    }

    const utcDate = new Date(date);
    utcDate.setUTCHours(0, 0, 0, 0);

    let progress = await Progress.findOne({ goalId, date: utcDate });
    if (progress) {
      progress.minutes = minutes;
      await progress.save();
      console.log(`Updated existing progress for Goal ID ${goalId} on ${date}:`, progress);
    } else {
      progress = new Progress({ goalId, minutes, date: utcDate });
      await progress.save();
      console.log(`Saved new progress for Goal ID ${goalId} on ${date}:`, progress);
    }
    res.status(200).json({ message: 'Progress saved successfully', progress });
  } catch (error) {
    console.error('Error saving or updating progress:', error);
    res.status(500).json({ message: 'Error saving progress', error: error.message });
  }
});

router.get('/chart-data', async (req, res) => {
  try {
    const goals = await Goal.find();
    const currentYear = new Date().getFullYear();

    const chartData = await Promise.all(goals.map(async (goal) => {
      const monthlyData = await Progress.aggregate([
        {
          $match: {
            goalId: goal._id,
            date: {
              $gte: new Date(currentYear, 0, 1),
              $lt: new Date(currentYear + 1, 0, 1)
            }
          }
        },
        {
          $group: {
            _id: { $month: "$date" },
            totalMinutes: { $sum: "$minutes" }
          }
        },
        {
          $sort: { _id: 1 }
        }
      ]);

      return {
        goalId: goal._id,
        goalName: goal.name,
        monthlyData: monthlyData.map(item => ({
          month: item._id,
          totalMinutes: item.totalMinutes,
          formattedTime: formatMinutesToHHMM(item.totalMinutes)
        }))
      };
    }));

    console.log('Chart data being sent to client:', JSON.stringify(chartData)); // Added log as per instructions
    res.json(chartData);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).json({ message: 'Error fetching chart data' });
  }
});

function formatMinutesToHHMM(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
}

export default router;