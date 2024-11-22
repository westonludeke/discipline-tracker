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
      console.log('Fetching goals for date:', date.format('YYYY-MM-DD'));
      const fetchedGoals = await getGoals(date.format('YYYY-MM-DD'));
      console.log('Fetched goals:', fetchedGoals);
      setGoals(fetchedGoals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      console.error('Full error:', error);
    }
  };

  const handleSaveProgress = async (goalId, minutes) => {
    try {
      console.log('Saving progress:', { goalId, minutes, date: currentDate.format('YYYY-MM-DD') });
      await saveProgress(goalId, minutes, currentDate.toISOString());
      console.log('Progress saved successfully');
      fetchGoals(currentDate); // Only fetch goals after successful save
    } catch (error) {
      console.error('Error saving progress:', error);
      console.error('Full error:', error);
    }
  };

  const handleDateChange = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = direction === 'forward' ? prevDate.add(1, 'day') : prevDate.subtract(1, 'day');
      return newDate.isAfter(dayjs()) ? dayjs() : newDate;
    });
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <header className="text-center mb-4">
            <h1 className="display-4 mb-3">Discipline Tracker</h1>
            <div className="d-flex justify-content-center align-items-center">
              <button
                className="btn btn-outline-secondary me-3"
                onClick={() => handleDateChange('back')}
              >
                &lt;
              </button>
              <h2 className="h3 text-muted mb-0">{currentDate.format('dddd, MMMM DD, YYYY')}</h2>
              <button
                className="btn btn-outline-secondary ms-3"
                onClick={() => handleDateChange('forward')}
                disabled={currentDate.isSame(dayjs(), 'day')}
              >
                &gt;
              </button>
            </div>
          </header>
          <GoalsList
            goals={goals}
            onSaveProgress={handleSaveProgress}
            currentDay={currentDate.day()}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;