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
                    <option value='all'>Toutes</option>
                    <option value='active'>Actives</option>
                    <option value='completed'>Terminées</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor='dueDate'
                    className='block capitalize text-sm font-medium text-gray-700 dark:text-gray-300'
                >
                    date d’échéance
                </label>
                <select
                    id='dueDate'
                    value={dueDate}
                    onChange={(e) =>
                        onDueDateChange(e.target.value as DueDateFilter)
                    }
                    className='mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 text-gray-900 dark:text-white'
                >
                    <option value='all'>Toutes</option>
                    <option value='overdue'>En retard</option>
                    <option value='today'>Aujourd&apos;hui</option>
                    <option value='this_week'>Cette semaine</option>
                </select>
            </div>
        </div>
    );
}
