```markdown
# Discipline Tracker App

The Discipline Tracker App allows users to track their daily progress on personal goals, enabling them to see how their discipline evolves over time. The app provides an intuitive interface for goal management and progress tracking, fostering accountability and motivation.

## Overview

The Discipline Tracker App is built using a modern web development stack, combining a React frontend with a Node.js and Express backend, and MongoDB for data storage. The app uses Vite for fast development and hot reloading, and Bootstrap for responsive, professional styling. The architecture is designed to be scalable and maintainable, with a clear separation of concerns between the frontend and backend components.

### Technologies Used

- **Frontend**: React, Vite, Bootstrap, Chart.js, jQuery, Day.js
- **Backend**: Node.js, Express, Mongoose
- **Database**: MongoDB (local or MongoDB Atlas)
- **Utilities**: Axios, ESLint, Morgan, Body-Parser, CORS

### Project Structure

```
discipline-tracker-app/
├── server/
│   ├── index.js
│   ├── models/
│   │   ├── Goal.js
│   │   └── Progress.js
│   ├── routes/
│   │   ├── goals.js
│   │   └── weeklyReports.js
├── src/
│   ├── api/
│   │   ├── axios.js
│   │   ├── goals.js
│   │   └── progress.js
│   ├── assets/
│   ├── components/
│   │   ├── GoalProgressChart.jsx
│   │   ├── Goals.jsx
│   │   ├── GoalsList.jsx
│   │   ├── HistoricalLog.jsx
│   │   ├── HomePage.jsx
│   │   ├── Import.jsx
│   │   ├── Modal.jsx
│   │   ├── MonthlyProgressTable.jsx
│   │   ├── Navigation.jsx
│   │   ├── Reports.jsx
│   │   ├── StreakCalendar.jsx
│   │   ├── StreakCalendar.css
│   │   ├── Streaks.jsx
│   │   └── WeeklyReports.jsx
│   ├── utils/
│   │   └── dataParser.js
│   ├── App.css
│   ├── App.jsx
│   ├── AppRouter.jsx
│   ├── index.css
│   └── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Features

- **Add Goals**: Users can add, edit, or delete goals with specific target minutes for each day of the week.
- **Display Today's Date**: The homepage displays the current date in a user-friendly format.
- **List Today's Goals**: The app lists all goals for the current day, showing target and actual minutes spent.
- **Add Goal Minutes**: Users can input the number of minutes spent on each goal for the day.
- **Toggle Between Days**: Users can view progress from previous days using forward/back buttons.
- **Progress Tracking**: The `Reports` page shows historical progress, including weekly and monthly logs.
- **Streak Tracking**: The `Goals` page displays current streaks, and the `Streak Calendar` visualizes these streaks.
- **Weekly Reports**: Detailed breakdown of daily progress grouped by week.
- **Import Page**: Users can import progress data via a provided template.
- **Responsive Design**: Styled with Bootstrap for a modern and responsive UI.

## Getting Started

### Requirements

- Node.js
- MongoDB (local installation or MongoDB Atlas)

### Quickstart

1. **Clone the repository:**
   ```sh
   git clone https://github.com/westonludeke/discipline-tracker.git
   cd discipline-tracker-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up MongoDB:**
   - Ensure MongoDB is running locally or set up MongoDB Atlas.
   - Update the MongoDB connection string in `server/index.js` if necessary.

4. **Run the development server and the frontend:**
   ```sh
   npm run dev
   ```

5. **Open the app:**
   - Navigate to `http://localhost:3000` in your web browser.

### License

Copyright (c) 2024.
```