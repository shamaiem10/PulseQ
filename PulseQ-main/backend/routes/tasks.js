const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');


router.get('/', auth, taskController.getTasks.bind(taskController));
router.post('/', auth, taskController.createTask.bind(taskController));
router.put('/:id', auth, taskController.updateTask.bind(taskController));
router.delete('/:id', auth, taskController.deleteTask.bind(taskController));

module.exports = router;
