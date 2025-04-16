import { Button, Card } from "@chakra-ui/react";
import { useState } from "react";
import AddCard from "./AddCard";
import { IoMdAdd } from "react-icons/io";
import Error from "../Error";
import Loading from "../Loading";
import { useDispatch } from "react-redux";
import { addList } from "../../redux/slices/cards/thunks/cardsThunks";
import { AppDispatch } from "../../redux/store";

const AddList = ({ boardId }: { boardId: string }) => {
  const [showAddList, setShowAddList] = useState<boolean | null>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  // Handle add list function
  const handleAddList = async (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    try {
      setLoading(true);
      await dispatch(addList({ input: trimmed, boardId })).unwrap();
    } catch (err: any) {
      setError(err?.message ?? err);
    } finally {
      setLoading(false);
      setShowAddList(false);
    }
  };

  return (
    <Card.Root width="400px" rounded="2xl" bg={"gray.200"} height="100%">
      {loading && <Loading height="100px" />}
      {error && <Error error={error} />}
      {!loading && !error && (
        <Card.Body>
          {showAddList ? (
            <AddCard
              placeholder="Enter list name..."
              buttonTitle="Add list"
              onCardClick={() => setShowAddList(null)}
              handleAdd={handleAddList}
            />
          ) : (
            <Button variant="plain" onClick={() => setShowAddList(true)}>
              <IoMdAdd />
              Add another list
            </Button>
          )}
        </Card.Body>
      )}
    </Card.Root>
  );
};

export default AddList;
