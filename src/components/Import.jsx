import React, { useState } from 'react';

function Import() {
  const [importData, setImportData] = useState('');

  const handleImport = () => {
    console.log('Import button clicked', importData);
    try {
      // Assuming the actual import logic is to be implemented later
      console.log('Data to be imported:', importData);
    } catch (error) {
      console.error('Error importing data:', error.message, error.stack);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Import Data</h1>
      <div className="form-group">
        <label htmlFor="importTextArea">Paste your data here:</label>
        <textarea
          className="form-control"
          id="importTextArea"
          rows="10"
          value={importData}
          onChange={(e) => setImportData(e.target.value)}
        ></textarea>
      </div>
      <button className="btn btn-primary" onClick={handleImport}>
        Import
      </button>
    </div>
  );
}

export default Import;