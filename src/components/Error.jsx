import { Center, Text } from "@chakra-ui/react";
import React from "react";

const Error = ({ error, mt = "1px" }) => {
  return (
    <Center mt={mt} p="10">
      <Text fontWeight="bold" fontSize="24px" color="red">
        {error}
      </Text>
    </Center>
  );
};

export default Error;
