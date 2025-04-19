import React from 'react';
import { useNavigate } from 'react-router-dom';
import { School as SchoolIcon } from '@mui/icons-material';
import BaseLogin from './BaseLogin';

const StudentLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (formData) => {
    try {
      // Get students data from localStorage
      const students = JSON.parse(localStorage.getItem('students') || '[]');
      
      // Find the student with matching roll number
      const student = students.find(s => s.rollNumber === formData.username);
      
      if (student) {
        // Store student data in localStorage for the dashboard
        localStorage.setItem('currentStudent', JSON.stringify(student));
        console.log('Student login successful:', student);
        navigate('/dashboard');
      } else {
        alert('Invalid roll number or student not found');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <BaseLogin
      title="Student Login"
      icon={<SchoolIcon />}
      onLogin={handleLogin}
      usernameLabel="Roll Number"
      passwordLabel="Password"
    />
  );
};

export default StudentLogin; 