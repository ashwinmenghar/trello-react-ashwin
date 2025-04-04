import { Box, Button, Textarea } from "@chakra-ui/react";

const CheckListNewItemForm = ({
  isActive,
  itemText,
  setItemText,
  setIsActive,
  handleAddItem,
}) => {
  return isActive ? (
    <Box mt="10px">
      <Textarea
        size="sm"
        placeholder="Enter item name"
        mb="2"
        onChange={(e) => setItemText(e.target.value)}
        value={itemText}
      />
      <Button size="sm" variant="surface" onClick={handleAddItem}>
        Add
      </Button>
      <Button
        variant="ghost"
        size="sm"
        ml="2"
        onClick={() => setIsActive(false)}
      >
        Close
      </Button>
    </Box>
  ) : (
    <Button size="sm" variant="subtle" onClick={() => setIsActive(true)} mt="15px">
      Add an item
    </Button>
  );
};

export default CheckListNewItemForm;
