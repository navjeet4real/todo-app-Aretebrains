import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { GetCategory } from '../redux/slices/app';
import { Box, Typography, Button, Stack } from '@mui/material';




const DisplayTask = () => {
  const dispatch = useDispatch();
  const { display } = useSelector((state) => state.app);
  console.log(display, "hhhhhhhhhhhhhhh")

  const getTimeAgo = (createdAt) => {
    const currentTime = new Date();
    const previousTime = new Date(createdAt);
    const timeDiff = Math.abs(currentTime - previousTime);

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  };
  return (
    <>
      <Box sx={{ maxWidth: 500 }}>
        <Typography variant="h4" component="h1" mb={2}>
          Tasks
        </Typography>
        {display.length > 0 ? (
          display.map((task) => (
            <Box key={task._id} sx={{ border: '1px solid #ccc', p: 2, mb: 2 }}>
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
                <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
                  Edit
                </Button>
                <Button variant="outlined" color="error">
                  Delete
                </Button>
              </Box>
            </Box>
          ))
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
