import jsPDF from 'jspdf';
import { Assignee } from '../model';

export  const exportUsersToPDF = (users: Assignee[]) => {
  const doc = new jsPDF();

  doc.setFont('Arial');
  doc.setFontSize(12);
  doc.setFont('custom', 'bold');
  doc.text('Users', 180, 30);

  doc.setLineWidth(0.1);

  doc.setDrawColor(200, 200, 200);

  doc.line(15, 45, 195, 25);

  doc.text('Id', 20, 50);
  doc.text('Name', 40, 50);
  doc.text('Email', 100, 50);
  doc.text('Phone', 140, 50);


  let y = 60;
  for (const user of users) {
    doc.text(user.id.toString(), 20, y);
    doc.text(user.name, 60, y);
    doc.text(user.email, 120, y);
    doc.text(user.phone, 180, y);
    y += 15;
  }


  
  // Save the PDF document
  doc.save('users.pdf');
};
