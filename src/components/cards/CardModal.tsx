import { CloseButton, Dialog, HStack, Portal, Text } from "@chakra-ui/react";
import { useState } from "react";
import Loading from "../Loading";
import CheckList from "../checklist/CheckList";
import AddChecklist from "./AddChecklist";
import { useDispatch, useSelector } from "react-redux";

import Error from "../Error";
import { AppDispatch, RootState } from "../../redux/store";
import { reset } from "../../redux/slices/checklist/checklistSlice";
import { getCheckLists } from "../../redux/slices/checklist/thunks/checklistThunks";
import { Checklist } from "../../types/Checklist";

const CardModal = ({ name, cardId }: { name: string; cardId: number }) => {
  const { checklists } = useSelector((state: RootState) => state.checklists);
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle card dialog
  const handleCardDialog = async () => {
    dispatch(reset());
    setLoading(true);
    setError(null);

    try {
      await dispatch(getCheckLists(cardId)).unwrap();
    } catch (error: any) {
      setError(error?.message ?? error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HStack wrap="wrap" gap="4">
      <Dialog.Root placement="center" motionPreset="slide-in-bottom">
        <Dialog.Trigger asChild>
          <Text
            p="10px"
            w="100%"
            onClick={!loading ? handleCardDialog : undefined}
            cursor={loading ? "not-allowed" : "pointer"}
            opacity={loading ? 0.5 : 1}
          >
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

                {!loading && !error && (
                  <AddChecklist
                    setLoading={setLoading}
                    cardId={cardId}
                    setError={setError}
                  />
                )}

                {checklists.map((list: Checklist) => (
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
