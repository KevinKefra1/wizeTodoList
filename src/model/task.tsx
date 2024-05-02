import { Assignee, Label, PriorityOfTask } from ".";

export default interface Task {
    id: number;
    title: string;
    assignee: Assignee;
    startDate: Date;
    endDate?: Date;
    priority: PriorityOfTask;
    labels: Label[];
    description: string;
}





