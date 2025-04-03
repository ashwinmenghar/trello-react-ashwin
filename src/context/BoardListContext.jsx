import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { apiV1Instance } from "@/api";
import { useParams } from "react-router";

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
    try {
      setLoading(true);

      const lists = await apiV1Instance.get(`/boards/${id}/lists`);
      const cards = await apiV1Instance.get(`/boards/${id}/cards`);

      setCardsData({
        type: "SET_DATA",
        payload: { lists: lists.data, cards: cards.data },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message || "Something went wrong");
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
