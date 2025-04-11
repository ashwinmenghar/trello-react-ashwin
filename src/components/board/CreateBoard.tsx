import {
  Button,
  Card,
  CloseButton,
  Dialog,
  Field,
  HStack,
  Input,
  Portal,
} from "@chakra-ui/react";
import { useState } from "react";
import Loading from "../Loading";
import Error from "../Error";
import { useDispatch, useSelector } from "react-redux";
import { addBoard } from "../../redux/slices/board/thunks/boardsThunks";
import { AppDispatch, RootState } from "../../redux/store";

const CreateBoard = () => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { status } = useSelector((state: RootState) => state.board);
  const { loading, error } = status.add;
  const dispatch = useDispatch<AppDispatch>();

  // Add new board
  const handleAddBoard = async () => {
    if (!input.trim()) return;
    await dispatch(addBoard(input)).unwrap();

    setIsOpen(false);
    setInput("");
  };

  return (
    <>
      <HStack wrap="wrap">
        <Dialog.Root
          placement="center"
          motionPreset="slide-in-bottom"
          open={isOpen}
          // @ts-ignore
          onClose={() => setIsOpen(false)}
        >
          <Card.Root
            width="400px"
            shadow="sm"
            cursor="pointer"
            m="10px"
            bg="gray.300"
            py="20px"
            _hover={{ bg: "gray.200" }}
            onClick={() => setIsOpen(true)}
          >
            <Dialog.Trigger p="30px" cursor="pointer" fontWeight="500">
              Create New Board
            </Dialog.Trigger>
          </Card.Root>

          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Create board</Dialog.Title>
                </Dialog.Header>
                {loading && <Loading height="200px" />}
                {error && <Error error={error.message} />}

                {!loading && !error && (
                  <Dialog.Body>
                    <Field.Root required>
                      <Field.Label>
                        Board title <Field.RequiredIndicator />
                      </Field.Label>
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <Field.HelperText
                        color={input.length == 0 ? "red" : "gray.500"}
                      >
                        Board title is required
                      </Field.HelperText>
                    </Field.Root>
                  </Dialog.Body>
                )}
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                  </Dialog.ActionTrigger>
                  <Button onClick={handleAddBoard}>Save</Button>
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
