import {
  Button,
  Card,
  CloseButton,
  Dialog,
  For,
  HStack,
  Portal,
} from "@chakra-ui/react";

const CreateBoard = () => {
  return (
    <>
      <HStack wrap="wrap">
        <Dialog.Root placement="center" motionPreset="slide-in-bottom">
          <Card.Root
            width="200px"
            shadow="sm"
            cursor="pointer"
            m="10px"
            bg="gray.300"
          >
            <Dialog.Trigger p="30px" cursor="pointer">
              Create New Board
            </Dialog.Trigger>
          </Card.Root>

          {/* <Dialog.Trigger asChild>
            <Button variant="outline">Open Dialog </Button>
          </Dialog.Trigger> */}
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Dialog Title</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button>Save</Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </HStack>
    </>
  );
};
export default CreateBoard;
