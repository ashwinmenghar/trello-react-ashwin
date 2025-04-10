import { createSlice } from "@reduxjs/toolkit";
import { addBoard, fetchBoards } from "./thunks/boardsThunks";
import { InitialState } from "../../../types/Board";

// Initial state
const initialState: InitialState = {
  boards: [],
  status: {
    fetch: { loading: false, error: null },
    add: { loading: false, error: null },
  },
};

const handlePending = (
  state: InitialState,
  type: keyof InitialState["status"]
): void => {
  state.status[type].loading = true;
  state.status[type].error = null;
};

const handleFulfilled = (
  state: InitialState,
  action: any,
  type: keyof InitialState["status"]
): void => {
  state.status[type].loading = false;
  if (type === "fetch") {
    state.boards = action.payload;
  } else if (type === "add") {
    state.boards.push(action.payload);
    state.boards.sort((a, b) => a.name.localeCompare(b.name));
  }
};

const handleRejected = (
  state: InitialState,
  action: any,
  type: keyof InitialState["status"]
): void => {
  state.status[type].loading = false;
  state.status[type].error = action.error;
};

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch boards case
      .addCase(fetchBoards.pending, (state) => handlePending(state, "fetch"))
      .addCase(fetchBoards.fulfilled, (state, action) =>
        handleFulfilled(state, action, "fetch")
      )
      .addCase(fetchBoards.rejected, (state, action) =>
        handleRejected(state, action, "fetch")
      )

      // Add board case
      .addCase(addBoard.pending, (state) => handlePending(state, "add"))
      .addCase(addBoard.fulfilled, (state, action) =>
        handleFulfilled(state, action, "add")
      )
      .addCase(addBoard.rejected, (state, action) =>
        handleRejected(state, action, "add")
      );
  },
});

// Export reducer
export default boardSlice.reducer;
