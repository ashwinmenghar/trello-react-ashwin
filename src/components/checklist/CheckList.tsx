import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Loading from "../Loading";
import Error from "../Error";
import CheckListHeader from "./CheckListHeader";
import CheckListProgress from "./CheckListProgress";

import CheckListItems from "./CheckListItems";
import CheckListNewItemForm from "./CheckListNewItemForm";
import { useDispatch } from "react-redux";
import {
  addItem,
  removeCheckList,
  toggleCheckListCompletion,
} from "../../redux/slices/checklist/thunks/checklistThunks";
import { AppDispatch } from "../../redux/store";
import { Checklist } from "../../types/Checklist";

const CheckList = ({
  checkList,
  cardId,
}: {
  checkList: Checklist;
  cardId: string;
}) => {
  const { checkItems, name, id } = checkList;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  // Calculate total percentage
  const totalPercentage = checkItems.length
    ? Math.floor(
        (checkItems.filter(
          ({ state }: { state: string }) => state === "complete"
        ).length /
          checkItems.length) *
          100
      )
    : 0;

  // Handle toggle check item
  const handleToggleCheckItem = async (
    checkItemId: string,
    isComplete: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      await dispatch(
        toggleCheckListCompletion({ cardId, checkItemId, isComplete })
      ).unwrap();
    } catch (error: any) {
      setError(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Handle add new item
  const handleAddItem = async (itemText: string) => {
    setLoading(true);
    setError(null);

    try {
      await dispatch(addItem({ checkListId: id, name: itemText })).unwrap();
    } catch (error: any) {
      setError(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Handle delete check list
  const handleDeleteCheckList = async () => {
    setLoading(true);
    setError(null);

    try {
      await dispatch(removeCheckList(id)).unwrap();
    } catch (error: any) {
      setError(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading height="100px" />;
  if (error) return <Error error={error} />;

  return (
    <Box mt="10" px="2" py="1">
      <CheckListHeader
        name={name}
        handleDeleteCheckList={handleDeleteCheckList}
      />
      <CheckListProgress percentage={totalPercentage} />
      <CheckListItems
        items={checkItems}
        onToggle={handleToggleCheckItem}
        checklistId={id}
      />
      <CheckListNewItemForm handleAddItem={handleAddItem} />
    </Box>
  );
};

export default CheckList;
