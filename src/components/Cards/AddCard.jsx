import { Box, Button, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const AddCard = ({
  onCardClick,
  placeholder = "Enter a title",
  buttonTitle = "Add card",
  handleAdd,
}) => {
  const [input, setInput] = useState("");

  // Handle add card function
  const handleAddData = () => {
    handleAdd(input);
    setInput("");
  };

  return (
    <Box>
      <Textarea
        autoresize
        placeholder={placeholder}
        maxH="5lh"
        bg="white"
        w="100%"
        rounded="l3"
        fontSize="16px"
        fontWeight="500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <Button
        variant="plain"
        bg="blue.600"
        color="white"
        p="10px"
        onClick={handleAddData}
      >
        {buttonTitle}
      </Button>
      <Button variant="plain" onClick={() => onCardClick(null)}>
        <IoClose />
      </Button>
    </Box>
  );
};

export default AddCard;
