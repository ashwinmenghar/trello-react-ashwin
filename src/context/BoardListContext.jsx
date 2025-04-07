import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

import { useParams } from "react-router";
import { fetchBoardListAndCards } from "@/helper";

const BoardListContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA": {
      const { cards, lists } = action.payload;
      return lists.map((list) => ({
        ...list,
        cardData: cards.filter((card) => card.idList === list.id),
      }));
    }

    case "ADD_LIST": {
      const newList = {
        ...action.payload,
        cardData: [],
      };
      return [newList, ...state];
    }

    case "SET_CARD_DATA": {
      const { listId, cardData } = action.payload;

      return state.map((list) =>
        list.id === listId
          ? { ...list, cardData: [...list.cardData, cardData] }
          : list
      );
    }
    case "REMOVE_LIST": {
      return state.filter((list) => list.id !== action.payload.listId);
    }
    case "RESET": {
      return [];
    }

    default:
      return state;
  }
};

export const BoardListProvider = ({ children }) => {
  const { id } = useParams();
  const [cardsData, setCardsData] = useReducer(reducer, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCards = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setCardsData({ type: "RESET" });

      const { lists, cards } = await fetchBoardListAndCards(id);
      setCardsData({
        type: "SET_DATA",
        payload: { lists, cards },
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [id]);

  return (
    <BoardListContext.Provider
      value={{ cardsData, setCardsData, loading, error, fetchCards }}
    >
      {children}
    </BoardListContext.Provider>
  );
};

export const useBoardList = () => {
  const context = useContext(BoardListContext);
  if (!context) {
    throw new Error("useBoardList must be used within a BoardListProvider");
  }
  return context;
};
