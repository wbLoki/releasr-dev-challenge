import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Task, TaskFormValues } from '../types/task';

const taskSchema = z.object({
    title: z.string().min(1, 'Le titre est obligatoire'),
    description: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high']),
    dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Date invalide',
    }),
    completed: z.boolean(),
});

interface TaskFormProps {
    task?: Task;
    onSubmit: (data: TaskFormValues) => void;
    onCancel: () => void;
}

export default function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
    const isEditMode = !!task;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskFormValues>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: task?.title || '',
            description: task?.description || '',
            priority: task?.priority || 'medium',
            dueDate: task?.dueDate
                ? new Date(task.dueDate).toISOString().split('T')[0]
                : '',
            completed: task?.completed || false,
        },
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6'
        >
            <h2 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
                {isEditMode ? 'Edit Task' : 'Add New Task'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div>
                    <label
                        htmlFor='title'
                        className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                    >
                        Titre
                    </label>
                    <input
                        id='title'
                        type='text'
                        {...register('title')}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    />
                    {errors.title && (
                        <p className='mt-1 text-sm text-red-600 dark:text-red-400'>
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor='description'
                        className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                    >
                        Description
                    </label>
                    <textarea
                        id='description'
                        {...register('description')}
                        rows={3}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    />
                </div>

                <div>
                    <label
                        htmlFor='priority'
                        className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                    >
                        Priorité
                    </label>
                    <select
                        id='priority'
                        {...register('priority')}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    >
                        <option value='low'>Faible</option>
                        <option value='medium'>Moyenne</option>
                        <option value='high'>Élevée</option>
                    </select>
                </div>

                <div>
                    <label
                        htmlFor='dueDate'
                        className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                    >
                        Date d’échéance
                    </label>
                    <input
                        id='dueDate'
                        type='date'
                        {...register('dueDate')}
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                    />
                    {errors.dueDate && (
                        <p className='mt-1 text-sm text-red-600 dark:text-red-400'>
                            {errors.dueDate.message}
                        </p>
                    )}
                </div>

                {isEditMode && (
                    <div className='flex items-center'>
                        <input
                            id='completed'
                            type='checkbox'
                            {...register('completed')}
                            className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                        />
                        <label
                            htmlFor='completed'
                            className='ml-2 block text-sm text-gray-700 dark:text-gray-300'
                        >
                            Marquer comme terminé
                        </label>
                    </div>
                )}

                <div className='flex justify-end space-x-3 pt-4'>
                    <button
                        type='button'
                        onClick={onCancel}
                        className='inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600'
                    >
                        Annuler
                    </button>
                    <button
                        type='submit'
                        className='inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                    >
                        {isEditMode ? 'Mettre à jour' : 'Créer'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
}

