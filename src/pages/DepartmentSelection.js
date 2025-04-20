import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  CardActionArea,
  Avatar,
} from '@mui/material';
import {
  School as SchoolIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import departmentData from '../helpers/departmentData';

const drawerWidth = 240;

const DepartmentSelection = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [departments] = useState(departmentData);

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('currentAdmin'));
    if (!adminData) {
      navigate('/admin-login');
      return;
    }
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentAdmin');
    navigate('/');
  };

  const handleDepartmentSelect = (department) => {
    navigate('/admin-dashboard', { state: { selectedDepartment: department } });
  };

  const drawer = (
    <div>
      <Box sx={{
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1976D2',
        color: 'white',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Typography variant="h6" noWrap component="div" sx={{
          fontWeight: 'bold',
          color: 'white',
          fontSize: '1.2rem'
        }}>
          Admin Panel
        </Typography>
      </Box>
      <Divider />
      <List sx={{ backgroundColor: '#1565C0', color: 'white', height: '100%' }}>
        <ListItem
          button
          selected={true}
          onClick={() => {
            if (isMobile) handleDrawerToggle();
          }}
          sx={{
            backgroundColor: '#2196F3',
            color: 'white',
            '&:hover': {
              backgroundColor: '#42A5F5',
            },
            '&.Mui-selected': {
              backgroundColor: '#2196F3',
              '&:hover': {
                backgroundColor: '#42A5F5',
              },
            },
            mb: 1,
            borderRadius: '8px',
            mx: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            borderLeft: '4px solid #FFFFFF',
          }}
        >
          <ListItemIcon sx={{ color: 'white' }}>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText
            primary="Departments"
            primaryTypographyProps={{
              style: {
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem'
              }
            }}
          />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#1565C0',
              mt: 8,
              boxShadow: 2,
              borderRight: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          backgroundColor: 'white',
          p: 3,
          borderRadius: 2,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <Typography variant="h5" sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Select Department
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>

        <Grid container spacing={3}>
          {departments.map((department) => (
            <Grid item xs={12} sm={6} md={3} key={department.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    '& .department-icon': {
                      transform: 'scale(1.1)'
                    }
                  },
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              >
                <CardActionArea onClick={() => handleDepartmentSelect(department.name)}>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 4 }}>
                      <Avatar
                        className="department-icon"
                        sx={{
                          width: 80,
                          height: 80,
                          bgcolor: department.color,
                          fontSize: '2.5rem',
                          margin: '0 auto',
                          mb: 3,
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        {department.icon}
                      </Avatar>
                      <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {department.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {department.fullName}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DepartmentSelection;