import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import goalRoutes from './routes/goals.js';
import { router as weeklyReportsRoutes } from './routes/weeklyReports.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

mongoose.connect('mongodb://localhost:27017/discipline-tracker-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected successfully.');
  console.log('Database connection string:', mongoose.connection.host + ':' + mongoose.connection.port);
})
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.use('/api/goals', goalRoutes);
app.use('/api', weeklyReportsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API is accessible at http://localhost:${PORT}/api`);
});