```markdown
# Discipline Tracker App

The Discipline Tracker App allows users to track their daily progress on personal goals, enabling them to see how their discipline evolves over time. The app provides an intuitive interface for goal management and progress tracking, fostering accountability and motivation.

## Overview

The Discipline Tracker App is built using a modern tech stack to ensure a seamless user experience. The frontend is developed with React and styled using Bootstrap for a responsive and professional look. The backend uses Node.js with Express to handle API requests, and MongoDB (via Mongoose) for data storage. The app is designed to be run locally without user authentication.

### Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **MongoDB**: NoSQL database for storing goals and progress data.
- **Express**: Web server framework for Node.js.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **React**: JavaScript library for building user interfaces.
- **Vite**: Development server and bundler for fast development.
- **Bootstrap**: CSS framework for responsive front-end design.
- **Axios**: Promise-based HTTP client for making API requests.
- **Day.js**: Lightweight JavaScript date library.
- **Chart.js**: JavaScript library for creating charts.
- **jQuery**: JavaScript library for DOM manipulation.

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
│   │   ├── axios.js
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
│   │   ├── Import.jsx
│   │   ├── Modal.jsx
│   │   ├── MonthlyProgressTable.jsx
│   │   ├── Navigation.jsx
│   │   ├── Reports.jsx
│   │   ├── StreakCalendar.css
│   │   ├── StreakCalendar.jsx
│   │   ├── Streaks.jsx
│   │   ├── WeeklyReports.jsx
│   ├── utils/
│   │   ├── dataParser.js
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

- **Add Goals**: Manage goals via a modal to add, edit, or delete goals. Users can specify different target minutes for each day of the week.
- **Display Today's Date**: The homepage displays the current date in a user-friendly format.
- **List Today's Goals**: Displays all goals with the target minutes for the current day.
- **Add Goal Minutes**: Allows users to input the number of minutes spent on each goal for the day.
- **Toggle Between Days**: Users can navigate between days to view and update their progress.
- **Progress Tracking**: Access a `Reports` page showing progress over time, including a monthly progress chart.
- **Streak Tracking**: Tracks and displays the user's streak for each goal.
- **Streak Calendar**: Visualizes goal streaks over time with a calendar view.
- **Weekly Reports**: Provides a detailed breakdown of each day's progress grouped by week.
- **Import Page**: Allows users to import metrics data from a text field.
- **Bootstrap Styling**: The app is styled using Bootstrap for a modern and responsive design.

## Getting Started

### Requirements

- Node.js
- MongoDB (or MongoDB Atlas for cloud-based storage)
- Git

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

3. **Start the MongoDB server** (if using a local MongoDB instance):
    ```sh
    mongod
    ```

4. **Run the server**:
    ```sh
    npm run server
    ```

5. **Run the React development server**:
    ```sh
    npm run dev
    ```

6. **Open the app**:
    Open your browser and navigate to `http://localhost:3000`.

### License

```
© 2024. All rights reserved.
```
```