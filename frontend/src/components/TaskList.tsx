import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';
import { Task, TaskPriority } from '@/types/task';
import { useTaskFilter } from '@/hooks/useTaskFilter';
import { TaskFilter } from './TaskFilter';

interface TaskListProps {
    tasks: Task[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string, completed: boolean) => void;
    isLoading: boolean;
}

export default function TaskList({
    tasks,
    onEdit,
    onDelete,
    onToggleComplete,
    isLoading,
}: TaskListProps) {
    const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');
    const [view, setView] = useState<'grid' | 'list'>('grid');

    const { status, setStatus, dueDate, setDueDate, filteredTasks } =
        useTaskFilter(tasks);

    // Sort tasks based on date or priority
    const sortedTasks = [...filteredTasks].sort((a: Task, b: Task) => {
        if (sortBy === 'date') {
            return (
                new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
            );
        }

        const priorityValues: Record<TaskPriority, number> = {
            high: 3,
            medium: 2,
            low: 1,
        };

        // Sort by priority (high > medium > low)
        return priorityValues[b.priority] - priorityValues[a.priority];
    });

    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-40'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
            </div>
        );
    }

    return (
        <div className='space-y-4'>
            <div className='flex flex-wrap gap-3 justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4'>
                {/* <div className='flex space-x-2'>
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1 rounded-md text-sm ${
                            filter === 'all'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('active')}
                        className={`px-3 py-1 rounded-md text-sm ${
                            filter === 'active'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={`px-3 py-1 rounded-md text-sm ${
                            filter === 'completed'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                    >
                        Completed
                    </button>
                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value as 'date' | 'priority')
                        }
                        className='bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-1'
                    >
                        <option value='date'>Sort by Date</option>
                        <option value='priority'>Sort by Priority</option>
                    </select>
                </div> */}

                <TaskFilter
                    status={status}
                    dueDate={dueDate}
                    onStatusChange={setStatus}
                    onDueDateChange={setDueDate}
                />
                <div className='flex space-x-2'>
                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value as 'date' | 'priority')
                        }
                        className='bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md text-sm px-3 py-1 text-gray-900 dark:text-white'
                    >
                        <option value='date'>Sort by Date</option>
                        <option value='priority'>Sort by Priority</option>
                    </select>

                    <div className='flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden'>
                        <button
                            onClick={() => setView('grid')}
                            className={`p-1 ${
                                view === 'grid'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                        >
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
                                    d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                                />
                            </svg>
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={`p-1 ${
                                view === 'list'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                        >
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
                                    d='M4 6h16M4 10h16M4 14h16M4 18h16'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {sortedTasks.length === 0 ? (
                <div className='text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow'>
                    <p className='text-gray-500 dark:text-gray-400'>
                        No tasks found
                    </p>
                </div>
            ) : (
                <div
                    className={
                        view === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch'
                            : 'space-y-3'
                    }
                >
                    <AnimatePresence>
                        {sortedTasks.map((task) => (
                            <motion.div
                                key={task.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <TaskCard
                                    task={task}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                    onToggleComplete={onToggleComplete}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

