```markdown
# Discipline Tracker App

The Discipline Tracker App allows users to track their daily progress on personal goals, enabling them to see how their discipline evolves over time. The app provides an intuitive interface for goal management and progress tracking, fostering accountability and motivation.

## Overview

The Discipline Tracker App is built using a modern web stack with a focus on simplicity and ease of use. The architecture consists of a React frontend bundled with Vite for fast development and a Node.js backend using Express to serve the API. MongoDB is used as the database to store goals and progress data.

### Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **MongoDB**: NoSQL database for storing goals and progress data.
- **Express**: Web server framework for Node.js.
- **Mongoose**: MongoDB object modeling tool for Node.js.
- **Bootstrap**: CSS framework for responsive front-end design.
- **Body-parser**: Middleware for parsing incoming request bodies.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.
- **Morgan**: HTTP request logger middleware.
- **Chart.js**: JavaScript library for creating charts.
- **jQuery**: JavaScript library for DOM manipulation.
- **Day.js**: Lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.
- **React**: Frontend library for building user interfaces.
- **Vite**: Development server and build tool for modern web projects.

### Project Structure

The project is organized as follows:

```
discipline-tracker-app/
├── .eslintrc.cjs
├── .gitignore
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
│       └── goals.js
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── AppRouter.jsx
│   ├── api/
│   │   ├── goals.js
│   │   └── progress.js
│   ├── assets/
│   │   └── .gitkeep
│   ├── components/
│   │   ├── Goals.jsx
│   │   ├── GoalsList.jsx
│   │   ├── HomePage.jsx
│   │   └── Modal.jsx
│   ├── index.css
│   └── main.jsx
└── vite.config.js
```

## Features

- **Add Goals**: Manage goals through a modal where users can add, edit, or delete goals.
- **Display Today's Date**: The homepage displays the current date in a user-friendly format.
- **List Today's Goals**: The homepage lists all goals for the day with the ability to input minutes spent on each goal.
- **Toggle Between Days**: Users can navigate between days to view progress from previous days.
- **Progress Tracking**: A `Reports` page shows historical progress, trends, and total minutes spent on goals.
- **Streak Tracking**: Track consecutive days of goal adherence and visualize streaks on a calendar.
- **User Authentication**: No user authentication is required as the app runs locally.

## Getting Started

### Requirements

- Node.js
- MongoDB (or MongoDB Atlas for cloud-based database)

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

3. **Start the MongoDB server**:
   If using a local MongoDB instance, ensure it is running. For MongoDB Atlas, set up your connection string.

4. **Configure environment variables**:
   Create a `.env` file in the root directory with the following content:
   ```env
   MONGODB_URI=mongodb://localhost:27017/discipline-tracker-app
   PORT=3000
   ```

5. **Run the backend server**:
   ```bash
   npm run server
   ```

6. **Run the frontend development server**:
   In a separate terminal, run:
   ```bash
   npm run dev
   ```

7. **Access the app**:
   Open your browser and navigate to `http://localhost:3000`.

### License

The project is proprietary (not open source).  
Copyright (c) 2024.
```