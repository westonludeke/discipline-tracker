import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import { getGoalStreakData } from '../api/goals';
import 'react-calendar/dist/Calendar.css';
import './StreakCalendar.css';

function StreakCalendar() {
  const { goalId } = useParams();
  const [goalData, setGoalData] = useState(null);
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const data = await getGoalStreakData(goalId);
        console.log('Fetched goal streak data:', JSON.stringify(data, null, 2));
        setGoalData(data);
        generateCalendars(data);
        console.log('Generated calendars:', calendars);
      } catch (error) {
        console.error('Error fetching goal streak data:', error);
      }
    };

    fetchGoalData();
  }, [goalId]);

  const generateCalendars = (goalData) => {
    const today = new Date();
    const calendars = [];
    for (let i = 0; i < 12; i++) {
      const monthStart = new Date(today.getFullYear(), today.getMonth() - i, 1);
      calendars.push({
        date: monthStart,
        tileClassName: ({ date, view }) => {
          if (view !== 'month') return null;
          const dateString = date.toISOString().split('T')[0];
          const isStreakDay = goalData.streakData && goalData.streakData[dateString];
          const isFirstOfMonth = date.getDate() === 1;

          if (isFirstOfMonth && !isStreakDay) {
            return 'react-calendar__tile--non-active';
          }

          return isStreakDay ? 'streak-day' : 'react-calendar__tile--non-active';
        },
      });
    }
    setCalendars(calendars);
  };

  if (!goalData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1>{goalData.name} Streak Calendar</h1>
      <p>Current Streak: {goalData.currentStreak} days</p>
      <div className="calendars-container">
        {calendars.map((calendarProps, index) => (
          <div key={index} className="calendar-wrapper">
            <h2>{calendarProps.date.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
            <Calendar
              value={calendarProps.date}
              tileClassName={calendarProps.tileClassName}
              showNeighboringMonth={false}
              prevLabel={null}
              nextLabel={null}
              prev2Label={null}
              next2Label={null}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StreakCalendar;