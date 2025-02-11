// models/Task.js
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the task.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for the task.'],
  },
  dueDate: {
    type: Date,
    required: [true, 'Please provide a due date.'],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
