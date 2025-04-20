import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Avatar,
  Tabs,
  Tab,
  ListItemSecondaryAction,
  MenuItem,
  Tooltip,
  Alert,
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Logout as LogoutIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  AdminPanelSettings as AdminIcon,
  Menu as MenuIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import studentData from '../helpers/studentData';
import { jsPDF } from 'jspdf';

const drawerWidth = 240;

const StaffDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exams, setExams] = useState([
    {
      id: 1,
      name: 'Mid Semester Examination',
      date: '2024-04-15',
      type: 'Mid Semester',
      status: 'Pending',
      subjects: ['Mathematics', 'Physics']
    },
    {
      id: 2,
      name: 'Final Semester Examination',
      date: '2024-05-20',
      type: 'Final Semester',
      status: 'Available',
      subjects: ['Chemistry', 'Programming']
    }
  ]);

  const [students, setStudents] = useState(studentData);

  const [newExam, setNewExam] = useState({
    name: '',
    date: '',
    type: '',
    status: 'Pending',
    subjects: []
  });

  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNumber: '',
    department: '',
    email: '',
    hallTickets: []
  });

  // Dialog states
  const [addExamDialog, setAddExamDialog] = useState(false);
  const [addStudentDialog, setAddStudentDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  // State for dropdown values
  const [dropdownValues, setDropdownValues] = useState({
    examTypes: ['Mid Semester', 'Final Semester', 'Internal Assessment'],
    departments: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Programming'],
    examStatus: ['Pending', 'Available', 'Completed']
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [newValue, setNewValue] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    department: '',
    email: '',
  });

  useEffect(() => {
    // Check if staff is logged in
    const staffData = JSON.parse(localStorage.getItem('currentStaff'));
    if (!staffData) {
      navigate('/staff-login');
    }
  }, [navigate]);

  useEffect(() => {
    // Get current staff's department
    const currentStaff = JSON.parse(localStorage.getItem('currentStaff'));
    if (currentStaff) {
      // Filter students based on staff's department
      const departmentStudents = studentData.filter(student => student.department === currentStaff.department);
      setStudents(departmentStudents);
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAddExam = () => {
    if (newExam.name && newExam.date && newExam.type) {
      const exam = {
        id: exams.length + 1,
        ...newExam
      };
      setExams([...exams, exam]);
      setNewExam({
        name: '',
        date: '',
        type: '',
        status: 'Pending',
        subjects: []
      });
      setAddExamDialog(false);
    }
  };

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.rollNumber && newStudent.department) {
      const student = {
        id: students.length + 1,
        ...newStudent
      };
      const updatedStudents = [...students, student];
      setStudents(updatedStudents);
      // Store in localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setNewStudent({
        name: '',
        rollNumber: '',
        department: '',
        email: '',
        hallTickets: []
      });
      setAddStudentDialog(false);
    }
  };

  const handleDeleteExam = (id) => {
    setExams(exams.filter(exam => exam.id !== id));
  };

  const handleDeleteStudent = (id) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
    // Update localStorage
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentStaff');
    navigate('/');
  };

  // Edit exam functions
  const handleEditExam = (exam) => {
    setEditingExam(exam);
    setEditDialogOpen(true);
  };

  const handleUpdateExam = () => {
    if (editingExam) {
      setExams(exams.map(exam => 
        exam.id === editingExam.id ? editingExam : exam
      ));
      setEditDialogOpen(false);
      setEditingExam(null);
    }
  };

  // Edit student functions
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setEditDialogOpen(true);
  };

  const handleUpdateStudent = () => {
    if (editingStudent) {
      const updatedStudents = students.map(student => 
        student.id === editingStudent.id ? editingStudent : student
      );
      setStudents(updatedStudents);
      // Update localStorage
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      setEditDialogOpen(false);
      setEditingStudent(null);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenDialog = (student = null) => {
    if (student) {
      setSelectedStudent(student);
      setFormData({
        name: student.name,
        rollNumber: student.rollNumber,
        department: student.department,
        email: student.email,
      });
    } else {
      setSelectedStudent(null);
      setFormData({
        name: '',
        rollNumber: '',
        department: '',
        email: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
    setFormData({
      name: '',
      rollNumber: '',
      department: '',
      email: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedStudents = [...students];

    if (selectedStudent) {
      // Update existing student
      const index = updatedStudents.findIndex(
        (s) => s.rollNumber === selectedStudent.rollNumber
      );
      if (index !== -1) {
        updatedStudents[index] = {
          ...updatedStudents[index],
          ...formData,
        };
      }
    } else {
      // Add new student
      const newStudent = {
        id: students.length + 1,
        ...formData,
        hallTickets: [],
      };
      updatedStudents.push(newStudent);
    }

    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    handleCloseDialog();
  };

  const handleDelete = (rollNumber) => {
    const updatedStudents = students.filter(
      (student) => student.rollNumber !== rollNumber
    );
    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
  };

  const handleDeleteValue = (type, index) => {
    const updatedValues = [...dropdownValues[type]];
    updatedValues.splice(index, 1);
    setDropdownValues(prev => ({
      ...prev,
      [type]: updatedValues
    }));
  };

  const drawer = (
    <div>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" noWrap component="div">
          Staff Panel
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem 
          button 
          selected={activeTab === 0}
          onClick={() => {
            setActiveTab(0);
            if (isMobile) handleDrawerToggle();
          }}
        >
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Exams" />
        </ListItem>
        <ListItem 
          button 
          selected={activeTab === 1}
          onClick={() => {
            setActiveTab(1);
            if (isMobile) handleDrawerToggle();
          }}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  const renderDropdownSection = (title, type) => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">{title}</Typography>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => handleOpenDialog(null)}
        >
          Add New
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Value</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dropdownValues[type].map((value, index) => (
              <TableRow key={index}>
                <TableCell>{value}</TableCell>
                <TableCell align="right">
                  <IconButton 
                    onClick={() => handleOpenDialog(null)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleDeleteValue(type, index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  return (
    <Box sx={{ display: 'flex' }}>
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
              backgroundColor: theme.palette.background.default,
              mt: 8,
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">
            {activeTab === 0 ? 'Exams Management' : 'Students Management'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => activeTab === 0 ? setAddExamDialog(true) : setAddStudentDialog(true)}
          >
            Add {activeTab === 0 ? 'Exam' : 'Student'}
          </Button>
        </Box>

        {activeTab === 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Exam Name</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell>{exam.name}</TableCell>
                    <TableCell>{exam.date}</TableCell>
                    <TableCell>{exam.type}</TableCell>
                    <TableCell>{exam.status}</TableCell>
                    <TableCell>
                      <IconButton 
                        color="primary"
                        onClick={() => handleEditExam(exam)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteExam(exam.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {activeTab === 1 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.rollNumber}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDialog(student)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(student.rollNumber)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Add Exam Dialog */}
        <Dialog open={addExamDialog} onClose={() => setAddExamDialog(false)}>
          <DialogTitle>Add New Exam</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Exam Name"
                  value={newExam.name}
                  onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  value={newExam.date}
                  onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Type"
                  value={newExam.type}
                  onChange={(e) => setNewExam({ ...newExam, type: e.target.value })}
                >
                  {dropdownValues.examTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  value={newExam.status}
                  onChange={(e) => setNewExam({ ...newExam, status: e.target.value })}
                >
                  {dropdownValues.examStatus.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddExamDialog(false)}>Cancel</Button>
            <Button onClick={handleAddExam} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Student Dialog */}
        <Dialog open={addStudentDialog} onClose={() => setAddStudentDialog(false)}>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Roll Number"
                  value={newStudent.rollNumber}
                  onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Department"
                  value={newStudent.department}
                  onChange={(e) => setNewStudent({ ...newStudent, department: e.target.value })}
                >
                  {dropdownValues.departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddStudentDialog(false)}>Cancel</Button>
            <Button onClick={handleAddStudent} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog for Exams */}
        <Dialog open={editDialogOpen && editingExam !== null} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Edit Exam</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Exam Name"
                  value={editingExam?.name || ''}
                  onChange={(e) => setEditingExam({ ...editingExam, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  value={editingExam?.date || ''}
                  onChange={(e) => setEditingExam({ ...editingExam, date: e.target.value })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Type"
                  value={editingExam?.type || ''}
                  onChange={(e) => setEditingExam({ ...editingExam, type: e.target.value })}
                >
                  {dropdownValues.examTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  value={editingExam?.status || ''}
                  onChange={(e) => setEditingExam({ ...editingExam, status: e.target.value })}
                >
                  {dropdownValues.examStatus.map((status) => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateExam} variant="contained">
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog for Students */}
        <Dialog open={editDialogOpen && editingStudent !== null} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={editingStudent?.name || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Roll Number"
                  value={editingStudent?.rollNumber || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, rollNumber: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Department"
                  value={editingStudent?.department || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, department: e.target.value })}
                >
                  {dropdownValues.departments.map((dept) => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={editingStudent?.email || ''}
                  onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateStudent} variant="contained">
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dropdown Values Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>
            {selectedStudent ? 'Edit Student' : 'Add New Student'}
          </DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Roll Number"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                margin="normal"
                required
                disabled={!!selectedStudent}
              />
              <TextField
                fullWidth
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {selectedStudent ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default StaffDashboard;