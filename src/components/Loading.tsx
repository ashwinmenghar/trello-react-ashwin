import { HStack, Spinner, Text, VStack } from "@chakra-ui/react";

const Loading = ({ height = "100vh" }: { height?: string }) => {
  return (
    <HStack justifyContent="center" alignItems="center" h={height}>
      <VStack colorPalette="teal">
        <Spinner color="colorPalette.600" size="xl" />
        <Text color="colorPalette.600" fontSize="20px">
          Loading...
        </Text>
      </VStack>
    </HStack>
  );
};

export default Loading;
