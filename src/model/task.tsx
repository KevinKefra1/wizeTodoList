import { Assignee } from ".";

export default interface Task {
    id: number;
    title: string;
    assignee: Assignee;
    startDate: Date;
    endDate: Date;
    priority: PriorityOfTask;
    labels: Label[];
    description: string;
}

enum PriorityOfTask {
    LOW,
    MEDIUM,
    HIGH
}

enum Label {
    HTML,
    CSS,
    PYTHON,
    REACT,
    NEXT
}



