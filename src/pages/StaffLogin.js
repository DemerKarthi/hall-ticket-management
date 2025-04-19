import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Person as StaffIcon } from '@mui/icons-material';
import BaseLogin from './BaseLogin';

const StaffLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (formData) => {
    try {
      // Get staff data from localStorage
      const staffData = localStorage.getItem('staff');
      const staff = JSON.parse(staffData || '[]');
      
      // Find the staff with matching username and password
      const staffMember = staff.find(s => 
        s.username === formData.username && 
        s.password === formData.password
      );
      
      if (staffMember) {
        // Store staff data in localStorage for the dashboard
        localStorage.setItem('currentStaff', JSON.stringify(staffMember));
        navigate('/staff-dashboard');
      } else {
        alert('Invalid staff credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <BaseLogin
      title="Staff Login"
      icon={<StaffIcon />}
      onLogin={handleLogin}
      usernameLabel="Staff Username"
      passwordLabel="Staff Password"
    />
  );
};

export default StaffLogin; 