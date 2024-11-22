import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { createGoal, getGoals, updateGoal, deleteGoal } from '../api/goals';

function Goals() {
  const [showModal, setShowModal] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [targetMinutes, setTargetMinutes] = useState({
    sunday: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0
  });
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const fetchedGoals = await getGoals();
      setGoals(fetchedGoals);
    } catch (error) {
      console.error('Error fetching goals:', error.message, error.stack);
    }
  };

  const handleOpenModal = (goal = null) => {
    if (goal) {
      setEditingGoal(goal);
      setGoalName(goal.name);
      setTargetMinutes(goal.targetMinutes);
    } else {
      setEditingGoal(null);
      setGoalName('');
      setTargetMinutes({
        sunday: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingGoal(null);
    setGoalName('');
    setTargetMinutes({
      sunday: 0,
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!goalName.trim()) {
      setError('Goal name cannot be empty');
      return;
    }

    try {
      const goalData = editingGoal ? { name: goalName, targetMinutes } : { name: goalName, targetMinutes };
      if (editingGoal) {
        await updateGoal(editingGoal._id, goalData);
      } else {
        await createGoal(goalData);
      }
      handleCloseModal();
      fetchGoals();
    } catch (error) {
      console.error('Error saving goal:', error.message, error.stack);
      setError('Failed to save goal. Please try again.');
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      try {
        await deleteGoal(goalId);
        fetchGoals();
      } catch (error) {
        console.error('Error deleting goal:', error.message, error.stack);
      }
    }
  };

  const handleTargetMinutesChange = (day, value) => {
    const parsedValue = parseInt(value);
    setTargetMinutes(prev => ({ ...prev, [day]: parsedValue > 0 ? parsedValue : 0 }));
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="display-4 mb-4">Goals</h1>
          <button className="btn btn-primary mb-4" onClick={() => handleOpenModal()}>
            Manage Goals
          </button>
          <Modal show={showModal} handleClose={handleCloseModal}>
            <h2 className="mb-3">{editingGoal ? 'Edit Goal' : 'Add New Goal'}</h2>
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label htmlFor="goalName" className="form-label">Goal Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="goalName"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  required
                />
              </div>
              {['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((day) => (
                <div className="mb-3" key={day}>
                  <label htmlFor={`target-${day}`} className="form-label">
                    {day.charAt(0).toUpperCase() + day.slice(1)} Target Minutes
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id={`target-${day}`}
                    value={targetMinutes[day]}
                    onChange={(e) => handleTargetMinutesChange(day, e.target.value)}
                    min="0"
                  />
                </div>
              ))}
              <button type="submit" className="btn btn-primary">{editingGoal ? 'Update Goal' : 'Add Goal'}</button>
            </form>
          </Modal>
          <div className="row g-4">
            {goals.map((goal) => (
              <div key={goal._id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title h4 mb-3">{goal.name}</h5>
                    <p className="card-text mb-2">
                      Total target: {Object.values(goal.targetMinutes).reduce((a, b) => a + b, 0)} minutes
                    </p>
                    <p className="card-text mb-3">
                      Streak: {goal.currentStreak} days
                    </p>
                    <div className="mt-auto">
                      <Link to={`/streak-calendar/${goal._id}`} className="btn btn-info me-2 mb-2">View Streak</Link>
                      <button className="btn btn-outline-primary me-2 mb-2" onClick={() => handleOpenModal(goal)}>
                        Edit
                      </button>
                      <button className="btn btn-outline-danger mb-2" onClick={() => handleDeleteGoal(goal._id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Goals;