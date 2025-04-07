import { useChecklist } from "@/context/ChecklistContext";
import { Box, Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import Loading from "../Loading";
import Error from "../Error";
import { deleteItem } from "@/helper";

const CheckListItems = ({ items, onToggle, checklistId }) => {
  const { setChecklists } = useChecklist();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle delete item
  const handleDeleteItem = async (checkItemId) => {
    try {
      setLoading(true);
      await deleteItem(checklistId, checkItemId);

      setChecklists({
        type: "DELETE_CHECKITEM",
        payload: {
          checklistId,
          checkItemId,
        },
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading height="100px" />;
  if (error) return <Error error={error} />;

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
          _hover={{ bg: "gray.100", rounded: "l3" }}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control onClick={() => onToggle(item.id, item.state)} />
          <Checkbox.Label
            textDecoration={item.state === "complete" ? "line-through" : "none"}
            w="100%"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              {item.name}

              <Box cursor="pointer" onClick={() => handleDeleteItem(item.id)}>
                <MdDelete size="20px" />
              </Box>
            </Box>
          </Checkbox.Label>
        </Checkbox.Root>
      ))}
    </Box>
  );
};

export default CheckListItems;
