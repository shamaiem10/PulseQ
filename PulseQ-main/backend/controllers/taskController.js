const taskService = require('../services/taskService');

class TaskController {

  async getTasks(req, res) {
    try {
      const tasks = await taskService.getTasks(req.user.userId);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createTask(req, res) {
    try {
      const newTask = await taskService.createTask(req.body, req.user.userId);
      res.status(201).json(newTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updateTask(req, res) {
    try {
      const task = await taskService.updateTask(
        req.params.id,
        req.user.userId,
        req.body
      );
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json(task);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async deleteTask(req, res) {
    try {
      const task = await taskService.deleteTask(req.params.id, req.user.userId);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json({ message: 'Task deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new TaskController();