import { Box, Button, Card } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import CardItem from "./CardItem";
import AddCard from "./AddCard";
import { useState } from "react";
import { apiV1Instance } from "@/api";
import Loading from "../Loading";
import { useBoardList } from "../../context/BoardListContext";

const CardList = ({ card, isActive, onCardClick }) => {
  const { setCardsData } = useBoardList();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Add card function
  const handleCard = async (input) => {
    if (!input.trim()) return;

    try {
      setLoading(true);

      const { data } = await apiV1Instance.post(
        `/cards?name=${input}&idList=${card?.id}`
      );

      setCardsData({
        type: "SET_CARD_DATA",
        payload: { listId: card?.id, cardData: data },
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message || "Something went wrong");
    }
    onCardClick(null);
  };

  // Handle remove list and update data
  const handleRemoveList = async () => {
    try {
      setLoading(true);

      const data = await apiV1Instance.put(`/lists/${card.id}?closed=true`);
      console.log(data);

      setCardsData({
        type: "REMOVE_LIST",
        payload: { listId: card.id },
      });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <Card.Root width="400px" rounded="2xl" bg={"gray.200"} height="100%">
      {loading && <Loading height="200px" />}
      {error && <Error error={error} />}

      {!loading && !error && (
        <>
          <Card.Header>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              cursor="pointer"
            >
              {card.name} <FaTrash onClick={handleRemoveList} />
            </Box>
          </Card.Header>
          <Card.Body gap="2">
            {card?.cardData?.map((list) => (
              <CardItem list={list} key={list.id} />
            ))}
          </Card.Body>
          <Card.Footer>
            {isActive && (
              <AddCard onCardClick={onCardClick} handleAdd={handleCard} />
            )}
            {!isActive && (
              <Button
                variant="ghost"
                w="100%"
                _hover={{ bg: "gray.300" }}
                onClick={() => onCardClick(card.id)}
              >
                <IoMdAdd /> Add a card
              </Button>
            )}
          </Card.Footer>
        </>
      )}
    </Card.Root>
  );
};

export default CardList;
