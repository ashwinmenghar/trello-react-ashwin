import {
  addCheckList,
  createItem,
  deleteCheckList,
  deleteItem,
  getCheckListsInCard,
  toggleCheckList,
} from "../../../../helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCheckLists = createAsyncThunk(
  "fetch/checklists",
  async (cardId: string) => {
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
    cardId: string;
  }) => {
    const { data } = await addCheckList(checklistText, cardId);
    return data;
  }
);

export const removeCheckList = createAsyncThunk(
  "delete/checkList",
  async (id: string) => {
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
    cardId: string;
    checkItemId: string;
    isComplete: string;
  }) => {
    return await toggleCheckList(cardId, checkItemId, isComplete);
  }
);

export const addItem = createAsyncThunk(
  "create/item",
  async ({ checkListId, name }: { checkListId: string; name: string }) => {
    return await createItem(checkListId, name);
  }
);

export const removeItem = createAsyncThunk(
  "delete/item",
  async ({
    checklistId,
    checkItemId,
  }: {
    checklistId: string;
    checkItemId: string;
  }) => {
    await deleteItem(checklistId, checkItemId);
    return {
      checklistId,
      checkItemId,
    };
  }
);
