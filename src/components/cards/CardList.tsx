import { Box, Button, Card } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import CardItem from "./CardItem";
import AddCard from "./AddCard";
import Loading from "../Loading";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Error from "../Error";
import {
  addCard,
  removeList,
} from "../../redux/slices/cards/thunks/cardsThunks";
import { AppDispatch } from "../../redux/store";
import * as CardInterface from "../../types/Card";

const CardList = ({
  list,
  isActive,
  onCardClick,
}: {
  list: CardInterface.Card;
  isActive: boolean;
  onCardClick: (cardId: number | null) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  // Handle Add card function
  const handleAddCard = async (input: string) => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      await dispatch(addCard({ name: input, listId: list.id })).unwrap();
    } catch (error: any) {
      setError(error?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
      onCardClick(null);
    }
  };

  // Handle remove list and update data
  const handleRemoveList = async () => {
    try {
      setLoading(true);
      await dispatch(removeList(list.id)).unwrap();
    } catch (error: any) {
      setError(error?.message);
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
            {list?.cardData?.map((card: CardInterface.CardItem) => (
              <CardItem list={card} key={card.id} />
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
