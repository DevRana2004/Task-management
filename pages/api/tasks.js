// pages/api/tasks.js
import dbConnect from '../../utils/db';
import Task from '../../models/Task';

export default async function handler(req, res) {
  await dbConnect();
  const { method, query: { id } } = req;

  switch (method) {
    case 'GET':
      try {
        if (id) {
          // Get a single task if id is provided
          const task = await Task.findById(id);
          if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
          }
          res.status(200).json({ success: true, data: task });
        } else {
          // Return all tasks
          const tasks = await Task.find({});
          res.status(200).json({ success: true, data: tasks });
        }
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'POST':
      try {
        const task = await Task.create(req.body);
        res.status(201).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'PUT':
      try {
        if (!id) {
          return res.status(400).json({ success: false, message: 'Missing task id' });
        }
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!task) {
          return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    case 'DELETE':
      try {
        if (!id) {
          return res.status(400).json({ success: false, message: 'Missing task id' });
        }
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
          return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}
