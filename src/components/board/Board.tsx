import { Card } from "@chakra-ui/react";
import { Link } from "react-router";

const Board = ({ board }) => {
  return (
    <Card.Root
      width="400px"
      shadow="sm"
      cursor="pointer"
      m="10px"
      textAlign="center"
      py="20px"
      _hover={{ bg: "gray.100" }}
    >
      <Link to={board.id}>
        <Card.Body>
          <Card.Title>{board.name}</Card.Title>
        </Card.Body>
      </Link>
    </Card.Root>
  );
};

export default Board;
