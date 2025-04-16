import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const AddCard = ({
  onCardClick,
  placeholder = "Enter a title",
  buttonTitle = "Add card",
  handleAdd,
}: {
  onCardClick: (cardId: string | null) => void;
  placeholder?: string;
  buttonTitle?: string;
  handleAdd: (text: string) => void;
}) => {
  const [input, setInput] = useState<string>("");

  // Handle add card function
  const handleAddCard = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    handleAdd(trimmed);
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
        onClick={handleAddCard}
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
