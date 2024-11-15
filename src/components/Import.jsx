import React, { useState } from 'react';
import { parseImportData } from '../utils/dataParser';

function Import() {
  const [importData, setImportData] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState(null);

  const handleImport = () => {
    try {
      const parsed = parseImportData(importData);
      setParsedData(parsed);
      setError(null);
      console.log('Parsed data:', parsed);
    } catch (error) {
      console.error('Error parsing data:', error.message, error.stack);
      setError('Failed to parse the imported data. Please check the format and try again.');
      setParsedData(null);
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
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {parsedData && (
        <div className="mt-3">
          <h3>Parsed Data Preview:</h3>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Import;