import React, { useEffect } from "react";
import TodoForm from "../component/TodoForm";
import DisplayTask from "../component/DisplayTask";
import { Typography, Stack, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { GetAllTaskOfUser } from "../redux/slices/app";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllTaskOfUser())
  }, [])
  return (
    <>
      <Box sx={{ padding: 4, maxWidth: 1000 }}>
        <Typography variant="h4" mb={4}>
          Create Task
        </Typography>
        <Stack spacing={2} >
          <TodoForm />
          <DisplayTask />
        </Stack>
      </Box>
    </>
  );
};

export default Home;