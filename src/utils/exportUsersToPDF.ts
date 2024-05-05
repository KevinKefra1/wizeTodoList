import jsPDF from 'jspdf';
import { User } from '../model';

export  const exportUsersToPDF = (users: User[]) => {
  const doc = new jsPDF();

  // Set font and font size
  doc.setFont('Arial');
  doc.setFontSize(12);
  doc.setFont('custom', 'bold');
  doc.text('Users', 180, 30);

  doc.setLineWidth(0.1);

  doc.setDrawColor(200, 200, 200);

  doc.line(15, 35, 195, 35);

  doc.text('Id', 20, 50);
  doc.text('Name', 40, 50);
  doc.text('Email', 100, 50);
  doc.text('Phone', 160, 50);


  let y = 60;
  for (const user of users) {
    doc.text(user.id.toString(), 20, y);
    doc.text(user.name, 40, y);
    doc.text(user.email, 100, y);
    doc.text(user.phone, 160, y);
    y += 15;
  }


  
  // Save the PDF document
  doc.save('users.pdf');
};
