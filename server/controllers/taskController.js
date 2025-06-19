import Task from '../models/TaskModel.js';


export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
  }
};


export const createTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  try {
    const task = new Task({
      userId: req.user.userId,
      title,
      description,
      dueDate,
      status
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create task', details: err.message });
  }
};


export const updateTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOne({ _id: taskId, userId: req.user.userId });

    if (!task) return res.status(404).json({ error: 'Task not found' });

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update task', details: err.message });
  }
};


export const deleteTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const task = await Task.findOneAndDelete({ _id: taskId, userId: req.user.userId });

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete task', details: err.message });
  }
};
