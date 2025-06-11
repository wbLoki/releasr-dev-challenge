import { Task } from '@/types/task';
import { useState, useMemo } from 'react';

type StatusFilter = 'all' | 'active' | 'completed';
type DueDateFilter = 'all' | 'overdue' | 'today' | 'this_week';

interface UseTaskFilterProps {
    initialStatus?: StatusFilter;
    initialDueDate?: DueDateFilter;
}

export function useTaskFilter(
    tasks: Task[],
    { initialStatus = 'all', initialDueDate = 'all' }: UseTaskFilterProps = {}
) {
    const [status, setStatus] = useState<StatusFilter>(initialStatus);
    const [dueDate, setDueDate] = useState<DueDateFilter>(initialDueDate);

    const filteredTasks = useMemo(() => {
        const now = new Date();
        const startOfToday = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        );
        const endOfToday = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1
        );
        const endOfWeek = new Date(now);
        endOfWeek.setDate(now.getDate() + (7 - now.getDay()));

        return tasks.filter((task) => {
            const due = new Date(task.dueDate);

            // Filter by status
            if (status === 'active' && task.completed) return false;
            if (status === 'completed' && !task.completed) return false;

            // Filter by due date
            if (dueDate === 'overdue' && due >= startOfToday) return false;
            if (
                dueDate === 'today' &&
                (due < startOfToday || due >= endOfToday)
            )
                return false;
            if (
                dueDate === 'this_week' &&
                (due < startOfToday || due > endOfWeek)
            )
                return false;

            return true;
        });
    }, [tasks, status, dueDate]);

    return {
        status,
        setStatus,
        dueDate,
        setDueDate,
        filteredTasks,
    };
}
