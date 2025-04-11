import { Center, Text } from "@chakra-ui/react";

const Error = ({ error, mt = "1px" }: { error: string; mt?: string }) => {
  return (
    <Center mt={mt} p="10">
      <Text fontWeight="bold" fontSize="24px" color="red">
        {error}
      </Text>
    </Center>
  );
};

export default Error;
