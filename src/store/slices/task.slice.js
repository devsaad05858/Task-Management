import { createSlice } from "@reduxjs/toolkit";
import { taskAction } from "../action/taskAction";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const taskIndex = state.data.findIndex((task) => task._id === taskId);
      if (taskIndex !== -1) {
        state.data[taskIndex].status = newStatus;
      }
    },
    addTask: (state, action) => {
      state.data.push(action.payload);
    },
    updateTask: (state, action) => {
      const { taskId, updatedTask } = action.payload;
      const taskIndex = state.data.findIndex((task) => task._id === taskId);
      if (taskIndex !== -1) {
        state.data[taskIndex] = { ...state.data[taskIndex], ...updatedTask };
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.data = state.data.filter((task) => task._id !== taskId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(taskAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(taskAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(taskAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateTaskStatus, addTask, updateTask, deleteTask } =
  taskSlice.actions;

export default taskSlice.reducer;
