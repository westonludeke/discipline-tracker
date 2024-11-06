import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { createGoal, getGoals } from '../api/goals';

function Goals() {
  const [showModal, setShowModal] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [targetMinutes, setTargetMinutes] = useState('');
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const fetchedGoals = await getGoals();
      setGoals(fetchedGoals);
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setGoalName('');
    setTargetMinutes('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createGoal({ name: goalName, targetMinutes: parseInt(targetMinutes) });
      handleCloseModal();
      fetchGoals();
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Goals</h1>
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Manage Goals
      </button>
      <Modal show={showModal} handleClose={handleCloseModal}>
        <h2>Manage Goals</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="goalName">Goal Name</label>
            <input
              type="text"
              className="form-control"
              id="goalName"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="targetMinutes">Target Minutes</label>
            <input
              type="number"
              className="form-control"
              id="targetMinutes"
              value={targetMinutes}
              onChange={(e) => setTargetMinutes(e.target.value)}
              required
              min="1"
            />
          </div>
          <button type="submit" className="btn btn-primary">Save Goal</button>
        </form>
      </Modal>
      <ul className="list-group mt-3">
        {goals.map((goal) => (
          <li key={goal._id} className="list-group-item">
            {goal.name} - {goal.targetMinutes} minutes
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Goals;