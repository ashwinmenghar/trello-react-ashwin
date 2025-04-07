import { createSlice } from "@reduxjs/toolkit";
import { addCard, addList, fetchCards, removeList } from "./thunks/cardsThunks";

// Initial state
const initialState = {
  cards: [],
  status: {
    fetch: { loading: false, error: null },
    addCard: { loading: false, error: null },
    addList: { loading: false, error: null },
  },
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
      })

      // Add card case
      .addCase(addCard.pending, (state) => {
        state.status.addCard.loading = true;
        state.status.addCard.error = null;
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.status.addCard.loading = false;

        const { idList } = action.payload;
        const list = state.cards.find((l) => l.id === idList);
        if (list) list.cardData.push(action.payload);
      })
      .addCase(addCard.rejected, (state, action) => {
        state.status.addCard.loading = false;
        state.status.addCard.error =
          action.error?.message || "Failed to add card";
      })

      // Remove list case
      .addCase(removeList.fulfilled, (state, action) => {
        state.cards = state.cards.filter((l) => l.id !== action.payload.id);
      })

      // Add list case
      .addCase(addList.pending, (state) => {
        state.status.addList.loading = true;
        state.status.addList.error = null;
      })
      .addCase(addList.fulfilled, (state, action) => {
        state.status.addList.loading = false;
        const newList = {
          ...action.payload,
          cardData: [],
        };
        state.cards = [newList, ...state.cards];
      })
      .addCase(addList.rejected, (state, action) => {
        state.status.addList.loading = false;
        state.status.addList.error =
          action.error?.message || "Failed to add list";
      });
  },
});

// Export reducer
export default cardsSlice.reducer;
