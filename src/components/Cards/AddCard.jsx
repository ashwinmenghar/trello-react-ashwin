import { Box, Button, Textarea } from "@chakra-ui/react";
import React from "react";
import { IoClose } from "react-icons/io5";

const AddCard = ({
  onCardClick,
  placeholder = "Enter a title",
  buttonTitle = "Add card",
  setText,
  text,
  handleAdd,
}) => {
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
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button
        variant="plain"
        bg="blue.600"
        color="white"
        p="10px"
        onClick={handleAdd}
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
