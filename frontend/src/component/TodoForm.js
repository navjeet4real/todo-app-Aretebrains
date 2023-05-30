import React from 'react'
import FormProvider from "./hook-form/FormProvider";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Stack, Button, Box } from "@mui/material";
import { RHFTextField } from "./hook-form";
import { useDispatch } from "react-redux";
import { CreateTask, EditTask } from '../redux/slices/app';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';


const TodoForm
  = ({ isEdit, id, handleClose }) => {
    const dispatch = useDispatch();
    const TodoSchema = Yup.object().shape({
      name: Yup.string(),
    });
    const defaultValues = {
      name: "",
    };
    const methods = useForm({
      resolver: yupResolver(TodoSchema),
      defaultValues,
    });

    const {
      reset,
      setError,
      handleSubmit,
      formState: { errors },
    } = methods;

    const onSubmit = async (data) => {
      try {
        if (isEdit) {
          dispatch(EditTask({ name: data.name, taskId: id }))
          handleClose()

        } else {
          dispatch(CreateTask(data))
        }
      } catch (error) {
        console.error(error);
        reset();
        setError("afterSubmit", {
          ...error,
          message: error.message,
        });
      }
    };
    return (
      <>
        <Box
          sx={{
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            padding: '16px',
            borderRadius: '4px',
            backgroundColor: '#fff',
            marginBottom: '16px',
          }}
        >
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="row" spacing={3} sx={{ maxWidth: 500}}>
              {!!errors.afterSubmit && (
                <Alert severity="error">{errors.afterSubmit.message}</Alert>
              )}
              <RHFTextField name="name" label="Task Name" variant="outlined" fullWidth />
              <Button color="primary" size="large" type="submit" variant="contained">
                {isEdit ? 'Edit' : <DoubleArrowIcon />}
              </Button>
            </Stack>

          </FormProvider>
        </Box>
      </>
    )
  }

export default TodoForm

