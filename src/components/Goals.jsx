import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { createGoal, getGoals, updateGoal, deleteGoal } from '../api/goals';

function Goals() {
  const [showModal, setShowModal] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [targetMinutes, setTargetMinutes] = useState('');
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);

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

  const handleOpenModal = (goal = null) => {
    if (goal) {
      setEditingGoal(goal);
      setGoalName(goal.name);
      setTargetMinutes(goal.targetMinutes.toString());
    } else {
      setEditingGoal(null);
      setGoalName('');
      setTargetMinutes('');
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingGoal(null);
    setGoalName('');
    setTargetMinutes('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingGoal) {
        await updateGoal(editingGoal._id, { name: goalName, targetMinutes: parseInt(targetMinutes) });
      } else {
        await createGoal({ name: goalName, targetMinutes: parseInt(targetMinutes) });
      }
      handleCloseModal();
      fetchGoals();
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await deleteGoal(goalId);
        fetchGoals();
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1>Goals</h1>
      <button className="btn btn-primary" onClick={() => handleOpenModal()}>
        Manage Goals
      </button>
      <Modal show={showModal} handleClose={handleCloseModal}>
        <h2>{editingGoal ? 'Edit Goal' : 'Add New Goal'}</h2>
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
          <button type="submit" className="btn btn-primary">
            {editingGoal ? 'Update Goal' : 'Save Goal'}
          </button>
        </form>
      </Modal>
      <ul className="list-group mt-3">
        {goals.map((goal) => (
          <li key={goal._id} className="list-group-item d-flex justify-content-between align-items-center">
            {goal.name} - {goal.targetMinutes} minutes
            <div>
              <button className="btn btn-sm btn-outline-primary mr-2" onClick={() => handleOpenModal(goal)}>
                Edit
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteGoal(goal._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Goals;