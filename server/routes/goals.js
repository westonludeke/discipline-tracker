import express from 'express';
import Goal from '../models/Goal.js';
import Progress from '../models/Progress.js';
import dayjs from 'dayjs';
import { parseImportData } from '../../src/utils/dataParser.js';

const router = express.Router();

// Add this new function to calculate and update streak
const updateStreak = async (goalId, date) => {
  console.log(`Updating streak for goal ${goalId} on date ${date}`);
  const goal = await Goal.findById(goalId);
  if (!goal) {
    console.log(`Goal ${goalId} not found`);
    return;
  }

  const yesterday = dayjs(date).subtract(1, 'day').toDate();
  const todayProgress = await Progress.findOne({ goalId, date: { $gte: date, $lt: dayjs(date).add(1, 'day').toDate() } });
  const yesterdayProgress = await Progress.findOne({ goalId, date: { $gte: yesterday, $lt: date } });

  console.log(`Today's progress: ${JSON.stringify(todayProgress)}`);
  console.log(`Yesterday's progress: ${JSON.stringify(yesterdayProgress)}`);

  if (todayProgress && todayProgress.minutes > 0) {
    if (yesterdayProgress && yesterdayProgress.minutes > 0) {
      goal.currentStreak += 1;
    } else {
      goal.currentStreak = 1;
    }
  } else {
    goal.currentStreak = 0;
  }

  console.log(`Updated streak for goal ${goalId}: ${goal.currentStreak}`);
  await goal.save();
};

function calculateYearlyTotal(monthlyData) {
  const totalMinutes = monthlyData.reduce((sum, month) => sum + month.totalMinutes, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return {
    totalMinutes,
    formattedTime
  };
}

router.post('/', async (req, res) => {
  console.log('Received POST request to /api/goals:', req.body);
  try {
    const { name, targetMinutes } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Goal name cannot be empty' });
    }

    const isValid = Object.values(targetMinutes).every(minutes => Number.isInteger(minutes) && minutes >= 0);
    if (!isValid) {
      return res.status(400).json({ message: 'All target minutes must be non-negative integers' });
    }

    const goal = new Goal({
      name: name.trim(),
      targetMinutes,
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

    const goalsWithProgressAndStreaks = await Promise.all(goals.map(async (goal) => {
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

      const calculatedStreak = await calculateStreak(goal._id);

      return {
        ...goal.toObject(),
        progress: progress ? progress.minutes : 0,
        currentStreak: calculatedStreak
      };
    }));

    console.log('Sending goals with progress and streaks for date:', date, goalsWithProgressAndStreaks);
    res.json(goalsWithProgressAndStreaks);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ message: 'Error fetching goals', error: error.message });
  }
});

async function calculateStreak(goalId) {
  console.log(`Calculating streak for goal ${goalId}`);

  const latestProgress = await Progress.findOne({ goalId }).sort({ date: -1 });
  if (!latestProgress) {
    console.log(`No progress found for goal ${goalId}`);
    return 0;
  }

  let currentDate = new Date(latestProgress.date);
  let streak = 0;

  while (true) {
    const progress = await Progress.findOne({
      goalId: goalId,
      date: {
        $gte: new Date(currentDate.setHours(0, 0, 0, 0)),
        $lt: new Date(currentDate.setHours(23, 59, 59, 999))
      },
      minutes: { $gt: 0 }
    });

    console.log(`Checking progress for date ${currentDate.toISOString()}: ${progress ? progress.minutes + ' minutes' : 'No progress'}`);

    if (!progress) break;

    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  console.log(`Final calculated streak for goal ${goalId}: ${streak}`);
  return streak;
}

router.put('/:id', async (req, res) => {
  console.log('Received PUT request to /api/goals/:id', req.params.id, req.body);
  try {
    const { name, targetMinutes } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Goal name cannot be empty' });
    }

    const isValid = Object.values(targetMinutes).every(minutes => Number.isInteger(minutes) && minutes >= 0);
    if (!isValid) {
      return res.status(400).json({ message: 'All target minutes must be non-negative integers' });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), targetMinutes },
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
    console.log(`Received progress data: Goal ID ${goalId}, ${minutes} minutes, Date: ${date}`);

    const utcDate = new Date(date);
    utcDate.setUTCHours(0, 0, 0, 0);
    console.log(`Converted UTC Date: ${utcDate}`);

    let progress = await Progress.findOne({ goalId, date: utcDate });
    if (progress) {
      console.log(`Updating existing progress: ${JSON.stringify(progress)}`);
      progress.minutes = minutes;
    } else {
      console.log(`Creating new progress entry`);
      progress = new Progress({ goalId, minutes, date: utcDate });
    }
    await progress.save();
    console.log(`Saved progress: ${JSON.stringify(progress)}`);

    const updatedStreak = await calculateStreak(goalId);
    console.log(`Updated streak for goal ${goalId}: ${updatedStreak}`);

    const goal = await Goal.findById(goalId);
    if (goal) {
      goal.currentStreak = updatedStreak;
      await goal.save();
      console.log(`Updated goal streak in database: ${JSON.stringify(goal)}`);
    }

    res.status(200).json({ message: 'Progress saved successfully', progress, updatedStreak });
  } catch (error) {
    console.error('Error saving or updating progress:', error);
    res.status(500).json({ message: 'Error saving progress', error: error.message });
  }
});

router.get('/:id/streak', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json({ currentStreak: goal.currentStreak });
  } catch (error) {
    console.error('Error fetching streak:', error);
    res.status(500).json({ message: 'Error fetching streak', error: error.message });
  }
});

router.get('/:goalId/streak-data', async (req, res) => {
  try {
    const { goalId } = req.params;
    const goal = await Goal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    const streakData = await Progress.find({ goalId });
    console.log('Streak data from database:', JSON.stringify(streakData, null, 2));
    const formattedStreakData = streakData.reduce((acc, progress) => {
      acc[progress.date.toISOString().split('T')[0]] = progress.minutes > 0;
      return acc;
    }, {});
    const response = {
      name: goal.name,
      currentStreak: goal.currentStreak,
      streakData: formattedStreakData,
    };
    console.log('Formatted streak data response:', JSON.stringify(response, null, 2));
    res.json(response);
  } catch (error) {
    console.error('Error fetching goal streak data:', error);
    res.status(500).json({ message: 'Server error' });
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
      ]).exec();

      const yearlyTotal = calculateYearlyTotal(monthlyData);

      return {
        goalId: goal._id,
        goalName: goal.name,
        monthlyData: monthlyData.map(item => ({
          month: item._id,
          totalMinutes: item.totalMinutes,
          formattedTime: formatMinutesToHHMM(item.totalMinutes)
        })),
        yearlyTotal
      };
    }));

    res.json(chartData);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).json({ message: 'Error fetching chart data', error: error.message });
  }
});

router.post('/import', async (req, res) => {
  console.log('Received import request with data:', req.body);
  try {
    const { data } = req.body;
    const parsedData = parseImportData(data);
    console.log('Parsed data:', parsedData);

    for (const entry of parsedData) {
      console.log('Processing entry:', entry);
      const { Date: date, ...goalProgress } = entry;

      for (const [goalName, minutes] of Object.entries(goalProgress)) {
        console.log(`Processing goal: ${goalName}, minutes: ${minutes}`);
        let goal = await Goal.findOne({ name: goalName });

        if (!goal) {
          console.log(`Creating new goal: ${goalName}`);
          goal = new Goal({
            name: goalName,
            targetMinutes: {
              sunday: 0,
              monday: 0,
              tuesday: 0,
              wednesday: 0,
              thursday: 0,
              friday: 0,
              saturday: 0
            }
          });
          await goal.save();
        }

        console.log(`Updating progress for goal: ${goalName}, date: ${date}`);
        let progress = await Progress.findOne({ goalId: goal._id, date });
        if (progress) {
          console.log(`Updating existing progress: ${progress}`);
          progress.minutes = minutes;
        } else {
          console.log(`Creating new progress entry`);
          progress = new Progress({
            goalId: goal._id,
            date,
            minutes
          });
        }
        await progress.save();

        // Update streak
        const updatedStreak = await calculateStreak(goal._id);
        console.log(`Updated streak for goal ${goalName}: ${updatedStreak}`);
        goal.currentStreak = updatedStreak;
        await goal.save();
      }
    }

    res.status(200).json({ message: 'Data imported successfully' });
  } catch (error) {
    console.error('Error importing data:', error);
    res.status(500).json({ message: 'Error importing data', error: error.message });
  }
});

function formatMinutesToHHMM(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
}

export default router;