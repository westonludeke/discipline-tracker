```markdown
# Discipline Tracker App

The Discipline Tracker App allows users to track their daily progress on personal goals, enabling them to see how their discipline evolves over time. The app provides an intuitive interface for goal management and progress tracking, fostering accountability and motivation.

## Overview

The Discipline Tracker App is built using a modern web stack, leveraging both front-end and back-end technologies to deliver a seamless user experience. The architecture includes a React-based frontend, a Node.js backend, and MongoDB for data storage. The app is styled using Bootstrap to ensure a responsive and professional look.

### Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **MongoDB**: NoSQL database for storing user data.
- **Express**: Web server framework for Node.js.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **Bootstrap**: CSS framework for responsive front-end design.
- **Body-Parser**: Middleware for parsing incoming request bodies.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
- **Morgan**: HTTP request logger middleware for Node.js.
- **Chart.js**: JavaScript library for creating charts.
- **jQuery**: JavaScript library for DOM manipulation.
- **Day.js**: Lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
- **React**: JavaScript library for building user interfaces.
- **Vite**: Development server and bundler for fast development.

### Project Structure

```
discipline-tracker-app/
├── .eslintrc.cjs
├── .gitignore
├── README.md
├── index.html
├── package.json
├── public/
│   └── .gitkeep
├── server/
│   ├── index.js
│   ├── models/
│   │   ├── Goal.js
│   │   └── Progress.js
│   └── routes/
│       ├── goals.js
│       └── weeklyReports.js
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── AppRouter.jsx
│   ├── api/
│   │   ├── axios.js
│   │   ├── goals.js
│   │   └── progress.js
│   ├── assets/
│   │   └── .gitkeep
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
│   │   ├── StreakCalendar.css
│   │   ├── StreakCalendar.jsx
│   │   ├── Streaks.jsx
│   │   └── WeeklyReports.jsx
│   ├── index.css
│   ├── main.jsx
│   └── utils/
│       └── dataParser.js
└── vite.config.js
```

## Features

### Add Goals
- **Manage Goals Page**: Users can add, edit, or delete goals through a modal on the `Goals` page.
- **Goal Details**: Specify the name of the goal and set target minutes for each day of the week.

### Goals Modal
- **Input Fields**: Includes fields for goal name and target minutes for each day of the week.

### Display Today's Date
- The homepage displays the current date in a user-friendly format.

### List Today's Goals
- Lists all goals with the target minutes for the current day of the week on the homepage.

### Add Goal Minutes
- Users can input the number of minutes spent on each goal for the day.

### Toggle Between Days
- Users can navigate between days to view progress from previous days.

### Progress Tracking
- **Reports Page**: Shows historical progress, including a monthly progress chart.

### Streak Tracking
- **Reports Page**: Tracks consecutive days of goal achievement.
- **Goals Page**: Displays the current streak for each goal.

### Streak Calendar
- Visualizes goal streaks over time with a color-coded calendar.

### Weekly Reports
- Provides a detailed breakdown of daily progress grouped by week.

### Import Page
- Allows users to import progress data from a text field.

### Style the Website with Bootstrap
- The website is styled using Bootstrap for a modern and responsive design.

## Getting Started

### Requirements

- Node.js
- MongoDB (local installation or MongoDB Atlas)

### Quickstart

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/discipline-tracker-app.git
    cd discipline-tracker-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up MongoDB**:
    - Ensure MongoDB is running locally or configure MongoDB Atlas.

4. **Start the development server**:
    ```bash
    npm run dev
    ```

5. **Open the app**:
    - Visit `http://localhost:3000` in your web browser.

### License

The project is proprietary (not open source). Copyright (c) 2024.
```