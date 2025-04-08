import { createSlice } from "@reduxjs/toolkit";
import {
  addItem,
  createCheckList,
  getCheckLists,
  removeCheckList,
  removeItem,
  toggleCheckListCompletion,
} from "./thunks/checklistThunks";

const initialState = {
  checklists: [],
};

export const checklistSlice = createSlice({
  name: "checklists",
  initialState,
  reducers: {
    reset: (state) => {
      state.checklists = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get check list case
      .addCase(getCheckLists.fulfilled, (state, action) => {
        state.checklists = action.payload;
      })

      // Create check list case
      .addCase(createCheckList.fulfilled, (state, action) => {
        state.checklists = [...state.checklists, action.payload];
      })
      // Remove check list case
      .addCase(removeCheckList.fulfilled, (state, action) => {
        state.checklists = state.checklists.filter(
          (list) => list.id !== action.payload
        );
      })
      // Toggle checklist case
      .addCase(toggleCheckListCompletion.fulfilled, (state, action) => {
        state.checklists = state.checklists.map((cl) =>
          cl.id === action.payload.idChecklist
            ? {
                ...cl,
                checkItems: cl.checkItems.map((item) =>
                  item.id === action.payload.id
                    ? { ...item, state: action.payload.state }
                    : item
                ),
              }
            : cl
        );
      })

      // Add item
      .addCase(addItem.fulfilled, (state, action) => {
        state.checklists = state.checklists.map((cl) =>
          cl.id === action.payload.idChecklist
            ? {
                ...cl,
                checkItems: [...cl.checkItems, action.payload],
              }
            : cl
        );
      })
      // Remove Item
      .addCase(removeItem.fulfilled, (state, action) => {
        state.checklists = state.checklists.map((cl) =>
          cl.id === action.payload.checklistId
            ? {
                ...cl,
                checkItems: cl.checkItems.filter(
                  (item) => item.id !== action.payload.checkItemId
                ),
              }
            : cl
        );
      });
  },
});

export const { reset } = checklistSlice.actions;

// Export reducer
export default checklistSlice.reducer;
