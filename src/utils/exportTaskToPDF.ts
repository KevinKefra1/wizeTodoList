import jsPDF from 'jspdf';
import { Task } from '../model';
import { formatDate } from './formatDate';

export  const exportTasksToPDF = (tasks: Task[]) => {
  const doc = new jsPDF();

  // Set font and font size
  doc.setFont('Arial');
  doc.setFontSize(12);
  doc.setFont('custom', 'bold');
  doc.text('TACHES', 180, 12);

  doc.setLineWidth(0.1);

  doc.setDrawColor(200, 200, 200);

  doc.line(15, 25, 195, 25);

  doc.text('Title', 20, 30);
  doc.text('Assignee', 60, 30);
  doc.text('Priority', 100, 30);
  doc.text('Labels', 140, 30);
  doc.text('Status', 180, 30);

  let y = 40;
  for (const task of tasks) {
    doc.text(task.title, 20, y);
    doc.text(task.assignee?.name.trim()??"kefra", 60, y);
    doc.text(task.priority, 100, y);
    doc.text(task.labels.join(', '), 140, y);
    doc.text(task.endDate!==undefined?"Completed":"Being processed", 180, y);
    y += 15;
  }


  
  // Save the PDF document
  doc.save('tasks.pdf');
};
