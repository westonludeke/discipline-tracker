import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getGoals } from '../api/goals';
import { saveProgress } from '../api/progress';
import GoalsList from './GoalsList';

function HomePage() {
  const [goals, setGoals] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs());

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const fetchedGoals = await getGoals();
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
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleDateChange = (direction) => {
    setCurrentDate(prevDate => {
      return direction === 'forward' ? prevDate.add(1, 'day') : prevDate.subtract(1, 'day');
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