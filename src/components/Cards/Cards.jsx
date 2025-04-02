import { apiV1Instance } from "@/api";
import React, { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router";

const reducer = (state, action) => {
  const { cards, lists } = action;

  return lists.map((list) => {
    const cardData = cards.filter((card) => card.idList === list.id);
    return { ...list, cardData };
  });
};

const Cards = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  console.log(state);

  return <div>Cards</div>;
};

export default Cards;
