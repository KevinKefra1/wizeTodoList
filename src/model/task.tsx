import { Assignee, Label, PriorityOfTask } from ".";

export interface Task {
    id: number;
    title: string;
    assignee: Assignee;
    startDate: Date;
    endDate?: Date;
    priority: PriorityOfTask;
    labels: Label[];
    description: string;
}




export interface LoadTaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    addTask: (task: Task) => void;
    deleteTask: (task: Task) => void;
}
