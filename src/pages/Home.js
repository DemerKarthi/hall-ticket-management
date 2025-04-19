import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Grid
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  School as StudentIcon,
  SupervisorAccount as StaffIcon
} from '@mui/icons-material';

const Home = () => {
  const portals = [
    {
      title: 'Admin Portal',
      icon: AdminIcon,
      path: '/admin-login',
      description: 'Manage exams, students, and hall tickets'
    },
    {
      title: 'Staff Portal',
      icon: StaffIcon,
      path: '/staff-login',
      description: 'Review and manage student hall tickets'
    },
    {
      title: 'Student Portal',
      icon: StudentIcon,
      path: '/student-login',
      description: 'View and download your hall tickets'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 8
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={portal.path}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center'
                  }}
                >
                  <Icon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h5" component="h2" gutterBottom>
                    {portal.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, flexGrow: 1 }}
                  >
                    {portal.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={portal.path}
                    variant="contained"
                    size="large"
                    fullWidth
                  >
                    Login
                  </Button>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home; 