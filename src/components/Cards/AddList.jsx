import { Button, Card } from "@chakra-ui/react";
import React, { useState } from "react";
import AddCard from "./AddCard";
import { IoMdAdd } from "react-icons/io";
import Error from "../Error";
import Loading from "../Loading";
import { useDispatch } from "react-redux";
import { addList } from "@/redux/slices/cards/thunks/cardsThunks";

const AddList = ({ boardId }) => {
  const [showAddList, setShowAddList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  // Handle add list function
  const handleAddList = async (input) => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      await dispatch(addList({ input, boardId })).unwrap();
    } catch (err) {
      setError(err.message);
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
              onCardClick={setShowAddList}
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
