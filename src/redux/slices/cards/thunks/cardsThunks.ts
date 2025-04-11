import {
  fetchBoardListAndCards,
  removeCard,
  createList,
  createCard,
} from "../../../../helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCards = createAsyncThunk(
  "board/fetchCards",
  async (boardId: number) => {
    return await fetchBoardListAndCards(boardId);
  }
);

export const addCard = createAsyncThunk(
  "cards/addCard",
  async ({ name, listId }: { name: string; listId: number }) => {
    return await createCard(name, listId);
  }
);

export const removeList = createAsyncThunk(
  "cards/removeList",
  async (listId: number) => {
    return await removeCard(listId);
  }
);

export const addList = createAsyncThunk(
  "lists/addList",
  async ({ input, boardId }: { input: string; boardId: number }) => {
    return await createList(input, boardId);
  }
);
