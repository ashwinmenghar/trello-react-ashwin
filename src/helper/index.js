import { apiV1Instance } from "@/api";

export const addCheckList = async (input, cardId) => {
  try {
    const data = await apiV1Instance.post(
      `/checklists?idCard=${cardId}&name=${input}`
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCheckListsInCard = async (cardId) => {
  try {
    const data = await apiV1Instance.get(`cards/${cardId}/checklists`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createBoard = async (name) => {
  if (!name.trim()) return;

  try {
    const { data } = await apiV1Instance.post(`boards/?name=${name}`);
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const getBoards = async () => {
  try {
    const { data } = await apiV1Instance.get("/members/me/boards");
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const createList = async (name, boardId) => {
  try {
    const { data } = await apiV1Instance.post(
      `/lists?name=${name}&idBoard=${boardId}`
    );
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const createCard = async (name, listId) => {
  try {
    const { data } = await apiV1Instance.post(
      `/cards?name=${name}&idList=${listId}`
    );
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const fetchBoardListAndCards = async (id) => {
  try {
    const lists = await apiV1Instance.get(`/boards/${id}/lists`);
    const cards = await apiV1Instance.get(`/boards/${id}/cards`);

    return { lists: lists.data, cards: cards.data };
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const removeCard = async (listId) => {
  try {
    const { data } = await apiV1Instance.put(`/lists/${listId}?closed=true`);
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const toggleCheckList = async (cardId, checkItemId, isComplete) => {
  try {
    const { data } = await apiV1Instance.put(
      `/cards/${cardId}/checkItem/${checkItemId}`,
      {
        state: isComplete === "complete" ? "incomplete" : "complete",
      }
    );

    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const createItem = async (checkListId, name) => {
  try {
    const { data } = await apiV1Instance.post(
      `/checklists/${checkListId}/checkItems?name=${name}`
    );

    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const deleteItem = async (checkListId, checkItemId) => {
  try {
    await apiV1Instance.delete(
      `/checklists/${checkListId}/checkItems/${checkItemId}`
    );
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};

export const deleteCheckList = async (checkListId) => {
  try {
    await apiV1Instance.delete(`/checklists/${checkListId}`);
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
};
