import { Backdrop, Box, Button, Fade, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import TodoForm from "./TodoForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ name, open, handleClose, _id }) {
  let navigate = useNavigate()
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Stack>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Edit task {name} from database
              </Typography>
              <Stack>
                <TodoForm isEdit={true} id={_id} />
              </Stack>
            </Stack>
            <Button
              onClick={() => {
                handleClose()
              }}
              variant="outlined" color="error"
            >
              close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

