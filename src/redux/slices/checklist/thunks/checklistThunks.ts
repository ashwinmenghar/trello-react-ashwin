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
  async (cardId: number) => {
    const { data } = await getCheckListsInCard(cardId);
    return data;
  }
);

export const createCheckList = createAsyncThunk(
  "add/checklist",
  async ({
    checklistText,
    cardId,
  }: {
    checklistText: string;
    cardId: number;
  }) => {
    const { data } = await addCheckList(checklistText, cardId);
    return data;
  }
);

export const removeCheckList = createAsyncThunk(
  "delete/checkList",
  async (id: number) => {
    await deleteCheckList(id);
    return id;
  }
);

export const toggleCheckListCompletion = createAsyncThunk(
  "toggle/checklistCompletion",
  async ({
    cardId,
    checkItemId,
    isComplete,
  }: {
    cardId: number;
    checkItemId: number;
    isComplete: string;
  }) => {
    return await toggleCheckList(cardId, checkItemId, isComplete);
  }
);

export const addItem = createAsyncThunk(
  "create/item",
  async ({ checkListId, name }: { checkListId: number; name: string }) => {
    return await createItem(checkListId, name);
  }
);

export const removeItem = createAsyncThunk(
  "delete/item",
  async ({
    checklistId,
    checkItemId,
  }: {
    checklistId: number;
    checkItemId: number;
  }) => {
    await deleteItem(checklistId, checkItemId);
    return {
      checklistId,
      checkItemId,
    };
  }
);
