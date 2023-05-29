import React from 'react'
import FormProvider from "./hook-form/FormProvider";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Alert, Stack, Button } from "@mui/material";
import { RHFTextField } from "./hook-form";
import { useDispatch } from "react-redux";
import { CreateTask } from '../redux/slices/app';

const TodoForm
  = () => {
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

        dispatch(CreateTask(data))

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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={"row"} spacing={3} sx={{ maxWidth: 500 }}>
            {!!errors.afterSubmit && (
              <Alert severity="error">{errors.afterSubmit.message}</Alert>
            )}
            <RHFTextField name="name" label="Task Name" />
            <Button
              fullWidth
              color="inherit"
              size="large"
              type="submit"
              variant="contained"

            >
              Create
            </Button>
          </Stack>
        </FormProvider>
      </>
    )
  }

export default TodoForm

