import { Label, PriorityOfTask, Task } from "../model";

export const listTasks: Task[] = [{
    id: 1,
    title: "Tâche 1",
    assignee: { id: 1, name: "kevin kefra", email: "kefra@example.com", phone: "+1234567890" },
    startDate: new Date(2024, 4, 1),
    endDate: new Date(2024, 4, 30),
    priority: PriorityOfTask.MEDIUM,
    labels: [Label.HTML],
    description: "Description de la tâche 1"
}, {
    id: 2,
    title: "Tâche 2",
    assignee: { id: 1, name: " kefra", email: "kefra2@example.com", phone: "+1234567890" },
    startDate: new Date(2024, 4, 1),
    endDate: new Date(2024, 4, 30),
    priority: PriorityOfTask.HIGH,
    labels: [Label.HTML, Label.CSS],
    description: "Description de la tâche 1"
}, {
    id: 3,
    title: "Tâche 3",
    assignee: { id: 1, name: "kevin", email: "kefra@example.com", phone: "+1234567890" },
    startDate: new Date(2024, 4, 1),
    endDate: new Date(2024, 4, 30),
    priority: PriorityOfTask.LOW,
    labels: [Label.NEXT],
    description: "Description de la tâche 1"
},]