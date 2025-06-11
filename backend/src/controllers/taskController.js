const Task = require('../models/taskModel');

// Controller for handling task-related operations
const taskController = {
    // GET /tasks - Get all tasks
    getAllTasks: (req, res) => {
        try {
            const tasks = Task.getAll();
            res.status(200).json({
                status: 'success',
                results: tasks.length,
                data: { tasks },
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve tasks',
            });
        }
    },

    // GET /tasks/:id - Get a specific task by ID
    getTaskById: (req, res) => {
        try {
            const { id } = req.params;
            const task = Task.getById(id);

            if (!task) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Task not found',
                });
            }

            res.status(200).json({
                status: 'success',
                data: { task },
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to retrieve task',
            });
        }
    },

    // POST /tasks - Create a new task
    createTask: (req, res) => {
        try {
            const { title, description, priority, dueDate } = req.body;
            console.log('Creating task:', {
                title,
                description,
                priority,
                dueDate,
            });

            if (!title) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Title is required',
                });
            }

            if (!priority) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Priority is required',
                });
            }

            if (!dueDate) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Due Date is required',
                });
            }

            const newTask = Task.create({
                title,
                description,
                priority,
                dueDate,
            });

            res.status(201).json({
                status: 'success',
                data: { task: newTask },
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message || 'Failed to create task',
            });
        }
    },

    // PUT /tasks/:id - Update a task
    updateTask: (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            const updatedTask = Task.update(id, updates);

            console.log('updates:', updates);
            console.log('Updated Task:', updatedTask);
            if (!updatedTask) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Task not found',
                });
            }

            res.status(200).json({
                status: 'success',
                data: { task: updatedTask },
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message || 'Failed to update task',
            });
        }
    },

    // DELETE /tasks/:id - Delete a task
    deleteTask: (req, res) => {
        try {
            const { id } = req.params;
            const deleted = Task.delete(id);

            if (!deleted) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'Task not found',
                });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Failed to delete task',
            });
        }
    },
};

module.exports = taskController;

