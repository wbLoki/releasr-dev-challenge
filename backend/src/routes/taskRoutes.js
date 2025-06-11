const express = require('express');
const { body, param, validationResult } = require('express-validator');
const taskController = require('../controllers/taskController');

const router = express.Router();

// Validation middleware
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'fail',
            errors: errors.array(),
        });
    }
    next();
};

// GET /tasks — Liste des tâches
router.get('/', taskController.getAllTasks);

// GET /tasks/:id — Détails d'une tâche
router.get(
    '/:id',
    [
        param('id')
            .isString()
            .notEmpty()
            .withMessage('Valid task ID is required'),
    ],
    validateRequest,
    taskController.getTaskById
);

// POST /tasks — Création
router.post(
    '/',
    [
        body('title').isString().notEmpty().withMessage('Title is required'),
        body('description').optional().isString(),
        body('priority')
            .isIn(['low', 'medium', 'high'])
            .withMessage('Priority must be low, medium, or high'),
        body('dueDate')
            .isISO8601()
            .withMessage('Due date must be a valid date in ISO 8601 format')
            .toDate(),
    ],
    validateRequest,
    taskController.createTask
);

// PUT /tasks/:id — Mise à jour
router.put(
    '/:id',
    [
        param('id')
            .isString()
            .notEmpty()
            .withMessage('Valid task ID is required'),
        body('title').optional().isString(),
        body('description').optional().isString(),
        body('priority')
            .optional()
            .isIn(['low', 'medium', 'high'])
            .withMessage('Priority must be low, medium, or high'),
        body('dueDate')
            .optional()
            .isISO8601()
            .withMessage('Due date must be a valid date in ISO 8601 format')
            .toDate(),
        body('completed').optional().isBoolean(),
    ],
    validateRequest,
    taskController.updateTask
);

// DELETE /tasks/:id — Suppression
router.delete(
    '/:id',
    [
        param('id')
            .isString()
            .notEmpty()
            .withMessage('Valid task ID is required'),
    ],
    validateRequest,
    taskController.deleteTask
);

module.exports = router;

