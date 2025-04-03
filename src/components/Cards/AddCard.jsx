import { Box, Button, Textarea } from "@chakra-ui/react";
import React from "react";
import { IoClose } from "react-icons/io5";

const AddCard = ({ onCardClick }) => {
  return (
    <Box>
      <Textarea
        autoresize
        placeholder="Enter a title"
        maxH="5lh"
        bg="white"
        w="100%"
        rounded="l3"
        fontSize="16px"
        fontWeight="500"
      />

      <Button variant="plain" bg="blue.600" color="white" p="10px">
        Add card
      </Button>
      <Button variant="plain" onClick={() => onCardClick(null)}>
        <IoClose />
      </Button>
    </Box>
  );
};

export default AddCard;
