import React from "react";
import TodoForm from "../component/TodoForm";
import DisplayTask from "../component/DisplayTask";
import { Typography, Stack } from "@mui/material";

const Home = () => {
  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h4">Create Task</Typography>
        <Stack direction={'row'} spacing={2}>
          <TodoForm />
          <DisplayTask />
        </Stack>
      </Stack>
    </>
  );
};

export default Home;