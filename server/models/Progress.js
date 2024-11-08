import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  goalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  minutes: {
    type: Number,
    required: true,
    min: 0,
  },
  streakUpdated: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

export default mongoose.model('Progress', progressSchema);