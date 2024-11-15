// src/utils/dataParser.js

export const parseImportData = (data) => {
  const currentYear = new Date().getFullYear();
  const lines = data.trim().split('\n');
  const headers = lines[0].split('\t');
  const parsedData = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split('\t');
    const entry = {};
    headers.forEach((header, index) => {
      if (header === 'Date') {
        const dateValue = values[index];
        const dateWithYear = dateValue.includes('-') ? dateValue : `${dateValue}-${currentYear}`;
        try {
          entry[header] = new Date(dateWithYear);
        } catch (error) {
          console.error('Error parsing date:', error.message, error.stack);
          entry[header] = new Date(); // Fallback to current date on parsing error
        }
      } else {
        entry[header] = parseInt(values[index]) || 0;
      }
    });
    parsedData.push(entry);
  }

  console.log('Data parsing completed successfully.');
  return parsedData;
};