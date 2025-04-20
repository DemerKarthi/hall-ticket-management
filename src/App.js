import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { studentData } from './helpers/studentData';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import CollegeHeader from './components/CollegeHeader';

// Initialize data in localStorage
(() => {
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
    console.log('Initializing student data in localStorage');
    localStorage.setItem('students', JSON.stringify(studentData));
  }

  // Initialize hall tickets data if not exists
  const existingTickets = JSON.parse(localStorage.getItem('hallTickets') || '[]');
  if (existingTickets.length === 0) {
    console.log('Initializing hall tickets in localStorage');
    localStorage.setItem('hallTickets', JSON.stringify([]));
  }
})();

// Create theme
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

// Import components
const StudentLogin = React.lazy(() => import('./pages/StudentLogin'));
const StaffLogin = React.lazy(() => import('./pages/StaffLogin'));
const StaffDashboard = React.lazy(() => import('./pages/StaffDashboard'));
const HallTicket = React.lazy(() => import('./pages/HallTicket'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <CollegeHeader />
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/staff-login" element={<StaffLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/staff-dashboard" element={<StaffDashboard />} />
            <Route path="/hall-ticket/:id" element={<HallTicket />} />
          </Routes>
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
