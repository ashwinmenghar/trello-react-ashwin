import {
  fetchBoardListAndCards,
  createCard,
  removeCard,
  createList,
} from "@/helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCards = createAsyncThunk("board/fetchCards", async (id) => {
  return await fetchBoardListAndCards(id);
});

export const addCard = createAsyncThunk(
  "cards/addCard",
  async ({ name, listId }) => {
    try {
      return await createCard(name, listId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const removeList = createAsyncThunk(
  "cards/removeList",
  async (listId) => {
    return await removeCard(listId);
  }
);

export const addList = createAsyncThunk(
  "lists/addList",
  async ({ input, boardId }) => {
    try {
      return await createList(input, boardId);
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
