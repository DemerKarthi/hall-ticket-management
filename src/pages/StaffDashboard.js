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
  Grid,
  Pagination,
} from '@mui/material';
import {
  Download as DownloadIcon,
  LogoutRounded as LogoutIcon,
  Person as StaffIcon,
  KeyboardArrowDown as ExpandMoreIcon,
  KeyboardArrowUp as ExpandLessIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { jsPDF } from 'jspdf';

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
      const allTicketIds = hallTickets.map(ticket => ticket.id);
      setSelectedTickets(allTicketIds);
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
    
    const doc = new jsPDF('p', 'mm', 'a4');
    let yPosition = 20;
    
    // Add college header with styling
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Solamalai College of Engineering', 105, yPosition, { align: 'center' });
    yPosition += 10;
    
    doc.setFontSize(16);
    doc.text('Hall Ticket', 105, yPosition, { align: 'center' });
    yPosition += 15;

    // Add generation date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Generated on: ${currentDate}`, 15, yPosition);
    yPosition += 15;

    // Add student details section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Student Details', 15, yPosition);
    yPosition += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Name: ${student?.name || 'N/A'}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Roll Number: ${student?.rollNumber || 'N/A'}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Department: ${student?.department || 'N/A'}`, 20, yPosition);
    yPosition += 15;

    // Add exam details section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Exam Details', 15, yPosition);
    yPosition += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Exam Name: ${ticket.examName || 'N/A'}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Date: ${ticket.examDate || 'N/A'}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Time: ${ticket.examTime || 'N/A'}`, 20, yPosition);
    yPosition += 7;
    doc.text(`Venue: ${ticket.examVenue || 'N/A'}`, 20, yPosition);
    yPosition += 15;

    // Add instructions section
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('Important Instructions', 15, yPosition);
    yPosition += 10;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const instructions = [
      '1. Bring this hall ticket to the examination hall',
      '2. Carry a valid ID proof',
      '3. Arrive at least 30 minutes before the exam',
      '4. Follow all examination rules and regulations'
    ];

    instructions.forEach(instruction => {
      doc.text(instruction, 20, yPosition);
      yPosition += 7;
    });

    // Add footer
    doc.setFontSize(8);
    doc.text('This is a computer-generated hall ticket. No signature required.', 105, 285, { align: 'center' });

    // Save the PDF
    const fileName = `hall-ticket-${student?.rollNumber || 'unknown'}.pdf`;
    doc.save(fileName);
  };

  const getStudentTickets = (studentRollNumber) => {
    return hallTickets.filter(ticket => ticket.studentRollNumber === studentRollNumber);
  };

  const handleDownloadBulk = () => {
    const availableTickets = hallTickets.filter(ticket => ticket.status === 'Available');
    
    if (availableTickets.length === 0) {
      alert('No available hall tickets to download');
      return;
    }

    const doc = new jsPDF('p', 'mm', 'a4');
    let yPosition = 20;
    
    // Add college header with styling
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Solamalai College of Engineering', 105, yPosition, { align: 'center' });
    yPosition += 10;
    
    doc.setFontSize(16);
    doc.text('Hall Tickets', 105, yPosition, { align: 'center' });
    yPosition += 15;

    // Add generation date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Generated on: ${currentDate}`, 15, yPosition);
    yPosition += 15;

    // Add table headers
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Student Name', 15, yPosition);
    doc.text('Roll No.', 50, yPosition);
    doc.text('Department', 80, yPosition);
    doc.text('Exam', 120, yPosition);
    doc.text('Date', 150, yPosition);
    doc.text('Time', 170, yPosition);
    yPosition += 7;

    // Add horizontal line
    doc.setDrawColor(0, 0, 0);
    doc.line(15, yPosition, 195, yPosition);
    yPosition += 10;

    // Add ticket data
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    availableTickets.forEach(ticket => {
      const student = students.find(s => s.rollNumber === ticket.studentRollNumber);
      
      if (yPosition > 270) { // Check if we need a new page
        doc.addPage();
        yPosition = 20;
      }

      // Ensure all values are strings and not undefined/null
      const studentName = String(student?.name || 'N/A');
      const rollNumber = String(student?.rollNumber || 'N/A');
      const department = String(student?.department || 'N/A');
      const examName = String(ticket.examName || 'N/A');
      const examDate = String(ticket.examDate || 'N/A');
      const examTime = String(ticket.examTime || 'N/A');

      doc.text(studentName, 15, yPosition);
      doc.text(rollNumber, 50, yPosition);
      doc.text(department, 80, yPosition);
      doc.text(examName, 120, yPosition);
      doc.text(examDate, 150, yPosition);
      doc.text(examTime, 170, yPosition);
      
      // Add a light horizontal line between rows
      doc.setDrawColor(200, 200, 200);
      doc.line(15, yPosition + 5, 195, yPosition + 5);
      
      yPosition += 10;
    });

    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
    }

    // Save the PDF
    const fileName = `hall-tickets-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      bgcolor: 'background.default', 
      minHeight: '100vh',
      py: 4,
      px: 2
    }}>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4 
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              color: 'primary.main',
              letterSpacing: '-0.5px'
            }}
          >
            Hall Tickets
          </Typography>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadBulk}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: 'none',
              '&:hover': {
                bgcolor: 'primary.dark',
                boxShadow: 'none'
              }
            }}
          >
            Download All
          </Button>
        </Box>

        <Grid container spacing={3}>
          {students
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((student) => {
              const studentTickets = getStudentTickets(student.rollNumber);
              return (
                <Grid item xs={12} key={student.id}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 3,
                      borderRadius: 3,
                      bgcolor: 'background.paper',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.2s',
                      '&:hover': {
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2
                    }}>
                      <Box>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            mb: 0.5,
                            color: 'text.primary'
                          }}
                        >
                          {student.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                          }}
                        >
                          <SchoolIcon sx={{ fontSize: 16 }} />
                          {student.department}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip
                          label={`${studentTickets.length} Ticket${studentTickets.length !== 1 ? 's' : ''}`}
                          color="primary"
                          variant="outlined"
                          sx={{ 
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            fontWeight: 500
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleExpandRow(student.id)}
                          sx={{
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: 'primary.light'
                            }
                          }}
                        >
                          {expandedRows.includes(student.id) ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </Box>
                    </Box>

                    <Collapse in={expandedRows.includes(student.id)} timeout="auto" unmountOnExit>
                      <Box sx={{ mt: 3 }}>
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            fontWeight: 600,
                            mb: 2,
                            color: 'text.primary'
                          }}
                        >
                          Exam Details
                        </Typography>
                        <Grid container spacing={2}>
                          {studentTickets.map((ticket) => (
                            <Grid item xs={12} sm={6} key={ticket.id}>
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 2,
                                  borderRadius: 2,
                                  bgcolor: 'background.default',
                                  border: '1px solid',
                                  borderColor: 'divider'
                                }}
                              >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    {ticket.examName}
                                  </Typography>
                                  <Chip
                                    label={ticket.status}
                                    color={ticket.status === 'Available' ? 'success' : 'default'}
                                    size="small"
                                    sx={{ 
                                      fontWeight: 500,
                                      height: 24
                                    }}
                                  />
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                  Date: {ticket.examDate}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                  <Button
                                    size="small"
                                    startIcon={<DownloadIcon />}
                                    onClick={() => handleDownloadIndividual(ticket)}
                                    sx={{
                                      textTransform: 'none',
                                      color: 'primary.main',
                                      '&:hover': {
                                        bgcolor: 'primary.light'
                                      }
                                    }}
                                  >
                                    Download
                                  </Button>
                                </Box>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Collapse>
                  </Paper>
                </Grid>
              );
            })}
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(students.length / rowsPerPage)}
            page={page + 1}
            onChange={(event, value) => handleChangePage(event, value - 1)}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                borderRadius: 2,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark'
                  }
                }
              }
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default StaffDashboard;