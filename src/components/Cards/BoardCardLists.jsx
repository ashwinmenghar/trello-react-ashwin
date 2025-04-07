import React, { useEffect, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import CardList from "./CardList";
import Error from "../Error";
import Loading from "../Loading";
import AddList from "./AddList";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "@/redux/slices/cards";

const BoardCardLists = () => {
  const { id } = useParams();
  const [activeCardId, setActiveCardId] = useState(null);

  const { cards, status } = useSelector((state) => state.cards);
  const { error, loading } = status.fetch;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCards(id));
  }, [id]);

  const handleCardClick = (cardId) => {
    setActiveCardId((prevId) => (prevId === cardId ? null : cardId));
  };

  return (
    <>
      {error && <Error error={error} />}
      {loading && <Loading />}

      <Container mt="100px">
        <Box display="flex" gap={5} w="150rem">
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
    </>
  );
};

export default BoardCardLists;
