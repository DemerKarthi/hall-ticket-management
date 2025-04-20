import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { School as StudentIcon } from '@mui/icons-material';
import studentData from '../helpers/studentData';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rollNumber: '',
    password: '',
  });
  const [error, setError] = useState('');

  // Initialize students data in localStorage
  useEffect(() => {
    // Clear existing data first
    localStorage.removeItem('students');
    localStorage.removeItem('currentStudent');
    
    // Initialize with fresh student data
    localStorage.setItem('students', JSON.stringify(studentData));
    console.log('Student data initialized in localStorage:', studentData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Get all students from localStorage
    const allStudents = JSON.parse(localStorage.getItem('students')) || [];
    console.log('All students from localStorage:', allStudents);
    
    // Find the student with matching roll number
    const student = allStudents.find(
      (s) => s.rollNumber === formData.rollNumber
    );

    if (!student) {
      setError('Invalid roll number');
      return;
    }

    // Generate default password based on roll number (last 3 digits)
    const defaultPassword = `student${student.rollNumber.slice(-3)}`;
    console.log('Expected password:', defaultPassword);
    console.log('Provided password:', formData.password);

    // Check if password matches the default password
    if (formData.password !== defaultPassword) {
      setError(`Invalid password. Default password is: student${student.rollNumber.slice(-3)}`);
      return;
    }

    // Store the current student in localStorage
    localStorage.setItem('currentStudent', JSON.stringify(student));
    console.log('Current student stored:', student);

    // Redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <StudentIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h5" component="h1" gutterBottom>
              Student Login
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Roll Number"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              margin="normal"
              required
              placeholder="Enter your roll number (e.g., 912221104034)"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              placeholder="Enter your password (default: student + last 3 digits of roll number)"
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{ mt: 3 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default StudentLogin; 