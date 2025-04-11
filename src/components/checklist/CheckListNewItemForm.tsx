import { Box, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";

const CheckListNewItemForm = ({
  handleAddItem,
}: {
  handleAddItem: (value: string) => void;
}) => {
  const [itemText, setItemText] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  return isActive ? (
    <Box mt="10px">
      <Textarea
        size="sm"
        placeholder="Enter item name"
        mb="2"
        onChange={(e) => setItemText(e.target.value)}
        value={itemText}
      />
      <Button
        size="sm"
        variant="surface"
        onClick={() => {
          if (!itemText.trim()) return;
          handleAddItem(itemText.trim());
          setItemText("");
        }}
        disabled={!itemText.trim()}
      >
        Add
      </Button>
      <Button
        variant="ghost"
        size="sm"
        ml="2"
        onClick={() => {
          setIsActive(false);
          setItemText("");
        }}
      >
        Close
      </Button>
    </Box>
  ) : (
    <Button
      size="sm"
      variant="subtle"
      onClick={() => setIsActive(true)}
      mt="15px"
    >
      Add an item
    </Button>
  );
};

export default CheckListNewItemForm;
