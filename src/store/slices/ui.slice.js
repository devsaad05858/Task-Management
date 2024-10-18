import { createSlice } from "@reduxjs/toolkit";

export const modalType = {
  NONE: "none",
  CREATE_TASK: "createTask",
  NOTIFICATION: "notification",
  DELETE: "delete",
};

const initialState = {
  modal: false,
  modalState: null,
};

export const uiSlice = createSlice({
  name: "userInterface",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.modal = false;
      state.modalState = null;
    },
    updateModalAndState: (state, action) => {
      state.modal = action.payload.type;
      state.modalState = action.payload.state;
    },
  },
});

export const { closeModal, updateModalAndState } = uiSlice.actions;
export default uiSlice.reducer;
