import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { Box, Typography, Button } from '@mui/material';
import DeleteModal from './DeleteModal';
import { getTimeAgo } from '../utils/getTimeAgo';
import EditModal from './EditModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DisplayTask = () => {
  const { display } = useSelector((state) => state.app);
  return (
    <>
      <Box sx={{
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        padding: '16px',
        borderRadius: '4px',
        backgroundColor: '#fff',
        marginBottom: '16px',
        maxWidth: 500
      }}>
        <Typography variant="h4" component="h1" mb={2}>
          Tasks
        </Typography>
        {display.length > 0 ? (
          display.map((task) => <TaskList key={task.id} task={task} />)
        ) : (
          <Typography variant="body1" component="p">
            No tasks to display.
          </Typography>
        )}
      </Box>
    </>
  )
}

export default DisplayTask

const TaskList = ({ task }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleDeleteCloseDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleDeleteOpenDialog = () => {
    setOpenDeleteDialog(true);
  };
  const handleEditCloseDialog = () => {
    setOpenEditDialog(false);
  };
  const handleEditOpenDialog = () => {
    setOpenEditDialog(true);
  };
  return (
    <>
      <Box key={task._id} sx={{ border: '1px solid #ccc', p: 2, mb: 2, borderRadius: 2 }}>
        <Typography variant="h6" component="h2">
          {task.name}
        </Typography>
        <Typography variant="subtitle1" component="p">
          Author: {task.firstName} {task.lastName}
        </Typography>
        <Typography variant="subtitle1" component="p">
          Added: {getTimeAgo(task.createdAt)}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="outlined" color="primary" sx={{ mr: 1 }} onClick={() => {
            handleEditOpenDialog();
          }}>
            <EditIcon sx={{color: "blue"}}  />
          </Button>
          <Button variant="outlined" color="error" onClick={() => {
            handleDeleteOpenDialog();
          }}>
            <DeleteIcon sx={{color: "red"}} />
          </Button>
        </Box>
      </Box>
      <DeleteModal _id={task.task_id} name={task.name} open={openDeleteDialog} handleClose={handleDeleteCloseDialog} />
      <EditModal _id={task.task_id} name={task.name} open={openEditDialog} handleClose={handleEditCloseDialog} />

    </>
  )
}

