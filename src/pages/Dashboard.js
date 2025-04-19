import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  AppBar,
  Toolbar,
  Avatar,
} from '@mui/material';
import { LogoutRounded as LogoutIcon, School as StudentIcon } from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [hallTickets, setHallTickets] = useState([
    {
      id: 1,
      examName: 'Mid Semester Examination',
      examDate: '2024-04-15',
      status: 'Available',
    },
    {
      id: 2,
      examName: 'Final Semester Examination',
      examDate: '2024-05-20',
      status: 'Pending',
    },
  ]);

  useEffect(() => {
    // Retrieve student data from localStorage
    const storedData = localStorage.getItem('studentData');
    if (!storedData) {
      // If no student data, redirect to login
      navigate('/student-login');
      return;
    }
    setStudentData(JSON.parse(storedData));
  }, [navigate]);

  const handleViewHallTicket = (id) => {
    navigate(`/hall-ticket/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('studentData');
    navigate('/');
  };

  if (!studentData) {
    return null; // or a loading spinner
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
            <StudentIcon />
          </Avatar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Welcome, {studentData.name}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Roll Number: {studentData.rollNumber}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Department: {studentData.department}
          </Typography>
        </Paper>

        <Typography variant="h5" gutterBottom>
          Your Hall Tickets
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Exam Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hallTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.examName}</TableCell>
                  <TableCell>{ticket.examDate}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      onClick={() => handleViewHallTicket(ticket.id)}
                      disabled={ticket.status !== 'Available'}
                    >
                      View Hall Ticket
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Dashboard; 