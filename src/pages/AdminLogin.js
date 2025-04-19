import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminPanelSettings as AdminIcon } from '@mui/icons-material';
import BaseLogin from './BaseLogin';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (formData) => {
    try {
      // In a real application, you would validate credentials against a backend
      // For now, we'll use a simple check
      if (formData.username === 'admin' && formData.password === 'admin123') {
        // Store admin data in localStorage
        localStorage.setItem('currentAdmin', JSON.stringify({
          username: formData.username,
          role: 'admin'
        }));
        console.log('Admin login successful');
        navigate('/admin-dashboard');
      } else {
        alert('Invalid admin credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <BaseLogin
      title="Admin Login"
      icon={<AdminIcon />}
      onLogin={handleLogin}
      usernameLabel="Admin Username"
      passwordLabel="Admin Password"
    />
  );
};

export default AdminLogin; 