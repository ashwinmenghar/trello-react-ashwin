import { Avatar, Button, Card } from "@chakra-ui/react";
import { Link } from "react-router";

const Board = ({ board }) => {
  return (
    <Card.Root width="200px" shadow="sm" cursor="pointer" m="10px">
      <Card.Body>
        <Link to={board.id}>
          <Card.Title>{board.name}</Card.Title>
        </Link>
      </Card.Body>
    </Card.Root>
  );
};

export default Board;
