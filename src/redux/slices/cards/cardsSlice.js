import { createSlice } from "@reduxjs/toolkit";
import { addCard, addList, fetchCards, removeList } from "./thunks/cardsThunks";

// Initial state
const initialState = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        const { cards, lists } = action.payload;

        state.cards = lists.map((list) => ({
          ...list,
          cardData: cards.filter((card) => card.idList === list.id),
        }));
      })

      // Add card case
      .addCase(addCard.fulfilled, (state, action) => {
        const { idList } = action.payload;
        const list = state.cards.find((l) => l.id === idList);
        if (list) list.cardData.push(action.payload);
      })

      // Remove list case
      .addCase(removeList.fulfilled, (state, action) => {
        state.cards = state.cards.filter((l) => l.id !== action.payload.id);
      })

      // Add list case
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
