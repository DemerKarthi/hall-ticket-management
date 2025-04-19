import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Download as DownloadIcon, Logout as LogoutIcon } from '@mui/icons-material';

const HallTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  useEffect(() => {
    // Check if student is logged in
    const studentData = localStorage.getItem('currentStudent');
    if (!studentData) {
      navigate('/student-login');
      return;
    }
  }, [navigate]);

  // Mock data - in a real application, this would come from an API
  const hallTicketData = {
    id: 1,
    studentName: 'John Doe',
    rollNumber: '2024001',
    examName: 'Semester 1',
    examDate: '2024-03-15',
    examTime: '09:00 AM',
    examCenter: 'Main Campus, Building A',
    subjects: [
      { code: 'CS101', name: 'Computer Science' },
      { code: 'MA101', name: 'Mathematics' },
      { code: 'PH101', name: 'Physics' },
    ],
  };

  const handleDownload = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDownload = () => {
    // Create a new window for the hall ticket
    const printWindow = window.open('', '_blank');
    
    // Basic hall ticket HTML content
    const content = `
      <html>
        <head>
          <title>Hall Ticket #${hallTicketData.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .ticket { border: 1px solid #000; padding: 20px; max-width: 600px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; }
            .student-info { margin-bottom: 20px; }
            .exam-info { margin-bottom: 20px; }
            .subjects { margin-bottom: 20px; }
            .footer { text-align: center; margin-top: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="ticket">
            <div class="header">
              <h1>Hall Ticket</h1>
              <p>Ticket #${hallTicketData.id}</p>
            </div>
            
            <div class="student-info">
              <h2>Student Information</h2>
              <p><strong>Name:</strong> ${hallTicketData.studentName}</p>
              <p><strong>Roll Number:</strong> ${hallTicketData.rollNumber}</p>
            </div>
            
            <div class="exam-info">
              <h2>Exam Information</h2>
              <p><strong>Exam Name:</strong> ${hallTicketData.examName}</p>
              <p><strong>Date:</strong> ${hallTicketData.examDate}</p>
              <p><strong>Time:</strong> ${hallTicketData.examTime}</p>
              <p><strong>Center:</strong> ${hallTicketData.examCenter}</p>
            </div>
            
            <div class="subjects">
              <h2>Subjects</h2>
              <table>
                <tr>
                  <th>Subject Code</th>
                  <th>Subject Name</th>
                </tr>
                ${hallTicketData.subjects.map(subject => `
                  <tr>
                    <td>${subject.code}</td>
                    <td>${subject.name}</td>
                  </tr>
                `).join('')}
              </table>
            </div>
            
            <div class="footer">
              <p>This is an official hall ticket. Please bring this with you to the exam.</p>
              <p class="no-print">Generated on: ${new Date().toLocaleString()}</p>
            </div>
          </div>
          
          <div class="no-print" style="text-align: center; margin-top: 20px;">
            <button onclick="window.print()">Print Ticket</button>
          </div>
        </body>
      </html>
    `;
    
    printWindow.document.write(content);
    printWindow.document.close();
    handleCloseDialog();
  };

  const handleLogout = () => {
    localStorage.removeItem('currentStudent');
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Hall Ticket
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Divider sx={{ my: 2 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Student Name:</strong> {hallTicketData.studentName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Roll Number:</strong> {hallTicketData.rollNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Exam Name:</strong> {hallTicketData.examName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Exam Date:</strong> {hallTicketData.examDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Exam Time:</strong> {hallTicketData.examTime}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Exam Center:</strong> {hallTicketData.examCenter}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Subjects:
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Subject Code</TableCell>
                    <TableCell>Subject Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {hallTicketData.subjects.map((subject) => (
                    <TableRow key={subject.code}>
                      <TableCell>{subject.code}</TableCell>
                      <TableCell>{subject.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
            >
              Download Hall Ticket
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/student-dashboard')}
            >
              Back to Dashboard
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Download Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Download Hall Ticket</DialogTitle>
        <DialogContent>
          <Typography>
            The hall ticket will open in a new window. You can then print or save it as a PDF.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDownload} variant="contained" color="primary">
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HallTicket; 