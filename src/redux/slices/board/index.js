import { createBoard, getBoards } from "@/helper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk to fetch all boards
export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  return await getBoards();
});

// Async thunk to add a board
export const addBoard = createAsyncThunk("boards/addBoard", async (name) => {
  return await createBoard(name);
});

// Initial state
const initialState = {
  boards: [],
  status: {
    fetch: { loading: false, error: null },
    add: { loading: false, error: null },
  },
};

export const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    // clearAddBoardError: (state) => {
    //   state.status.add.error = null;
    // },
    // clearFetchBoardsError: (state) => {
    //   state.status.fetch.error = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, (state) => {
        state.status.fetch.loading = true;
        state.status.fetch.error = null;
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.status.fetch.loading = false;
        state.boards = action.payload;
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.status.fetch.loading = false;
        state.status.fetch.error = action.error;
      });

    builder
      .addCase(addBoard.pending, (state) => {
        state.status.add.loading = true;
        state.status.add.error = null;
      })
      .addCase(addBoard.fulfilled, (state, action) => {
        state.status.add.loading = false;
        state.boards.push(action.payload);
      })
      .addCase(addBoard.rejected, (state, action) => {
        state.status.add.loading = false;
        state.status.add.error = action.error;
      });
  },
});

// Export actions
export const {
  clearAddBoardError,
  clearFetchBoardsError,
  clearDeleteBoardError,
} = boardSlice.actions;

// Export reducer
export default boardSlice.reducer;
