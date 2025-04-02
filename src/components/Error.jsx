import { Center, Text } from "@chakra-ui/react";
import React from "react";

const Error = ({ error }) => {
  return (
    <Center mt="100px">
      <Text fontWeight="bold" fontSize="24px" color="red">
        {error}
      </Text>
    </Center>
  );
};

export default Error;
