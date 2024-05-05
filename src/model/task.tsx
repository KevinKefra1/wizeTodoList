import { User, Label, PriorityOfTask } from ".";

export interface Task {
    id: number;
    title: string;
    assignee: User;
    startDate: Date;
    endDate?: Date;
    priority: PriorityOfTask;
    labels: Label[];
    description: string;
}




export interface LoadTaskState {
    tasks: Task[];
    users: User[];
    loading: boolean;
    error: string | null;
    addTask: (task: Task) => void;
    deleteTask: (task: Task) => void;
}
