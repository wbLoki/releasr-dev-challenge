'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskStore } from '../store/taskStore';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import SearchBar from '../components/SearchBar';
import { Task, TaskFormValues } from '../types/task';
import { useDarkMode } from '@/hooks/useDarkMode';

export default function Home() {
    const { tasks, isLoading, fetchTasks, addTask, updateTask, deleteTask } =
        useTaskStore();
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const { darkMode, toggleDarkMode } = useDarkMode();

    // Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // Filter tasks based on search query
    const filteredTasks = tasks.filter((task) => {
        if (!searchQuery) return true;

        const query = searchQuery.toLowerCase();
        return (
            task.title.toLowerCase().includes(query) ||
            (task.description && task.description.toLowerCase().includes(query))
        );
    });

    // Handle task form submission
    const handleTaskSubmit = (data: TaskFormValues) => {
        console.log('Task data submitted:', data);
        if (editingTask) {
            updateTask(editingTask.id, data);
            setEditingTask(null);
        } else {
            addTask(data);
        }
        setShowForm(false);
    };

    // Handle task edit
    const handleEditTask = (id: string) => {
        const task = tasks.find((t) => t.id === id);
        if (task) {
            setEditingTask(task);
            setShowForm(true);
        }
    };

    // Handle task completion toggle
    const handleToggleComplete = (id: string, completed: boolean) => {
        updateTask(id, { completed });
    };

    return (
        <div
            className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}
        >
            <div className='container mx-auto px-4 py-8 max-w-6xl'>
                <header className='mb-8'>
                    <div className='flex justify-between items-center mb-6'>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='text-3xl font-bold text-gray-900 dark:text-white'
                        >
                            Task Manager
                        </motion.h1>
                        <div className='flex items-center space-x-4'>
                            <button
                                onClick={toggleDarkMode}
                                className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                aria-label='Toggle dark mode'
                            >
                                {darkMode ? (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-5 w-5'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='h-5 w-5'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
                                        />
                                    </svg>
                                )}
                            </button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setEditingTask(null);
                                    setShowForm(!showForm);
                                }}
                                className='bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md flex items-center'
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5 mr-1'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 4v16m8-8H4'
                                    />
                                </svg>
                                Add Task
                            </motion.button>
                        </div>
                    </div>

                    <SearchBar onSearch={setSearchQuery} />

                    <AnimatePresence>
                        {showForm && (
                            <TaskForm
                                task={editingTask || undefined}
                                onSubmit={handleTaskSubmit}
                                onCancel={() => {
                                    setShowForm(false);
                                    setEditingTask(null);
                                }}
                            />
                        )}
                    </AnimatePresence>
                </header>

                <main>
                    <TaskList
                        tasks={filteredTasks}
                        onEdit={handleEditTask}
                        onDelete={deleteTask}
                        onToggleComplete={handleToggleComplete}
                        isLoading={isLoading}
                    />
                </main>
            </div>
        </div>
    );
}

