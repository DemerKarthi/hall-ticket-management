import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
} from '@mui/material';
import {
  School as StudentIcon,
  Person as StaffIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';

const LoginSelection = () => {
  const navigate = useNavigate();

  const handleLoginTypeSelect = (type) => {
    navigate(`/login/${type}`);
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
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Hall Ticket Management
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
            Select Login Type
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<StudentIcon />}
                onClick={() => handleLoginTypeSelect('student')}
                sx={{ py: 2 }}
              >
                Student Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<StaffIcon />}
                onClick={() => handleLoginTypeSelect('staff')}
                sx={{ py: 2 }}
              >
                Staff Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<AdminIcon />}
                onClick={() => handleLoginTypeSelect('admin')}
                sx={{ py: 2 }}
              >
                Admin Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginSelection; 