import React from 'react';
import { useNavigate } from 'react-router-dom';
import { School as SchoolIcon } from '@mui/icons-material';
import BaseLogin from './BaseLogin';

const StudentLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (formData) => {
    try {
      // Get students data from localStorage
      const studentsData = localStorage.getItem('students');
      console.log('Raw students data:', studentsData);
      
      let students = JSON.parse(studentsData || '[]');
      console.log('Parsed students array:', students);
      console.log('Login attempt:', formData);

      // Add default passwords if they don't exist
      if (students.length > 0 && !students[0].password) {
        students = students.map(student => ({
          ...student,
          password: `student${student.rollNumber.slice(-3)}` // Default password based on roll number
        }));
        localStorage.setItem('students', JSON.stringify(students));
      }
      
      // Find the student with matching roll number and password
      const student = students.find(s => 
        s.rollNumber === formData.username && 
        s.password === formData.password
      );
      console.log('Found student:', student);
      
      if (student) {
        // Store student data in localStorage for the dashboard
        localStorage.setItem('currentStudent', JSON.stringify(student));
        console.log('Student login successful:', student);
        // Navigate to the student dashboard
        navigate('/student-dashboard');
      } else {
        alert('Invalid roll number or password');
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