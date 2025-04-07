import { Box, Button, Card } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import CardItem from "./CardItem";
import AddCard from "./AddCard";
import Loading from "../Loading";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addCard, removeList } from "@/redux/slices/cards/thunks/cardsThunks";
import Error from "../Error";

const CardList = ({ list, isActive, onCardClick }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  // Handle Add card function
  const handleAddCard = async (input) => {
    if (!input.trim()) return;

    try {
      setLoading(true);

      await dispatch(addCard({ name: input, listId: list.id })).unwrap();
      onCardClick(null);
    } catch (error) {
      // console.log("error is", error.message);

      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle remove list and update data
  const handleRemoveList = async () => {
    try {
      setLoading(true);
      await dispatch(removeList(list.id));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card.Root width="400px" rounded="2xl" bg={"gray.200"} height="100%">
      {loading && <Loading height="200px" />}
      {error && <Error error={error} mt="1" />}

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
