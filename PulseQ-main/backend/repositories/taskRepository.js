const Task = require('../models/Task');

class TaskRepository {

  
  async getAllTasks(userId) {
    return Task.find({ userId }).sort({ createdAt: -1 });
  }

  
  async createTask(data, userId) {
    const task = new Task({ ...data, userId });
    return task.save();
  }

  async updateTask(id, userId, data) {
    return Task.findOneAndUpdate(
      { _id: id, userId },
      { $set: data },
      { new: true, runValidators: true }
    );
  }

  async deleteTask(id, userId) {
    return Task.findOneAndDelete({ _id: id, userId });
  }
}

module.exports = new TaskRepository();