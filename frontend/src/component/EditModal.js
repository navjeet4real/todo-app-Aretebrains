import { Backdrop, Box, Button, Fade, Modal, Stack, Typography } from "@mui/material";
import React from "react";
import TodoForm from "./TodoForm";

const style = {
  position: 'absolute',
  top: 'calc( 100px)', 
  left: 'calc(50% - 200px)', 
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

export default function EditModal({ name, open, handleClose, _id }) {
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
            <Stack spacing={1}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Edit task {name} from database
              </Typography>
              <Stack>
                <TodoForm isEdit={true} id={_id} handleClose={handleClose} />
              </Stack>
            </Stack>
            <Stack sx={{ mt: 2, justifyContent: 'flex-end' }}> 
            <Button
              onClick={() => {
                handleClose()
              }}
              variant="outlined" color="error"
            >
              close
            </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

