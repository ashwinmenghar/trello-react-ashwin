import { Box, Button, Card } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import CardItem from "./CardItem";
import AddCard from "./AddCard";
import { useState } from "react";
import Loading from "../Loading";
import { useBoardList } from "../../context/BoardListContext";
import { createCard, removeCard } from "@/helper";

const CardList = ({ list, isActive, onCardClick }) => {
  const { setCardsData } = useBoardList();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle Add card function
  const handleAddCard = async (input) => {
    if (!input.trim()) return;

    try {
      setLoading(true);

      const newCard = await createCard(input, list?.id);
      setCardsData({
        type: "SET_CARD_DATA",
        payload: { listId: list?.id, cardData: newCard },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      onCardClick(null);
    }
  };

  // Handle remove list and update data
  const handleRemoveList = async () => {
    try {
      setLoading(true);
      await removeCard(list?.id);

      setCardsData({
        type: "REMOVE_LIST",
        payload: { listId: list.id },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
              {list.name} <FaTrash onClick={handleRemoveList} />
            </Box>
          </Card.Header>
          <Card.Body gap="2">
            {list?.cardData?.map((list) => (
              <CardItem list={list} key={list.id} />
            ))}
          </Card.Body>
          <Card.Footer>
            {isActive && (
              <AddCard onCardClick={onCardClick} handleAdd={handleAddCard} />
            )}
            {!isActive && (
              <Button
                variant="ghost"
                w="100%"
                _hover={{ bg: "gray.300" }}
                onClick={() => onCardClick(list.id)}
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
