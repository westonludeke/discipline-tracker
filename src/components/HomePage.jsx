import React from 'react';
import dayjs from 'dayjs';

function HomePage() {
  const currentDate = dayjs().format('dddd, MMMM DD, YYYY');

  return (
    <div className="container">
      <header className="text-center my-4">
        <h1>Discipline Tracker</h1>
        <h2 className="text-muted">{currentDate}</h2>
      </header>
      {/* Other components will be added here in future tasks */}
    </div>
  );
}

export default HomePage;