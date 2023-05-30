import { Backdrop, Box, Button, Fade, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { DeleteTask } from "../redux/slices/app";

const style = {
  position: 'absolute',
  top: 'calc( 100px)',
  left: 'calc(50% - 178px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  borderRadius: '4px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px',
};

export default function DeleteModal({ name, open, handleClose, _id }) {
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Stack spacing={2}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Delete task {name} from database
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch(DeleteTask(_id))
                  handleClose()
                }}
                color="error"
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};