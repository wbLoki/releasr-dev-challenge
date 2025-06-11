const { v4: uuidv4 } = require('uuid');

// In-memory database for tasks
let tasks = [];

class Task {
    constructor(title, description = '', priority, dueDate) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = false;
        this.dueDate = dueDate;
        this.createdAt = new Date().toISOString();
    }

    static getAll() {
        return tasks;
    }

    static getById(id) {
        return tasks.find((task) => task.id === id);
    }

    static create(taskData) {
        const task = new Task(
            taskData.title,
            taskData.description,
            taskData.priority,
            taskData.dueDate
        );
        tasks.push(task);
        return task;
    }

    static update(id, taskData) {
        const taskIndex = tasks.findIndex((task) => task.id === id);
        if (taskIndex === -1) return null;

        const updatedTask = { ...tasks[taskIndex], ...taskData, id };
        tasks[taskIndex] = updatedTask;
        return updatedTask;
    }

    static delete(id) {
        const taskIndex = tasks.findIndex((task) => task.id === id);
        if (taskIndex === -1) return false;

        tasks.splice(taskIndex, 1);
        return true;
    }
}

module.exports = Task;

