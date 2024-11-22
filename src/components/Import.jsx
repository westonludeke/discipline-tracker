import React, { useState } from 'react';
import api from '../api/axios';

function Import() {
  const [inputData, setInputData] = useState('');
  const [message, setMessage] = useState('');

  const handleImport = async () => {
    try {
      const response = await api.post('/goals/import', { data: inputData });
      console.log('Server response:', response.data);
      setMessage('Data imported successfully');
    } catch (error) {
      console.error('Error importing data:', error.message, error.stack);
      setMessage('Error importing data');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1>Import Data</h1>
          <div className="form-group">
            <label htmlFor="importTextArea">Paste your data here:</label>
            <textarea
              className="form-control"
              id="importTextArea"
              rows="10"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            ></textarea>
          </div>
          <button className="btn btn-primary" onClick={handleImport}>
            Import
          </button>
          {message && <div className="alert alert-success mt-3">{message}</div>}
        </div>
      </div>
    </div>
  );
}

export default Import;