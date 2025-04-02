import { Box, Text } from "@chakra-ui/react";
import React from "react";
import CardModal from "./CardModal";

const CardItem = ({ list }) => {
  return (
    <Box
      bg="white"
      rounded="md"
      cursor="pointer"
      key={list.id}
      whiteSpace="normal"
      overflowWrap="break-word"
      _hover={{ outlineStyle: "solid", outlineColor: "blue" }}
    >
      <CardModal>{list.name}</CardModal>
    </Box>
  );
};

export default CardItem;
