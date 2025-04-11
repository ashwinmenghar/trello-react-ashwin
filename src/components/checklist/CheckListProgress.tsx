import { Box, HStack, Progress } from "@chakra-ui/react";

const CheckListProgress = ({ percentage }: { percentage: number }) => {
  return (
    <Box mt="2" p="4">
      <Progress.Root value={percentage} maxW="sm">
        <HStack gap="5">
          <Progress.ValueText>{percentage}%</Progress.ValueText>
          <Progress.Track flex="1" rounded="2xl">
            <Progress.Range />
          </Progress.Track>
        </HStack>
      </Progress.Root>
    </Box>
  );
};

export default CheckListProgress;
