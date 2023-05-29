import React, { useEffect } from "react";
import TodoForm from "../component/TodoForm";
import DisplayTask from "../component/DisplayTask";
import { Typography, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { GetALlTaskOfUser } from "../redux/slices/app";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetALlTaskOfUser())
  },[])
  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h4">Create Task</Typography>
        <Stack spacing={2}>
          <TodoForm />
          <DisplayTask />
        </Stack>
      </Stack>
    </>
  );
};

export default Home;