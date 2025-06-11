export type TaskPriority = 'low' | 'medium' | 'high';

// Base types to reduce repetition
interface BaseTaskFields {
    title: string;
    description?: string;
    dueDate: string;
    priority: TaskPriority;
    completed: boolean;
}

// Main task interface
export interface Task extends BaseTaskFields {
    id: string;
    createdAt: string;
}

// Input types for creating and updating
export type CreateTaskInput = BaseTaskFields;

export type UpdateTaskInput = Partial<BaseTaskFields>;

// Form values used in the UI
export interface TaskFormValues extends BaseTaskFields {
    priority: TaskPriority;
    dueDate: string;
    completed: boolean;
}

