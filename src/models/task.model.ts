import mongoose from 'mongoose';

export interface ITask {
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  userId: mongoose.Types.ObjectId;
}

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export const Task = mongoose.model<ITask>('Task', taskSchema);