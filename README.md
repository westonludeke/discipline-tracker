```markdown
# Discipline Tracker App

The Discipline Tracker App allows users to track their daily progress on personal goals, enabling them to see how their discipline evolves over time. The app provides an intuitive interface for goal management and progress tracking, fostering accountability and motivation.

## Overview

The Discipline Tracker App is built using modern web technologies to ensure a smooth and responsive user experience. The frontend is developed with React and styled using Bootstrap for a clean and responsive design. The backend is powered by Node.js with Express.js to handle server-side logic and MongoDB for data storage. The application also incorporates various libraries such as Mongoose for MongoDB object modeling, Chart.js for visualizing progress, and Day.js for date manipulation.

### Project Structure

- **Frontend**: React with Vite for fast development, Bootstrap for styling, Axios for API requests.
- **Backend**: Node.js with Express.js, Mongoose for MongoDB interactions, various middleware for request handling.
- **Database**: MongoDB for storing user goals and progress data.

### Key Files and Directories

- `src/`: Contains all the frontend React components and assets.
  - `components/`: React components for different parts of the app.
  - `api/`: API service files for interacting with the backend.
  - `App.jsx`: Main app component.
  - `main.jsx`: Entry point for the React app.
- `server/`: Contains the backend server code.
  - `models/`: Mongoose schemas for MongoDB collections.
  - `routes/`: Express routes for handling API requests.
  - `index.js`: Main server file.
- `.eslintrc.cjs`: Configuration for ESLint.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `package.json`: Metadata for the Node.js project, including dependencies and scripts.
- `README.md`: Project documentation (this file).

## Features

- **Add Goals**: Manage goals through a dedicated modal, specifying goal name and target minutes.
- **Display Today's Date**: Homepage displays the current date in a user-friendly format.
- **List Today's Goals**: Homepage lists all goals for the day with the ability to input minutes spent on each goal.
- **Toggle Between Days**: Navigate between days to view past progress.
- **Progress Tracking**: Detailed reports page showing historical progress with charts and logs.
- **Streak Tracking**: Track consecutive days of goal achievement.
- **Streak Calendar**: Visualize goal streaks over time with a calendar view.
- **User Authentication**: No user authentication needed; app runs locally.
- **Weekly Reports**: Detailed breakdown of daily progress grouped by week with color-coded columns for goals.

## Getting started

### Requirements

To run the Discipline Tracker App, you need to have the following technologies installed on your computer:

- Node.js
- MongoDB (or use a cloud version like MongoDB Atlas)

### Quickstart

1. **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd discipline-tracker-app
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up MongoDB**:
   - Ensure MongoDB is running locally or set up a cloud instance (e.g., MongoDB Atlas).

4. **Run the backend server**:
    ```bash
    cd server
    node index.js
    ```

5. **Run the frontend**:
    ```bash
    cd ..
    npm run dev
    ```

6. **Access the app**:
   - Open your browser and navigate to `http://localhost:3000`.

### License

The project is proprietary (not open source). Copyright (c) 2024.
```