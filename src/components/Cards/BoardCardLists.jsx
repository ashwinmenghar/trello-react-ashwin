import React, { useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import CardList from "./CardList";
import Error from "../Error";
import Loading from "../Loading";
import AddList from "./AddList";
import { useBoardList } from "../../context/BoardListContext";
import { useParams } from "react-router";

const BoardCardLists = () => {
  const { cardsData, loading, error } = useBoardList();
  const [activeCardId, setActiveCardId] = useState(null);
  const { id } = useParams();

  const handleCardClick = (cardId) => {
    setActiveCardId((prevId) => (prevId === cardId ? null : cardId));
  };

  return (
    <>
      {error && <Error error={error} />}
      {loading && <Loading />}

      <Container mt="100px">
        <Box display="flex" gap={5} w="150rem">
          {cardsData.map((list) => (
            <CardList
              key={list.id}
              card={list}
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
