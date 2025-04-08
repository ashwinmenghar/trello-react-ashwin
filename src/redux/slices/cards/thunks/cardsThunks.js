import {
  fetchBoardListAndCards,
  createCard,
  removeCard,
  createList,
} from "@/helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCards = createAsyncThunk(
  "board/fetchCards",
  async (boardId) => {
    return await fetchBoardListAndCards(boardId);
  }
);

export const addCard = createAsyncThunk(
  "cards/addCard",
  async ({ name, listId }) => {
    return await createCard(name, listId);
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
    return await createList(input, boardId);
  }
);
