import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { DeleteTask, DeleteUserFunc, FetchUsers } from "../redux/slices/app";

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

export default function DeleteModal  ({ name, open, handleClose, _id }) {
  const dispatch = useDispatch();
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
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Delete task {name} from database
            </Typography>
            <Button
            variant="primary"
              onClick={() => {
                dispatch(DeleteTask(_id))
                handleClose()
              }}
              className="btn2" type="submit"
            >
              Delete
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};