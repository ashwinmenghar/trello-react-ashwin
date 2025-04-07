import { createBoard, getBoards } from "@/helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch all boards
export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  return await getBoards();
});

// Async thunk to add a board
export const addBoard = createAsyncThunk("boards/addBoard", async (name) => {
  return await createBoard(name);
});
