import React, { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import CreateBoard from "./CreateBoard";
import Board from "./Board";
import Loading from "../Loading";
import Error from "../Error";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards } from "@/redux/slices/board";

const BoardList = () => {
  const { boards, status } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
  }, []);

  if (status.fetch.loading) return <Loading />;
  if (status.fetch.error) return <Error error={status.fetch.error} />;

  return (
    <Container>
      <Box display="flex" mt="5rem" flexWrap="wrap" gap={4}>
        <CreateBoard />
        {boards.map((board) => (
          <Board key={board.id} board={board} />
        ))}
      </Box>
    </Container>
  );
};

export default BoardList;
