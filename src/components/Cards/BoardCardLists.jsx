import React, { useEffect, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import CardList from "./CardList";
import Error from "../Error";
import Loading from "../Loading";
import AddList from "./AddList";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "@/redux/slices/cards/thunks/cardsThunks";

const BoardCardLists = () => {
  const [activeCardId, setActiveCardId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const { cards } = useSelector((state) => state.cards);
  const dispatch = useDispatch();

  const fetchBoardsData = async (boardId) => {
    try {
      setLoading(true);
      await dispatch(fetchCards(boardId)).unwrap();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardsData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCardClick = (cardId) => {
    setActiveCardId((prevId) => (prevId === cardId ? null : cardId));
  };

  return (
    <>
      {error && <Error error={error} />}
      {loading && <Loading />}

      {!loading && !error && (
        <Container mt="100px">
          <Box display="flex" gap={5} w="fit">
            {cards.map((list) => (
              <CardList
                key={list.id}
                list={list}
                isActive={activeCardId === list.id}
                onCardClick={handleCardClick}
              />
            ))}

            <AddList boardId={id} />
          </Box>
        </Container>
      )}
    </>
  );
};

export default BoardCardLists;
