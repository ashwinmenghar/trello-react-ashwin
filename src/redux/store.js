import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./slices/board";
import { cardsSlice } from "./slices/cards";

export const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
    cards: cardsSlice.reducer,
  },
});
