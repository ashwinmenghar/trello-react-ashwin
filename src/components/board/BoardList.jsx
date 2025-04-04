import React from "react";
import { Box, Center, Container, Stack } from "@chakra-ui/react";
import CreateBoard from "./CreateBoard";
import Board from "./Board";
import Loading from "../Loading";
import { useBoard } from "../../context/BoardContext";

const BoardList = () => {
  const { boards, loading, error } = useBoard();

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <>
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
};

export default BoardList;
