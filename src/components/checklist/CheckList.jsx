import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import Loading from "../Loading";
import Error from "../Error";
import CheckListHeader from "./CheckListHeader";
import CheckListProgress from "./CheckListProgress";

import CheckListItems from "./CheckListItems";
import CheckListNewItemForm from "./CheckListNewItemForm";
import { useChecklist } from "@/context/ChecklistContext";
import { createItem, deleteCheckList, toggleCheckList } from "@/helper";

const CheckList = ({ checkList, cardId }) => {
  const { setChecklists } = useChecklist();
  const { checkItems, name, id } = checkList;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Calculate total percentage
  const totalPercentage = checkItems.length
    ? Math.floor(
        (checkItems.filter(({ state }) => state === "complete").length /
          checkItems.length) *
          100
      )
    : 0;

  // Handle toggle check item
  const handleToggleCheckItem = async (checkItemId, state) => {
    try {
      setLoading(true);

      const updatedCheckList = await toggleCheckList(
        cardId,
        checkItemId,
        state
      );

      setChecklists({
        type: "UPDATE_CHECKITEM",
        payload: {
          checklistId: id,
          checkItemId,
          state: updatedCheckList.state,
        },
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle add new item
  const handleAddItem = async (itemText) => {
    try {
      setLoading(true);
      const newItem = await createItem(id, itemText);

      setChecklists({
        type: "ADD_CHECKITEM",
        payload: {
          newItem,
          checklistId: id,
        },
      });
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
      await deleteCheckList(id);

      setChecklists({
        type: "DELETE_CHECKLIST",
        payload: id,
      });
    } catch (error) {
      setError(error);
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
