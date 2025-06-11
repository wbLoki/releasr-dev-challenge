import { motion } from 'framer-motion';
import { Task } from '../types/task';

interface TaskCardProps {
    task: Task;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string, completed: boolean) => void;
}

const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
};

const priorityText = {
    low: 'Faible',
    medium: 'Moyenne',
    high: 'Élevée',
};

export default function TaskCard({
    task,
    onEdit,
    onDelete,
    onToggleComplete,
}: TaskCardProps) {
    const formattedDate = new Date(task.createdAt).toLocaleDateString();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-3 border-l-4 h-full flex flex-col ${
                task.completed
                    ? 'border-green-500'
                    : `border-${
                          task.priority === 'high'
                              ? 'red'
                              : task.priority === 'medium'
                              ? 'yellow'
                              : 'blue'
                      }-500`
            }`}
        >
            <div className='flex items-center mb-2 gap-4'>
                <input
                    type='checkbox'
                    checked={task.completed}
                    onChange={() => onToggleComplete(task.id, !task.completed)}
                    className='h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                />
                <h3
                    className={`text-lg font-medium ${
                        task.completed
                            ? 'line-through text-gray-500 dark:text-gray-400'
                            : 'text-gray-900 dark:text-white'
                    }`}
                >
                    {task.title}
                </h3>
            </div>

            <div className='flex-1'>
                {task.description && (
                    <p className='mt-1 text-sm text-gray-600 dark:text-gray-300'>
                        {task.description}
                    </p>
                )}
            </div>

            <div className='flex justify-between items-center mt-4'>
                <div className='mt-2 flex items-center space-x-2'>
                    <span className='text-xs text-gray-500 dark:text-gray-400'>
                        {formattedDate}
                    </span>
                    <span
                        className={`text-xs px-2 py-1 rounded-full ${
                            priorityColors[task.priority]
                        }`}
                    >
                        {priorityText[task.priority]}
                    </span>
                </div>
                <div className='flex'>
                    <button
                        onClick={() => onEdit(task.id)}
                        className='p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300'
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
                                d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                            />
                        </svg>
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className='p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300'
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
                                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

