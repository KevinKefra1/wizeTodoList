import { PriorityOfTask, Task } from "../model";

export const filterTask = (filter: string, tasksData: Task[]): Task[] => {
    switch (filter) {
        case "All":
            return tasksData;

        case "Completed":

            return tasksData.filter((task) => {
                return task?.endDate !== undefined ?? false;
            });

        case "Today":
            const today = new Date().setHours(0, 0, 0, 0);
            return tasksData.filter((task) => new Date(task.startDate).setHours(0, 0, 0, 0) === today);

        case "Priority":
            return tasksData.filter((task) => task.priority.toString() === PriorityOfTask.HIGH.toString());

        default:
            return tasksData;
    }
};