import { Box, Button, Card, Text } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import CardItem from "./CardItem";
import CardModal from "./CardModal";

const CardList = ({ card }) => {
  return (
    <Card.Root width="100%" rounded="2xl" bg={"gray.200"}>
      <Card.Header>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          cursor="pointer"
        >
          {card.name} <FaTrash />
        </Box>
      </Card.Header>
      <Card.Body gap="2">
        {card.cardData.map((list) => (
          <CardItem list={list} key={list.id} />
        ))}
      </Card.Body>

      <Card.Footer>
        <Button variant="ghost" w="100%" _hover={{ bg: "gray.300" }}>
          <IoMdAdd /> Add a card
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default CardList;
