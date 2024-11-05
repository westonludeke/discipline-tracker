import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Placeholder route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Discipline Tracker API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});