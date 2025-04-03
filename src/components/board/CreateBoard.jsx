import { apiV1Instance } from "@/api";
import { useBoard } from "../../context/BoardContext";
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

const CreateBoard = () => {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { fetchBoards } = useBoard();

  const addBoard = async () => {
    if (!input.trim()) return;
    try {
      setLoading(true);

      await apiV1Instance.post(`boards/?name=${input}`);
      fetchBoards();
      setInput("");

      setLoading(false);
      setIsOpen(false);
    } catch (error) {
      setLoading(false);
      setError(error.message || "Something went wrong");
    }
  };

  return (
    <>
      <HStack wrap="wrap">
        <Dialog.Root
          placement="center"
          motionPreset="slide-in-bottom"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Card.Root
            width="200px"
            shadow="sm"
            cursor="pointer"
            m="10px"
            bg="gray.300"
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
                {error && <Error error={error} />}

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
                  <Button onClick={addBoard}>Save</Button>
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
