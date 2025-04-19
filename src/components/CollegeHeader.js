import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { School as SchoolIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const CollegeHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    // Clear all user sessions
    localStorage.removeItem('currentStudent');
    localStorage.removeItem('currentStaff');
    localStorage.removeItem('currentAdmin');
    navigate('/');
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        bgcolor: 'primary.main',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
      }}
    >
      <Toolbar>
        <SchoolIcon sx={{ mr: 2, color: 'white' }} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ color: 'white' }}>
            Solamalai College of Engineering
          </Typography>
          <Typography variant="subtitle2" sx={{ color: 'white', opacity: 0.8 }}>
            Hall Ticket Management System
          </Typography>
        </Box>
        {!isHomePage && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default CollegeHeader; 