import {
  addCheckList,
  createItem,
  deleteCheckList,
  deleteItem,
  getCheckListsInCard,
  toggleCheckList,
} from "@/helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCheckLists = createAsyncThunk(
  "fetch/checklists",
  async (cardId) => {
    const { data } = await getCheckListsInCard(cardId);
    return data;
  }
);

export const createCheckList = createAsyncThunk(
  "add/checklist",
  async ({ checklistText, cardId }) => {
    const { data } = await addCheckList(checklistText, cardId);
    return data;
  }
);

export const removeCheckList = createAsyncThunk(
  "delete/checkList",
  async (id) => {
    await deleteCheckList(id);
    return id;
  }
);

export const toggleCheckListCompletion = createAsyncThunk(
  "toggle/checklistCompletion",
  async ({ cardId, checkItemId, isComplete }) => {
    return await toggleCheckList(cardId, checkItemId, isComplete);
  }
);

export const addItem = createAsyncThunk(
  "create/item",
  async ({ checkListId, name }) => {
    return await createItem(checkListId, name);
  }
);

export const removeItem = createAsyncThunk(
  "delete/item",
  async ({ checklistId, checkItemId }) => {
    await deleteItem(checklistId, checkItemId);
    return {
      checklistId,
      checkItemId,
    };
  }
);
