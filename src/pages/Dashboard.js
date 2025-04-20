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
  Alert,
} from '@mui/material';
import { School as StudentIcon, Logout as LogoutIcon } from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [hallTickets, setHallTickets] = useState([]);

  useEffect(() => {
    // Get student data from localStorage
    const storedStudent = JSON.parse(localStorage.getItem('currentStudent'));
    if (!storedStudent) {
      navigate('/student-login');
      return;
    }
    setStudentData(storedStudent);

    // Get hall tickets from localStorage
    const storedTickets = JSON.parse(localStorage.getItem('hallTickets')) || [];
    const studentTickets = storedTickets.filter(
      (ticket) => ticket.rollNumber === storedStudent.rollNumber
    );
    setHallTickets(studentTickets);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentStudent');
    navigate('/student-login');
  };

  const handleViewHallTicket = (ticketId) => {
    navigate(`/hall-ticket/${ticketId}`);
  };

  if (!studentData) {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <StudentIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="h5" component="h1">
                  Student Dashboard
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Welcome, {studentData.name}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Student Information
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Roll Number
                </Typography>
                <Typography variant="body1">{studentData.rollNumber}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Department
                </Typography>
                <Typography variant="body1">{studentData.department}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Year
                </Typography>
                <Typography variant="body1">{studentData.year}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Semester
                </Typography>
                <Typography variant="body1">{studentData.semester}</Typography>
              </Box>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Hall Tickets
            </Typography>
            {hallTickets.length === 0 ? (
              <Alert severity="info">No hall tickets available yet.</Alert>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Exam Name</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hallTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell>{ticket.examName}</TableCell>
                        <TableCell>{new Date(ticket.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              color: ticket.status === 'available' ? 'success.main' : 'error.main',
                            }}
                          >
                            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            disabled={ticket.status !== 'available'}
                            onClick={() => handleViewHallTicket(ticket.id)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard; 