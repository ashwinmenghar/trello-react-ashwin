import { Box, Center, Container, Stack } from "@chakra-ui/react";
import Board from "./components/board/Board";
import Header from "./components/header/Header";
import CreateBoard from "./components/board/CreateBoard";
import { useEffect, useState } from "react";
import { apiV1Instance } from "./api";
function App() {
  const [loading, setLoading] = useState(false);
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setLoading(true);
        const res = await apiV1Instance.get("/members/me/boards");
        setBoards(res?.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);
  console.log(boards);

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <>
      <Header />
      <Container>
        <Box display="flex" mt="5rem" flexWrap="wrap">
          <CreateBoard />
          {boards.map((board) => (
            <Board key={board.id} board={board} />
          ))}
        </Box>
      </Container>
    </>
  );
}

export default App;
