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
// idCard=67eb93a3d7891406ebfe81e7&key=b0f0af4b05df6b0caf13eb478e25c690&token=ATTA0a123c7ba654d8700d745036fb176a4dc58e625094c4493066a9d376c0e937796AE8B387
