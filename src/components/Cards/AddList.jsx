import { Button, Card } from "@chakra-ui/react";
import React, { useState } from "react";
import AddCard from "./AddCard";
import { IoMdAdd } from "react-icons/io";
import { apiV1Instance } from "@/api";
import Error from "../Error";
import Loading from "../Loading";
import { useBoardList } from "@/context/BoardListContext";

const AddList = ({ boardId }) => {
  const [showAddList, setShowAddList] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setCardsData } = useBoardList();

  const handleAddList = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const { data } = await apiV1Instance.post(
        `/lists?name=${input}&idBoard=${boardId}`
      );

      setCardsData({
        type: "ADD_LIST",
        payload: data,
      });
      setLoading(false);
      setShowAddList(false);
      setInput("");
    } catch (error) {
      setError(error.message || "Something went wrong");
      setLoading(false);
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
              setText={setInput}
              text={input}
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
