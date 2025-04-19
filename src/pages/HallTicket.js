import React from 'react';
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
} from '@mui/material';
import { Download as DownloadIcon, Logout as LogoutIcon } from '@mui/icons-material';

const HallTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    // TODO: Implement actual download functionality
    console.log('Downloading hall ticket...');
  };

  const handleLogout = () => {
    // TODO: Implement actual logout functionality
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
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default HallTicket; 