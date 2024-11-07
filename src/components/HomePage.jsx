import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getGoals } from '../api/goals';
import { saveProgress } from '../api/progress';
import GoalsList from './GoalsList';

function HomePage() {
  const [goals, setGoals] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs());

  useEffect(() => {
    fetchGoals(currentDate);
  }, [currentDate]);

  const fetchGoals = async (date) => {
    try {
      const fetchedGoals = await getGoals(date.format('YYYY-MM-DD'));
      console.log('Fetched goals:', fetchedGoals);
      setGoals(fetchedGoals);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleSaveProgress = async (goalId, minutes) => {
    try {
      await saveProgress(goalId, minutes, currentDate.toISOString());
      console.log('Progress saved successfully');
      fetchGoals(currentDate); // Refresh goals after saving progress
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleDateChange = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = direction === 'forward' ? prevDate.add(1, 'day') : prevDate.subtract(1, 'day');
      return newDate.isAfter(dayjs()) ? dayjs() : newDate;
    });
  };

  return (
    <div className="container">
      <header className="text-center my-4">
        <h1>Discipline Tracker</h1>
        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn btn-outline-secondary mr-2"
            onClick={() => handleDateChange('back')}
          >
            &lt;
          </button>
          <h2 className="text-muted mb-0">{currentDate.format('dddd, MMMM DD, YYYY')}</h2>
          <button
            className="btn btn-outline-secondary ml-2"
            onClick={() => handleDateChange('forward')}
            disabled={currentDate.isSame(dayjs(), 'day')}
          >
            &gt;
          </button>
        </div>
      </header>
      <GoalsList goals={goals} onSaveProgress={handleSaveProgress} />
    </div>
  );
}

export default HomePage;