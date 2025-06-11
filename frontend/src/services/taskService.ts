import axios from 'axios';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';

const API_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const taskService = {
    // Get all tasks
    getAllTasks: async (): Promise<Task[]> => {
        const response = await api.get('/tasks');
        return response.data.data.tasks;
    },

    // Get a task by ID
    getTaskById: async (id: string): Promise<Task> => {
        const response = await api.get(`/tasks/${id}`);
        return response.data.data.task;
    },

    // Create a new task
    createTask: async (taskData: CreateTaskInput): Promise<Task> => {
        const response = await api.post('/tasks', taskData);
        return response.data.data.task;
    },

    // Update a task
    updateTask: async (
        id: string,
        taskData: UpdateTaskInput
    ): Promise<Task> => {
        const response = await api.put(`/tasks/${id}`, taskData);
        return response.data.data.task;
    },

    // Delete a task
    deleteTask: async (id: string): Promise<void> => {
        await api.delete(`/tasks/${id}`);
    },
};

