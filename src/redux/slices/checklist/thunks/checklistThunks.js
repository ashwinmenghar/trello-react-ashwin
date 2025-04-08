import { getCheckListsInCard } from "@/helper";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCheckLists = createAsyncThunk(
  "fetch/checklists",
  async (cardId) => {
    const { data } = await getCheckListsInCard(cardId);
    return data;
  }
);
