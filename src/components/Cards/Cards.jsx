import { apiV1Instance } from "@/api";
import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";
import Error from "../Error";
import Loading from "../Loading";
import CardList from "./CardList";
import { Box, Container, HStack } from "@chakra-ui/react";

const reducer = (state, action) => {
  const { cards, lists } = action;

  return lists.map((list) => {
    const cardData = cards.filter((card) => card.idList === list.id);
    return { ...list, cardData };
  });
};

const Cards = () => {
  const { id } = useParams();
  const [cardsData, dispatch] = useReducer(reducer, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);

        const lists = await apiV1Instance.get(`/boards/${id}/lists`);
        const cards = await apiV1Instance.get(`/boards/${id}/cards`);

        dispatch({ lists: lists.data, cards: cards.data });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error.message || "Something went wrong");
      }
    };
    fetchCards();
  }, [id]);

  console.log(cardsData);

  return (
    <>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {/* {!loading && !error && (

      )} */}

      <Container mt="100px">
        <Box display="flex" gap={5}>
          {cardsData.map((card) => (
            <CardList card={card} key={card.id} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Cards;
