import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./slices/board/boardsSlice";
import { cardsSlice } from "./slices/cards/cardsSlice";

export const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
    cards: cardsSlice.reducer,
  },
});
