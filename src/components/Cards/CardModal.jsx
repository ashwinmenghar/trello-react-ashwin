import { getCheckListsInCard } from "@/helper";
import { CloseButton, Dialog, HStack, Portal, Text } from "@chakra-ui/react";
import { useState } from "react";
import Loading from "../Loading";
import CheckList from "../checklist/CheckList";
import AddChecklist from "./AddChecklist";
import { useChecklist } from "@/context/ChecklistContext";

const CardModal = ({ name, cardId }) => {
  const { checklists, setChecklists } = useChecklist();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle card dialog
  const handleCardDialog = async () => {
    try {
      setChecklists({ type: "RESET" });
      setLoading(true);

      const { data } = await getCheckListsInCard(cardId);
      setChecklists({ type: "SET_CHECKLISTS", payload: data });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HStack wrap="wrap" gap="4">
      <Dialog.Root placement="center" motionPreset="slide-in-bottom">
        <Dialog.Trigger asChild>
          <Text p="10px" w="100%" onClick={handleCardDialog}>
            {name}
          </Text>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>{name}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                {loading && <Loading height="200px" />}
                {error && <Error error={error} />}

                {!loading && (
                  <AddChecklist
                    setLoading={setLoading}
                    cardId={cardId}
                    setError={setError}
                  />
                )}

                {checklists.map((list) => (
                  <CheckList checkList={list} cardId={cardId} key={list.id} />
                ))}
              </Dialog.Body>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </HStack>
  );
};
export default CardModal;
