import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  targetMinutes: {
    type: Number,
    required: true,
    min: 1,
  },
  currentStreak: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model('Goal', goalSchema);