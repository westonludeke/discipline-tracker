import express from 'express';
import Goal from '../models/Goal.js';
import Progress from '../models/Progress.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(utc);

const router = express.Router();

router.get('/weekly-report', async (req, res) => {
  try {
    const { startDate } = req.query;
    console.log('Received startDate:', startDate);
    const start = dayjs(startDate).utc().startOf('day');
    console.log('Calculated start date in UTC:', start.format());
    const end = start.add(6, 'day').endOf('day');
    console.log('Calculated end date in UTC:', end.format());

    const goals = await Goal.find();
    const progress = await Progress.find({
      date: { $gte: start.toDate(), $lte: end.toDate() }
    });

    const weeklyData = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = start.add(i, 'day');
      const dayProgress = progress.filter(p => dayjs(p.date).utc().startOf('day').isSame(currentDate, 'day'));

      const dayData = {
        date: currentDate.format('YYYY-MM-DD'),
      };

      goals.forEach(goal => {
        const goalProgress = dayProgress.find(p => p.goalId.toString() === goal._id.toString());
        const dayOfWeek = currentDate.format('dddd').toLowerCase();
        const dailyTarget = goal.targetMinutes[dayOfWeek];
        dayData[goal.name] = {
          minutes: goalProgress ? goalProgress.minutes : 0,
          target: dailyTarget,
          remaining: dailyTarget - (goalProgress ? goalProgress.minutes : 0)
        };
      });

      weeklyData.push(dayData);
    }

    console.log('Weekly data before sending in UTC:', JSON.stringify(weeklyData, null, 2));
    res.json(weeklyData);
  } catch (error) {
    console.error('Error fetching weekly report in UTC:', error);
    res.status(500).json({ message: 'Error fetching weekly report' });
  }
});

export { router };