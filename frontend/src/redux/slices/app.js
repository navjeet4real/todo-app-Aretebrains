import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  isLoggedIn: true,
  snackbar: {
    open: null,
    message: null,
    severity: null,
  },
  display: null,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    openSnackBar(state, action) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackBar(state, action) {
      state.snackbar.open = false;
      state.snackbar.message = null;
    },
    displayTask(state, action) {
      state.display = action.payload.display
    }
  },
});

export default slice.reducer;

export const ShowSnackBar =
  ({ severity, message }) =>
    async (dispatch, getState) => {
      dispatch(
        slice.actions.openSnackBar({
          message,
          severity,
        })
      );
      setTimeout(() => {
        dispatch(slice.actions.closeSnackBar());
      }, 4000);
    };

export const CloseSnackBar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackBar());
};


export function CreateTask(formValues) {
  console.log(formValues, "formValues");

  return async (dispatch, getState) => {
    await axios
      .post(
        "/app/todos",
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      ).then(function (response) {
        dispatch(GetAllTaskOfUser())

        dispatch(ShowSnackBar({ severity: "success", message: response.data.message }))

      }).catch(function (err) {
        console.log(err);
        dispatch(ShowSnackBar({ severity: "error", message: err.message }))
      })
  }
}
export function GetAllTaskOfUser() {
  return async (dispatch, getState) => {
    await axios
      .get(
        `/app/todos`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      ).then(function (response) {
        dispatch(slice.actions.displayTask({
          display: response.data.result
        }))

      }).catch(function (err) {
        console.log(err);
        dispatch(ShowSnackBar({ severity: "error", message: err.message }))
      })
  }
}

export function EditTask(formValues) {
  console.log(formValues, "formValues");

  return async (dispatch, getState) => {
    await axios
      .put(
        `/app/todos/${formValues.taskId}`,
        {
          ...formValues,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      ).then(function (response) {
        dispatch(GetAllTaskOfUser())
        dispatch(ShowSnackBar({ severity: "success", message: response.data.message }))


      }).catch(function (err) {
        console.log(err);
        dispatch(ShowSnackBar({ severity: "error", message: err.message }))
      })
  }
}
export function DeleteTask(formValues) {
  console.log(formValues, "formValues");

  return async (dispatch, getState) => {
    await axios
      .delete(
        `/app/todos/${formValues}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(function (response) {
        dispatch(GetAllTaskOfUser())

        dispatch(ShowSnackBar({ severity: "success", message: response.data.message }))

      }).catch(function (err) {
        console.log(err);
        dispatch(ShowSnackBar({ severity: "error", message: err.message }))
      })
  }
}