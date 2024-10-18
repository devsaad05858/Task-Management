import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const taskAction = createAsyncThunk("tasksFetch", async () => {
  const response = await axios.get("/api/tasks");
  return response.data;
});
