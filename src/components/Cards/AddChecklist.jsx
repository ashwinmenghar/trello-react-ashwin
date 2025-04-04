import { addCheckList } from "@/helper";
import { Box, Button, Dialog, Input, Popover } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoMdCheckboxOutline } from "react-icons/io";

const AddChecklist = ({ setLoading, cardId, setError, setChecklist }) => {
  const [checklistText, setChecklistText] = useState("");

  const handleAddCheckList = async () => {
    try {
      setLoading(true);
      const { data } = await addCheckList(checklistText, cardId);
      setChecklist((prev) => [...prev, data]);
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Box display="flex" justifyContent="center">
          <Button variant="outline" w="100%">
            <IoMdCheckboxOutline /> Checklist
          </Button>
        </Box>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Dialog.Header>
            <Dialog.Title>Add Checklist</Dialog.Title>
          </Dialog.Header>
          <Popover.Body>
            <Input
              bg="bg"
              size="sm"
              value={checklistText}
              onChange={(e) => setChecklistText(e.target.value)}
            />
            <Button size="sm" mt="5" w="100%" onClick={handleAddCheckList}>
              Add
            </Button>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
};

export default AddChecklist;
