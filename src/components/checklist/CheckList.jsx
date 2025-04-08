import React, { useState } from "react";
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
} from "@/redux/slices/checklist/thunks/checklistThunks";

const CheckList = ({ checkList, cardId }) => {
  const { checkItems, name, id } = checkList;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // Calculate total percentage
  const totalPercentage = checkItems.length
    ? Math.floor(
        (checkItems.filter(({ state }) => state === "complete").length /
          checkItems.length) *
          100
      )
    : 0;

  // Handle toggle check item
  const handleToggleCheckItem = async (checkItemId, isComplete) => {
    try {
      setLoading(true);

      await dispatch(
        toggleCheckListCompletion({ cardId, checkItemId, isComplete })
      ).unwrap();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle add new item
  const handleAddItem = async (itemText) => {
    try {
      setLoading(true);
      await dispatch(addItem({ checkListId: id, name: itemText })).unwrap();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete check list
  const handleDeleteCheckList = async () => {
    try {
      setLoading(true);

      await dispatch(removeCheckList(id)).unwrap();
    } catch (error) {
      setError(error.message);
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
