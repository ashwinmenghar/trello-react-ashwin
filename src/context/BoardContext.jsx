import { createContext, useContext, useEffect, useState } from "react";
import { apiV1Instance } from "@/api";

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState("");

  const fetchBoards = async () => {
    try {
      setLoading(true);
      const res = await apiV1Instance.get("/members/me/boards");
      setBoards(res?.data);
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <BoardContext.Provider value={{ boards, loading, error, fetchBoards }}>
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => useContext(BoardContext);
