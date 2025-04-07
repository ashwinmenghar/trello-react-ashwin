import { fetchBoardListAndCards } from "@/helper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk to fetch cards and board list
export const fetchCards = createAsyncThunk("board/fetchCards", async (id) => {
  return await fetchBoardListAndCards(id);
});

// Initial state
const initialState = {
  cards: [],
  status: { fetch: { loading: false, error: null } },
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status.fetch.loading = true;
        state.status.fetch.error = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status.fetch.loading = false;
        const { cards, lists } = action.payload;

        const listsWithCards = lists.map((list) => ({
          ...list,
          cardData: cards.filter((card) => card.idList === list.id),
        }));

        state.cards = listsWithCards;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status.fetch.loading = false;
        state.status.fetch.error = action.error;
      });
  },
});

// Export actions
// export const { getCards } = cardsSlice.actions;

// Export reducer
export default cardsSlice.reducer;
