import { create } from 'zustand';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types/task';
import { taskService } from '../services/taskService';

interface TaskState {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    filter: {
        status: 'all' | 'completed' | 'active';
        sortBy: 'date' | 'priority';
    };

    // Actions
    fetchTasks: () => Promise<void>;
    addTask: (task: CreateTaskInput) => Promise<void>;
    updateTask: (id: string, task: UpdateTaskInput) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    setFilter: (filter: Partial<TaskState['filter']>) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    isLoading: false,
    error: null,
    filter: {
        status: 'all',
        sortBy: 'date',
    },

    fetchTasks: async () => {
        set({ isLoading: true, error: null });
        try {
            const tasks = await taskService.getAllTasks();
            set({ tasks, isLoading: false });
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to fetch tasks',
                isLoading: false,
            });
        }
    },

    addTask: async (taskData) => {
        set({ isLoading: true, error: null });
        try {
            const newTask = await taskService.createTask(taskData);
            set((state) => ({
                tasks: [...state.tasks, newTask],
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to add task',
                isLoading: false,
            });
        }
    },

    updateTask: async (id, taskData) => {
        set({ isLoading: true, error: null });
        try {
            const updatedTask = await taskService.updateTask(id, taskData);

            set((state) => {
                const taskIndex = state.tasks.findIndex(
                    (task) => task.id === id
                );
                if (taskIndex === -1) return state;

                const updatedTasks = [...state.tasks];
                updatedTasks[taskIndex] = {
                    ...updatedTask,
                };

                return { tasks: updatedTasks, isLoading: false };
            });
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to update task',
                isLoading: false,
            });
        }
    },

    deleteTask: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await taskService.deleteTask(id);
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
                isLoading: false,
            }));
        } catch (error) {
            set({
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to delete task',
                isLoading: false,
            });
        }
    },

    setFilter: (filter) => {
        set((state) => ({
            filter: { ...state.filter, ...filter },
        }));
    },
}));

