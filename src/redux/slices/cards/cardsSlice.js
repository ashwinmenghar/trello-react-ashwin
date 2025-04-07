import { createSlice } from "@reduxjs/toolkit";
import { addCard, addList, fetchCards, removeList } from "./thunks/cardsThunks";

// Initial state
const initialState = {
  cards: [],
  status: {
    fetch: { loading: false, error: null },
    add: { loading: false, error: null },
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

      .addCase(addCard.fulfilled, (state, action) => {
        state.status.add.loading = false;

        const { idList } = action.payload;
        const list = state.cards.find((l) => l.id === idList);
        if (list) list.cardData.push(action.payload);
      })

      .addCase(removeList.fulfilled, (state, action) => {
        state.cards = state.cards.filter((l) => l.id !== action.payload.id);
      })

      .addCase(addList.fulfilled, (state, action) => {
        const newList = {
          ...action.payload,
          cardData: [],
        };
        state.cards = [newList, ...state.cards];
      });
  },
});

// Export reducer
export default cardsSlice.reducer;
