import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import StudentLogin from './pages/StudentLogin';
import StaffLogin from './pages/StaffLogin';
import Dashboard from './pages/Dashboard';
import HallTicket from './pages/HallTicket';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import StudentDashboard from './pages/StudentDashboard';
import CollegeHeader from './components/CollegeHeader';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  useEffect(() => {
    // Initialize staff data if not exists
    if (!localStorage.getItem('staff')) {
      localStorage.setItem('staff', JSON.stringify([{
        username: 'staff1',
        password: 'staff123',
        name: 'John Staff',
        role: 'staff',
        department: 'Computer Science'
      }]));
    }

    // Initialize students data if not exists
    const existingStudents = JSON.parse(localStorage.getItem('students') || '[]');
    if (existingStudents.length === 0) {
      const initialStudents = [
        {
          id: 1,
          name: 'John Doe',
          rollNumber: 'STU001',
          department: 'Computer Science',
          email: 'john@example.com',
          password: 'stu001'
        },
        {
          id: 2,
          name: 'Jane Smith',
          rollNumber: 'STU002',
          department: 'Electrical Engineering',
          email: 'jane@example.com',
          password: 'stu002'
        }
      ];
      localStorage.setItem('students', JSON.stringify(initialStudents));
    }

    // Initialize hall tickets data if not exists
    const existingTickets = JSON.parse(localStorage.getItem('hallTickets') || '[]');
    if (existingTickets.length === 0) {
      const initialTickets = [
        {
          id: 1,
          studentRollNumber: 'STU001',
          examName: 'Mid Semester Examination',
          examDate: '2024-04-15',
          status: 'Available',
          subjects: [
            { name: 'Mathematics', date: '2024-04-15', time: '09:00 AM - 12:00 PM', venue: 'Block A' },
            { name: 'Physics', date: '2024-04-16', time: '09:00 AM - 12:00 PM', venue: 'Block B' }
          ]
        },
        {
          id: 2,
          studentRollNumber: 'STU002',
          examName: 'Mid Semester Examination',
          examDate: '2024-04-15',
          status: 'Available',
          subjects: [
            { name: 'Mathematics', date: '2024-04-15', time: '09:00 AM - 12:00 PM', venue: 'Block A' },
            { name: 'Physics', date: '2024-04-16', time: '09:00 AM - 12:00 PM', venue: 'Block B' }
          ]
        }
      ];
      localStorage.setItem('hallTickets', JSON.stringify(initialTickets));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CollegeHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/staff-login" element={<StaffLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hall-ticket" element={<HallTicket />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/staff-dashboard" element={<StaffDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
