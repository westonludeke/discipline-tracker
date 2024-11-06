import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { getGoals } from '../api/goals';
import GoalsList from './GoalsList';

function HomePage() {
  const [goals, setGoals] = useState([]);
  const currentDate = dayjs().format('dddd, MMMM DD, YYYY');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const fetchedGoals = await getGoals();
      setGoals(fetchedGoals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      // You might want to add error handling UI here
    }
  };

  return (
    <div className="container">
      <header className="text-center my-4">
        <h1>Discipline Tracker</h1>
        <h2 className="text-muted">{currentDate}</h2>
      </header>
      <GoalsList goals={goals} />
    </div>
  );
}

export default HomePage;