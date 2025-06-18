import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,           
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Done'],  
    default: 'Pending'
  }
});

const Task = mongoose.model('Task', TaskSchema);
export default Task;
