import { Box, Checkbox } from "@chakra-ui/react";

const CheckListItems = ({ items, onToggle }) => {
  return (
    <Box display="flex" flexDirection="column">
      {items.map((item) => (
        <Checkbox.Root
          mt="1"
          size="sm"
          p="2"
          cursor="pointer"
          key={item.id}
          checked={item.state === "complete"}
          onChange={() => onToggle(item.id, item.state)}
          _hover={{ bg: "gray.100", rounded: "l3" }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
          <Checkbox.Label
            textDecoration={item.state === "complete" ? "line-through" : "none"}
          >
            {item.name}
          </Checkbox.Label>
        </Checkbox.Root>
      ))}
    </Box>
  );
};

export default CheckListItems;
