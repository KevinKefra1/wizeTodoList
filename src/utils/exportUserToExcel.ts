import * as xlsx from 'xlsx';
import { User, Task } from '../model';

export const exportUsersToExcel = (users: User[]) => {
  const formattedData = users.map((user) => taskToExcelRow(user));

  const worksheet = xlsx.utils.sheet_add_json(
    xlsx.utils.aoa_to_sheet([formattedData]),
    users
  );


  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Tasks');

  const filename = 'users.xlsx';
  xlsx.writeFile(workbook, filename,{ type: 'buffer' });
};

const taskToExcelRow = (user: User) => {
  return [user.name, user.email, user.phone];
};
