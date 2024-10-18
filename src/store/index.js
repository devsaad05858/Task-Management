import uiSlice from "./slices/ui.slice";
import taskSlice from "./slices/task.slice";
import searchSlice from "./slices/search.slice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
  reducer: {
    userInterface: uiSlice,
    getTasks: taskSlice,
    searchSlice: searchSlice,
  },
});
