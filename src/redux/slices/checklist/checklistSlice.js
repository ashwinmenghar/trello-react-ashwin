import { createSlice } from "@reduxjs/toolkit";
import { getCheckLists } from "./thunks/checklistThunks";

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
    builder.addCase(getCheckLists.fulfilled, (state, action) => {
      state.status.loading = false;
      state.checklists = action.payload;
    });
  },
});

export const { reset } = checklistSlice.actions;

// Export reducer
export default checklistSlice.reducer;
