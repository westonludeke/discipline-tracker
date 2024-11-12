```markdown
# Discipline Tracker App

The Discipline Tracker App allows users to track their daily progress on personal goals, enabling them to see how their discipline evolves over time. The app provides an intuitive interface for goal management and progress tracking, fostering accountability and motivation.

## Overview

The Discipline Tracker App is built using a combination of modern web technologies. The backend is powered by Node.js and Express, with data stored in a MongoDB database. The frontend is a React application, bundled with Vite for fast development and hot reloading. The app uses various libraries for enhanced functionality, such as Mongoose for MongoDB object modeling, Bootstrap for responsive design, and Chart.js for data visualization.

### Technologies Used

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React, Vite, Bootstrap, Chart.js, jQuery, Day.js
- **Middleware**: Body-parser, CORS, Morgan

### Project Structure

The project is organized into the following main directories and files:

- **Backend**:
  - `server/index.js`: Sets up the Express server and connects to MongoDB.
  - `server/models/Goal.js`: Defines the Mongoose schema for goals.
  - `server/models/Progress.js`: Defines the Mongoose schema for progress tracking.
  - `server/routes/goals.js`: Handles API routes for managing goals.
  - `server/routes/weeklyReports.js`: Handles API routes for fetching weekly reports.
- **Frontend**:
  - `src/App.jsx`: Main React component.
  - `src/components/`: Contains various reusable React components.
  - `src/api/`: Contains API interaction functions.
  - `src/main.jsx`: Entry point for the React application.
  - `src/AppRouter.jsx`: Defines routing for the application.

## Features

### Add Goals
- **Manage Goals Page**: Users can add, edit, or delete goals through a modal interface.
- **Goal Details**: Specify the name of the goal and set a target number of minutes to spend on this goal each day.

### Display Today's Date
- The homepage displays the current date in a user-friendly format.

### List Today's Goals
- The homepage lists all goals the user has added, helping them focus on their daily objectives.

### Add Goal Minutes
- Users can input the number of minutes spent on each goal for the day, visualizing their progress.

### Toggle Between Days
- Users can view their progress from previous days using forward/back buttons.

### Progress Tracking
- The `Reports` page shows progress over time, including a historical log and monthly progress charts.

### Streak Tracking
- Tracks consecutive days the user has worked towards their goals.

### Streak Calendar
- Visual calendar showing goal streaks over time.

### Weekly Reports
- Provides a detailed breakdown of each day, grouped by week, showing progress and remaining target minutes.

## Getting started

### Requirements

- Node.js
- MongoDB (or MongoDB Atlas for cloud setup)
- npm (Node Package Manager)

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

4. **Run the backend server**:
    ```bash
    npm run server
    ```

5. **Run the frontend**:
    ```bash
    npm run dev
    ```

6. **Access the app**:
    - Open your browser and navigate to `http://localhost:3000`.

### License

The project is proprietary (not open source). Copyright (c) 2024.
```