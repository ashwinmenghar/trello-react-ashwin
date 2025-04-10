import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./slices/board/boardsSlice";
import { cardsSlice } from "./slices/cards/cardsSlice";
import { checklistSlice } from "./slices/checklist/checklistSlice";

export const store = configureStore({
  reducer: {
    board: boardSlice.reducer,
    cards: cardsSlice.reducer,
    checklists: checklistSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
