import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  targetMinutes: {
    sunday: { type: Number, min: 0, required: true },
    monday: { type: Number, min: 0, required: true },
    tuesday: { type: Number, min: 0, required: true },
    wednesday: { type: Number, min: 0, required: true },
    thursday: { type: Number, min: 0, required: true },
    friday: { type: Number, min: 0, required: true },
    saturday: { type: Number, min: 0, required: true }
  },
  currentStreak: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

const Goal = mongoose.model('Goal', GoalSchema);

export default Goal;