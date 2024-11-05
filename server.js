import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'; // Added for parsing JSON bodies
import userRoutes from './routes/userRoutes.js'; // Importing the user routes

dotenv.config();

console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json()); // Using bodyParser to parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  console.log('MongoDB URI:', process.env.MONGODB_URI);
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  console.error('MongoDB URI:', process.env.MONGODB_URI);
});

// Using the user routes with the base path /api/users
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Discipline Tracker API' });
});

console.log('Attempting to start server on port', PORT);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});