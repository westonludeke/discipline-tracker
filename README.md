# Discipline Tracker App

The Discipline Tracker App allows users to track their daily progress on personal goals, enabling them to see how their discipline evolves over time. The app provides an intuitive interface for goal management and progress tracking, fostering accountability and motivation.

## Overview

The Discipline Tracker App is built using a modern web stack, combining React for the frontend and Node.js with Express for the backend. Data is stored in a MongoDB database. The project leverages several libraries and tools to enhance functionality and user experience, including Bootstrap for responsive design, Chart.js for data visualization, and Day.js for date manipulation.

### Technologies Used

- **Frontend**: React, Vite, Bootstrap, Chart.js, jQuery, Day.js
- **Backend**: Node.js, Express, MongoDB, Mongoose, Body-Parser, CORS, Morgan
- **Development Tools**: ESLint, Git

### Project Structure

```
discipline-tracker-app/
├── public/
│   ├── .gitkeep
├── server/
│   ├── index.js
│   ├── models/
│   │   ├── Goal.js
│   │   ├── Progress.js
│   ├── routes/
│   │   ├── goals.js
│   │   ├── weeklyReports.js
├── src/
│   ├── api/
│   │   ├── goals.js
│   │   ├── progress.js
│   ├── assets/
│   │   ├── .gitkeep
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
│   │   ├── WeeklyReports.jsx
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
├── vite.config.js
```

## Features

- **Add Goals**: Manage goals through a dedicated `Goals` page, where users can add, edit, or delete goals.
- **Goal Details**: Specify goal names and target daily minutes.
- **Display Today's Date**: Show the current date on the homepage.
- **List Today's Goals**: Display all goals for the day and allow input of minutes spent.
- **Toggle Between Days**: View progress from previous days using forward/back buttons.
- **Progress Tracking**: Access a `Reports` page with historical logs and monthly progress charts.
- **Streak Tracking**: Track consecutive days of goal achievement and display streaks on the `Goals` page.
- **Streak Calendar**: Visualize goal streaks over time with a calendar view.
- **Weekly Reports**: Detailed breakdown of daily progress, grouped by week, with totals and target calculations.

## Getting started

### Requirements

- Node.js
- MongoDB (local installation or MongoDB Atlas)

### Quickstart

1. **Clone the repository**:
   ```sh
   git clone https://github.com/yourusername/discipline-tracker-app.git
   cd discipline-tracker-app
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Start the backend server**:
   ```sh
   cd server
   node index.js
   ```

4. **Start the frontend development server**:
   ```sh
   cd ..
   npm run dev
   ```

5. **Access the app**:
   Open your web browser and navigate to `http://localhost:3000`.

### License

This project is open source and licensed under the MIT License. You are free to fork, modify, distribute, and use this project.