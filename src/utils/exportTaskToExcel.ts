import * as xlsx from 'xlsx';
import { Task } from '../model';

export const exportTasksToExcel = (tasks: Task[]) => {
  const formattedData = tasks.map((task) => taskToExcelRow(task));

  const worksheet = xlsx.utils.sheet_add_json(
    xlsx.utils.aoa_to_sheet([formattedData]),
    tasks
  );


  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Tasks');

  const filename = 'tasks.xlsx';
  xlsx.writeFile(workbook, filename,{ type: 'buffer' });
};

const taskToExcelRow = (task: Task) => {
  return [task.title, task.assignee.name, "task.startDate.toLocaleDateString()",task.endDate??"", task.priority, task.labels.join(', ')];
};
