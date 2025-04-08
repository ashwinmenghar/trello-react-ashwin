import { Box, Button, Heading } from "@chakra-ui/react";
import { IoMdCheckboxOutline } from "react-icons/io";

const CheckListHeader = ({ name, handleDeleteCheckList }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box display="flex" alignItems="center" gap="2">
        <IoMdCheckboxOutline size="20px" />
        <Heading size="md">{name}</Heading>
      </Box>
      <Button variant="outline" size="sm" onClick={handleDeleteCheckList}>
        Deletes
      </Button>
    </Box>
  );
};

export default CheckListHeader;
