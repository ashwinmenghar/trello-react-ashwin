import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./slices/board";

export const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
  },
});
