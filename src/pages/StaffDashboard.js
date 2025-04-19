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
  IconButton,
  Checkbox,
  Chip,
  Collapse,
  TablePagination,
} from '@mui/material';
import {
  Download as DownloadIcon,
  LogoutRounded as LogoutIcon,
  Person as StaffIcon,
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowUp as ExpandLessIcon,
} from '@mui/icons-material';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [students, setStudents] = useState([]);
  const [hallTickets, setHallTickets] = useState([]);

  useEffect(() => {
    // Check if staff is logged in
    const staffData = JSON.parse(localStorage.getItem('currentStaff'));
    if (!staffData) {
      navigate('/staff-login');
    }

    // Load data from localStorage
    const studentData = JSON.parse(localStorage.getItem('students') || '[]');
    const ticketData = JSON.parse(localStorage.getItem('hallTickets') || '[]');
    setStudents(studentData);
    setHallTickets(ticketData);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentStaff');
    navigate('/');
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedTickets(hallTickets.map(ticket => ticket.id));
    } else {
      setSelectedTickets([]);
    }
  };

  const handleSelectTicket = (ticketId) => {
    setSelectedTickets(prev => {
      if (prev.includes(ticketId)) {
        return prev.filter(id => id !== ticketId);
      } else {
        return [...prev, ticketId];
      }
    });
  };

  const handleExpandRow = (studentId) => {
    setExpandedRows(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDownloadIndividual = (ticket) => {
    const student = students.find(s => s.rollNumber === ticket.studentRollNumber);
    const ticketWithStudentDetails = {
      ...ticket,
      studentDetails: student
    };

    const blob = new Blob([JSON.stringify(ticketWithStudentDetails, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hall-ticket-${ticket.studentRollNumber}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadBulk = () => {
    if (selectedTickets.length === 0) {
      alert('Please select at least one hall ticket to download');
      return;
    }

    const selectedTicketsData = hallTickets
      .filter(ticket => selectedTickets.includes(ticket.id))
      .map(ticket => {
        const student = students.find(s => s.rollNumber === ticket.studentRollNumber);
        return {
          ...ticket,
          studentDetails: student
        };
      });

    const blob = new Blob([JSON.stringify(selectedTicketsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulk-hall-tickets-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStudentTickets = (studentRollNumber) => {
    return hallTickets.filter(ticket => ticket.studentRollNumber === studentRollNumber);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
            <StaffIcon />
          </Avatar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Staff Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Student Hall Tickets</Typography>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadBulk}
              disabled={selectedTickets.length === 0}
            >
              Download Selected
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedTickets.length === hallTickets.length}
                      indeterminate={selectedTickets.length > 0 && selectedTickets.length < hallTickets.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Student Details</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Semester</TableCell>
                  <TableCell>Hall Tickets</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student) => {
                    const studentTickets = getStudentTickets(student.rollNumber);
                    return (
                      <React.Fragment key={student.id}>
                        <TableRow>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={studentTickets.every(ticket => selectedTickets.includes(ticket.id))}
                              onChange={() => {
                                if (studentTickets.every(ticket => selectedTickets.includes(ticket.id))) {
                                  setSelectedTickets(prev => prev.filter(id => !studentTickets.map(t => t.id).includes(id)));
                                } else {
                                  setSelectedTickets(prev => [...prev, ...studentTickets.map(t => t.id)]);
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton
                                size="small"
                                onClick={() => handleExpandRow(student.id)}
                              >
                                {expandedRows.includes(student.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                              </IconButton>
                              <Box>
                                <Typography variant="subtitle1">{student.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Roll No: {student.rollNumber}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>{student.department}</TableCell>
                          <TableCell>{student.semester}</TableCell>
                          <TableCell>
                            {studentTickets.length > 0 ? (
                              <Chip
                                label={`${studentTickets.length} Ticket${studentTickets.length > 1 ? 's' : ''}`}
                                color="primary"
                                variant="outlined"
                              />
                            ) : (
                              <Chip label="No Tickets" color="default" variant="outlined" />
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {studentTickets.length > 0 && (
                              <IconButton
                                color="primary"
                                onClick={() => handleDownloadIndividual(studentTickets[0])}
                              >
                                <DownloadIcon />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={expandedRows.includes(student.id)} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                  Hall Tickets
                                </Typography>
                                <Table size="small">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Exam Name</TableCell>
                                      <TableCell>Date</TableCell>
                                      <TableCell>Status</TableCell>
                                      <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {studentTickets.map((ticket) => (
                                      <TableRow key={ticket.id}>
                                        <TableCell>{ticket.examName}</TableCell>
                                        <TableCell>{ticket.examDate}</TableCell>
                                        <TableCell>
                                          <Chip
                                            label={ticket.status}
                                            color={ticket.status === 'Available' ? 'success' : 'default'}
                                            size="small"
                                          />
                                        </TableCell>
                                        <TableCell align="right">
                                          <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() => handleDownloadIndividual(ticket)}
                                          >
                                            <DownloadIcon />
                                          </IconButton>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </Box>
  );
};

export default StaffDashboard; 