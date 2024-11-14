```markdown
# Discipline Tracker App

The Discipline Tracker App allows users to track their daily progress on personal goals, enabling them to see how their discipline evolves over time. The app provides an intuitive interface for goal management and progress tracking, fostering accountability and motivation.

## Overview

The Discipline Tracker App is built using a modern web stack, leveraging both frontend and backend technologies to deliver a seamless user experience. The frontend is developed using React with Vite for fast development and hot reloading, while the backend is powered by Node.js and Express, with MongoDB as the database.

### Architecture and Technologies

- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express**: Web server framework for Node.js.
- **MongoDB**: NoSQL database for storing goal and progress data.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **React**: JavaScript library for building user interfaces.
- **Vite**: Next-generation frontend tooling for fast development.
- **Bootstrap**: CSS framework for responsive design.
- **Body-parser**: Middleware for parsing incoming request bodies.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
- **Morgan**: HTTP request logger middleware.
- **Chart.js**: JavaScript library for creating charts.
- **jQuery**: JavaScript library for DOM manipulation.
- **Day.js**: Lightweight JavaScript date library.

### Project Structure

The project is organized into the following main directories and files:

- **server/**: Contains backend code, including models, routes, and server setup.
  - `index.js`: Main entry point for the Express server.
  - `models/Goal.js`: Mongoose schema for goals.
  - `models/Progress.js`: Mongoose schema for progress tracking.
  - `routes/goals.js`: Routes for managing goals.
  - `routes/weeklyReports.js`: Routes for generating weekly reports.
- **src/**: Contains frontend code, including components and API interactions.
  - `App.jsx`: Main React component.
  - `AppRouter.jsx`: Sets up routing for the application.
  - `components/`: Directory containing React components.
  - `api/`: Directory containing API interaction functions.
- **public/**: Contains static assets.
- **.eslintrc.cjs**: Configuration for ESLint.
- **.gitignore**: Specifies files and directories to ignore in Git.
- **README.md**: Provides an overview and instructions for the project.
- **package.json**: Node.js package metadata and dependencies.
- **vite.config.js**: Configuration for Vite.

## Features

### Add Goals
- **Manage Goals Page**: Users can add, edit, or delete goals through a modal on the `Goals` page.
- **Goal Details**: Users can specify goal names and set target minutes for each day of the week.

### Goals Modal
- **Input Fields**: Modal includes input fields for goal name and target minutes for each day.

### Display Today's Date
- Homepage displays the current date in a user-friendly format.

### List Today's Goals
- Homepage lists all goals with target minutes for the current day.

### Add Goal Minutes
- Users can input the number of minutes spent on each goal for the day.

### Toggle Between Days
- Users can toggle between days to view progress from previous days.

### Progress Tracking
- **Reports Page**: Shows progress over time with historical logs and monthly progress charts.

### Streak Tracking
- **Reports Page**: Tracks consecutive days of goal achievement.
- **Goals Page**: Displays current streak for each goal.

### Streak Calendar
- **Goals Page**: Visualizes goal streaks over time with a calendar view.

### User Authentication
- No user authentication is needed as the app runs locally.

### Weekly Reports
- **Weekly Reports Page**: Provides a detailed breakdown of daily progress, grouped by week.

## Getting Started

### Requirements

- Node.js
- MongoDB (local installation or MongoDB Atlas)

### Quickstart

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd discipline-tracker-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the backend server:**
   ```bash
   npm run server
   ```

4. **Run the frontend development server:**
   ```bash
   npm start
   ```

5. **Access the app:**
   Open your browser and navigate to `http://localhost:3000`.

## License

The project is proprietary (not open source). Copyright (c) 2024.
```