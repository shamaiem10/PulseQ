const taskRepository = require('../repositories/taskRepository');

class TaskService {

 
  async getTasks(userId) {
    return taskRepository.getAllTasks(userId);
  }

  async createTask(taskData, userId) {
    if (!taskData.title || !taskData.description) {
      throw new Error('Title and description are required');
    }
    return taskRepository.createTask(taskData, userId);
  }

  async updateTask(id, userId, data) {
    return taskRepository.updateTask(id, userId, data);
  }

  async deleteTask(id, userId) {
    return taskRepository.deleteTask(id, userId);
  }
}

module.exports = new TaskService();