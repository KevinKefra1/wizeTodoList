import { PriorityOfTask, Task } from "../model";

export const filterTask = (filter: string, tasksData: Task[]): Task[] => {
    switch (filter) {
        case "All":
            return tasksData;

        case "Completed":
            return tasksData.filter((task) => task.endDate !== undefined || task.endDate !== null);

        case "Today":
            const today = new Date();
            return tasksData.filter((task) => task.startDate.getTime() === today.getTime());

        case "Priority":
            return tasksData.filter((task) => task.priority.toString() === PriorityOfTask.HIGH.toString());

        default:
            return tasksData;
    }
};