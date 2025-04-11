import { Box } from "@chakra-ui/react";
import CardModal from "./CardModal";
import * as CardItemInterface from "../../types/Card";

const CardItem = ({ list }: { list: CardItemInterface.CardItem }) => {
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
      <CardModal name={list.name} cardId={list.id} />
    </Box>
  );
};

export default CardItem;
