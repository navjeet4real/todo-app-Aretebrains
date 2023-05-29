import React from "react";
import {
  Link as RouterLink
} from "react-router-dom";
import {
  Stack,
  Link,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { LogoutUser } from "../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.25)",
          height: "100px",
        }}
      >
        <Stack
          direction={"row"}
          justifyContent="space-around"
          alignItems={"center"}
          sx={{ width: "100%", height: "100%" }}
        >
          <Stack
            spacing={2}
            direction={"row"}
            justifyContent="space-between"
            alignItems={"center"}
          >
            Todo App
          </Stack>
          <Stack>

            <Typography>{user.firstName + " " + user.lastName}</Typography>
          </Stack>
          <Stack justifyContent={"row"} direction="row" spacing={2}>

            <Button onClick={() => {
              dispatch(LogoutUser(user))
            }}><LogoutIcon />Logout</Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Header;