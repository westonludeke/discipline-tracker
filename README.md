```markdown
# Discipline Tracker App

The Discipline Tracker App allows users to track their daily progress on personal goals, enabling them to see how their discipline evolves over time. The app provides an intuitive interface for goal management and progress tracking, fostering accountability and motivation.

## Overview

The Discipline Tracker App is built using modern web technologies, featuring a React frontend and a Node.js backend with Express and MongoDB. The architecture ensures a responsive and interactive user experience, while the backend manages data persistence and retrieval.

### Technologies Used
- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web server framework for Node.js.
- **MongoDB**: NoSQL database for storing user goals and progress data.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **React**: JavaScript library for building user interfaces.
- **Vite**: Development server and bundler for fast development with React.
- **Bootstrap**: CSS framework for responsive design.
- **Axios**: Promise-based HTTP client for making API requests.
- **Day.js**: Lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
- **Chart.js**: JavaScript library for creating charts.
- **jQuery**: JavaScript library for DOM manipulation.

### Project Structure
```
discipline-tracker-app/
├── server/
│   ├── models/
│   │   ├── Goal.js
│   │   └── Progress.js
│   ├── routes/
│   │   ├── goals.js
│   │   └── weeklyReports.js
│   └── index.js
├── src/
│   ├── api/
│   │   ├── goals.js
│   │   └── progress.js
│   ├── assets/
│   ├── components/
│   │   ├── GoalProgressChart.jsx
│   │   ├── Goals.jsx
│   │   ├── GoalsList.jsx
│   │   ├── HistoricalLog.jsx
│   │   ├── HomePage.jsx
│   │   ├── Modal.jsx
│   │   ├── MonthlyProgressTable.jsx
│   │   ├── Navigation.jsx
│   │   ├── Reports.jsx
│   │   ├── StreakCalendar.css
│   │   ├── StreakCalendar.jsx
│   │   ├── Streaks.jsx
│   │   └── WeeklyReports.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── AppRouter.jsx
│   ├── index.css
│   ├── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Features

- **Add Goals**: Users can add, edit, or delete personal goals, specifying target minutes for each day of the week.
- **Display Today's Date**: The homepage displays the current date in a user-friendly format.
- **List Today's Goals**: The app lists all goals for the current day, showing target and actual minutes spent.
- **Add Goal Minutes**: Users can input the number of minutes spent on each goal for the day.
- **Toggle Between Days**: Users can view progress from previous days using forward/back buttons.
- **Progress Tracking**: A `Reports` page shows historical progress, including weekly and monthly breakdowns.
- **Streak Tracking**: The app tracks and displays the number of consecutive days users have worked towards their goals.
- **Streak Calendar**: Visual representation of goal streaks over time.
- **Weekly Reports**: Detailed breakdown of daily progress, grouped by week, with a summary of time spent and remaining targets.
- **Import Data**: Users can import progress data from a provided template.

## Getting Started

### Requirements

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Quickstart

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/discipline-tracker-app.git
   cd discipline-tracker-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up MongoDB:**
   - Ensure MongoDB is running locally or set up a MongoDB Atlas account and get the connection string.

4. **Configure environment variables:**
   - Create a `.env` file in the root directory and add your MongoDB connection string:
     ```
     MONGODB_URI=mongodb://localhost:27017/discipline-tracker
     ```

5. **Run the backend server:**
   ```bash
   npm run server
   ```

6. **Run the frontend development server:**
   ```bash
   npm run dev
   ```

7. **Access the app:**
   - Open your browser and go to `http://localhost:3000`.

### License

The project is proprietary (not open source). All rights reserved. Copyright (c) 2024.
```