import React, { useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import CreateBoard from "./CreateBoard";
import Board from "./Board";
import Loading from "../Loading";
import Error from "../Error";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards } from "../../redux/slices/board/thunks/boardsThunks";
import { AppDispatch, RootState } from "../../redux/store";

const BoardList = () => {
  const { boards, status } = useSelector((state: RootState) => state.board);
  const { error, loading } = status.fetch;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  if (loading) return <Loading />;
  if (error) return <Error error={error.message} mt="100px" />;

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
