import { createAsyncThunk } from "@reduxjs/toolkit";
import { createBoard, getBoards } from "../../../../helper";

// Async thunk to fetch all boards
export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  return await getBoards();
});

// Async thunk to add a board
export const addBoard = createAsyncThunk(
  "boards/addBoard",
  async (name: string) => {
    return await createBoard(name);
  }
);
