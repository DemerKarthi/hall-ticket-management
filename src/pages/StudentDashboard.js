import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import studentData from '../helpers/studentData';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [student, setStudent] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Check if student is logged in
    const currentStudent = localStorage.getItem('currentStudent');
    if (!currentStudent) {
      navigate('/student-login');
      return;
    }
    const parsedStudent = JSON.parse(currentStudent);
    
    // Get student details from studentData
    const studentDetails = studentData.find(s => s.rollNumber === parsedStudent.rollNumber);
    if (studentDetails) {
      setStudent({
        ...parsedStudent,
        ...studentDetails
      });
    } else {
      setStudent(parsedStudent);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentStudent');
    navigate('/');
  };

  const handleDownloadHallTicket = () => {
    setSelectedTicket('download');
    setOpenDialog(true);
  };

  const handlePrintHallTicket = () => {
    setSelectedTicket('print');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTicket(null);
  };

  const handleConfirmAction = () => {
    const printWindow = window.open('', '_blank');
    const content = `
      <html>
        <head>
          <title>Hall Ticket - ${student.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .ticket { border: 1px solid #000; padding: 20px; max-width: 800px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; }
            .student-info { margin-bottom: 20px; }
            .exam-info { margin-bottom: 20px; }
            .footer { text-align: center; margin-top: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
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
              <p>Academic Year 2023-2024</p>
            </div>
            
            <div class="student-info">
              <h2>Student Information</h2>
              <p><strong>Name:</strong> ${student.name}</p>
              <p><strong>Roll Number:</strong> ${student.rollNumber}</p>
              <p><strong>Department:</strong> ${student.department}</p>
            </div>
            
            <div class="exam-info">
              <h2>Exam Schedule</h2>
              <table>
                <tr>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Venue</th>
                </tr>
                <tr>
                  <td>Mathematics</td>
                  <td>15 April 2024</td>
                  <td>09:00 AM - 12:00 PM</td>
                  <td>Main Campus, Block A</td>
                </tr>
                <tr>
                  <td>Physics</td>
                  <td>17 April 2024</td>
                  <td>09:00 AM - 12:00 PM</td>
                  <td>Main Campus, Block B</td>
                </tr>
                <tr>
                  <td>Chemistry</td>
                  <td>19 April 2024</td>
                  <td>09:00 AM - 12:00 PM</td>
                  <td>Main Campus, Block C</td>
                </tr>
              </table>
            </div>
            
            <div class="footer">
              <p>This is an official hall ticket. Please bring this with you to all exams.</p>
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
    
    if (selectedTicket === 'print') {
      printWindow.print();
    }
    handleCloseDialog();
  };

  if (!student) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container spacing={3}>
          {/* Student Profile Card */}
          <Grid item xs={12} md={4}>
            <Card 
              elevation={0}
              sx={{ 
                height: '100%',
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2
              }}
            >
              <CardContent sx={{ textAlign: 'center', pt: 4 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    margin: '0 auto 16px',
                    bgcolor: theme.palette.primary.main,
                  }}
                >
                  <PersonIcon sx={{ fontSize: 50 }} />
                </Avatar>
                <Typography variant="h5" gutterBottom>
                  {student.name}
                </Typography>
                <Chip
                  label={student.department}
                  color="primary"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <List sx={{ width: '100%' }}>
                  <ListItem>
                    <ListItemText
                      primary="Roll Number"
                      secondary={student.rollNumber}
                      primaryTypographyProps={{ color: 'text.secondary' }}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Email"
                      secondary={student.email}
                      primaryTypographyProps={{ color: 'text.secondary' }}
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Department"
                      secondary={student.department}
                      primaryTypographyProps={{ color: 'text.secondary' }}
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Hall Ticket Section */}
          <Grid item xs={12} md={8}>
            <Card 
              elevation={0}
              sx={{ 
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AssignmentIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6">
                      Hall Ticket
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={handleDownloadHallTicket}
                      sx={{ mr: 1 }}
                    >
                      <DownloadIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={handlePrintHallTicket}
                    >
                      <PrintIcon />
                    </IconButton>
                  </Box>
                </Box>

                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Subject</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Venue</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Mathematics</TableCell>
                        <TableCell>15 April 2024</TableCell>
                        <TableCell>09:00 AM - 12:00 PM</TableCell>
                        <TableCell>Main Campus, Block A</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Physics</TableCell>
                        <TableCell>17 April 2024</TableCell>
                        <TableCell>09:00 AM - 12:00 PM</TableCell>
                        <TableCell>Main Campus, Block B</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Chemistry</TableCell>
                        <TableCell>19 April 2024</TableCell>
                        <TableCell>09:00 AM - 12:00 PM</TableCell>
                        <TableCell>Main Campus, Block C</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Chip
                    icon={<CalendarIcon />}
                    label="Semester: 1"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    icon={<TimeIcon />}
                    label="Duration: 3 Hours"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    icon={<LocationIcon />}
                    label="Main Campus"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card 
              elevation={0}
              sx={{ 
                mt: 3,
                bgcolor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<SchoolIcon />}
                  onClick={() => navigate('/hall-ticket')}
                  sx={{ height: 48 }}
                >
                  View Exam Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Confirmation Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: 2
          }
        }}
      >
        <DialogTitle>
          {selectedTicket === 'print' ? 'Print Hall Ticket' : 'Download Hall Ticket'}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {selectedTicket === 'print'
              ? 'The hall ticket will open in a new window for printing.'
              : 'The hall ticket will open in a new window for downloading.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleConfirmAction} 
            variant="contained" 
            color="primary"
          >
            {selectedTicket === 'print' ? 'Print' : 'Download'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentDashboard;