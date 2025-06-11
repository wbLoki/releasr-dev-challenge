import React from 'react';

type StatusFilter = 'all' | 'active' | 'completed';
type DueDateFilter = 'all' | 'overdue' | 'today' | 'this_week';

interface FilterProps {
    status: StatusFilter;
    dueDate: DueDateFilter;
    onStatusChange: (status: StatusFilter) => void;
    onDueDateChange: (dueDate: DueDateFilter) => void;
}

export function TaskFilter({
    status,
    dueDate,
    onStatusChange,
    onDueDateChange,
}: FilterProps) {
    return (
        <div className='flex space-x-4 items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md'>
            <div>
                <label
                    htmlFor='status'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                    Status
                </label>
                <select
                    id='status'
                    value={status}
                    onChange={(e) =>
                        onStatusChange(e.target.value as StatusFilter)
                    }
                    className='mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white'
                >
                    <option value='all'>All</option>
                    <option value='active'>Active</option>
                    <option value='completed'>Completed</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor='dueDate'
                    className='block text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                    Due Date
                </label>
                <select
                    id='dueDate'
                    value={dueDate}
                    onChange={(e) =>
                        onDueDateChange(e.target.value as DueDateFilter)
                    }
                    className='mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white'
                >
                    <option value='all'>All Dates</option>
                    <option value='overdue'>Overdue</option>
                    <option value='today'>Due Today</option>
                    <option value='this_week'>Due This Week</option>
                </select>
            </div>
        </div>
    );
}
