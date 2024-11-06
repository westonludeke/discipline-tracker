import React, { useState } from 'react';
import Modal from './Modal';

function Goals() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h1>Goals</h1>
      <button className="btn btn-primary" onClick={handleOpenModal}>
        Manage Goals
      </button>
      <Modal show={showModal} handleClose={handleCloseModal}>
        <h2>Manage Goals</h2>
        {/* Goal management form will be added here in future tasks */}
      </Modal>
    </div>
  );
}

export default Goals;