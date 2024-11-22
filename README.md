```markdown
# Discipline Tracker App

The Discipline Tracker App allows users to track their daily progress on personal goals, enabling them to see how their discipline evolves over time. The app provides an intuitive interface for goal management and progress tracking, fostering accountability and motivation.

## Overview

The Discipline Tracker App is built using modern web technologies to ensure a responsive and smooth user experience. The architecture includes a frontend built with React and styled using Bootstrap, and a backend powered by Node.js and Express, with MongoDB as the database. The project leverages several libraries and tools to facilitate development and enhance functionality, such as Axios for HTTP requests, Mongoose for MongoDB object modeling, and Chart.js for data visualization.

### Project Structure

- **Frontend**: The frontend is developed using React, with Vite as the development server and bundler. The React components are organized in the `src/components` directory.
- **Backend**: The backend is built with Node.js and Express, with routes and models defined in the `server` directory.
- **Database**: MongoDB is used as the NoSQL database, with Mongoose for schema definition and data modeling.
- **Styling**: The application is styled using Bootstrap to ensure a modern and responsive design.
- **Utilities**: Various utilities and middleware such as body-parser, cors, and morgan are used to handle HTTP requests, enable CORS, and log HTTP requests respectively.

## Features

### Add Goals
- **Manage Goals Page**: A separate page called `Goals` where users can click a `Manage Goals` button to open a modal for users to add, edit, or delete goals.
- **Goal Details**: Users can specify the name of the goal and set target minutes for each day of the week.

### Goals Modal
- **Input Fields**: The modal includes input fields for the goal's name and target minutes for each day of the week.

### Display Today's Date
- The homepage displays the current date in a user-friendly format.

### List Today's Goals
- The app lists all goals added by the user, including the target minutes for the current day of the week.

### Add Goal Minutes
- Users can input the number of minutes spent on each goal for the day and visualize their progress.

### Toggle Between Days
- Users can toggle between days to view their progress from previous days using forward/back buttons.

### Progress Tracking
- The `Reports` page shows progress over time, including a historical log of minutes spent on each goal broken down by weeks and months.

### Streak Tracking
- The `Reports` page tracks consecutive days the user has worked towards their goal, and the `Goals` page displays the current streak for each goal.

### Streak Calendar
- A calendar view for each goal shows goal streaks over time, with visual indicators for days worked towards the goal.

### User Authentication
- No user authentication is needed currently as the app runs locally.

### Weekly Reports
- A detailed breakdown of each day, grouped by week, showing progress on different goals and target minutes remaining.

### Import Page
- Users can import metrics by pasting data into a field and clicking an import button.

### Style the Website with Bootstrap
- The website is styled using Bootstrap to ensure a modern and professional look and feel.

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
    - Ensure MongoDB is running locally or configure a cloud version.

4. **Run the backend server**:
    ```bash
    cd server
    node index.js
    ```

5. **Run the frontend development server**:
    ```bash
    cd ..
    npm run dev
    ```

6. **Access the app**:
    - Open your browser and navigate to `http://localhost:3000`.

### License

This project is proprietary. All rights reserved. Copyright (c) 2024.
```