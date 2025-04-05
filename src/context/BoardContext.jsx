import { createContext, useContext, useEffect, useState } from "react";
import { getBoards } from "@/helper";

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState("");

  // Get all boards
  const fetchBoards = async () => {
    try {
      setLoading(true);

      const getAllBoards = await getBoards();
      setBoards(getAllBoards);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  return (
    <BoardContext.Provider
      value={{ boards, loading, error, setBoards }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export const useBoard = () => useContext(BoardContext);
