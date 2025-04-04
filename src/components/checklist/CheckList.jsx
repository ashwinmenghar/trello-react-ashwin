import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { apiV1Instance } from "@/api";
import Loading from "../Loading";
import Error from "../Error";
import CheckListHeader from "./CheckListHeader";
import CheckListProgress from "./CheckListProgress";

import CheckListItems from "./CheckListItems";
import CheckListNewItemForm from "./CheckListNewItemForm";

const CheckList = ({ checkList, onUpdateCheckItems, cardId }) => {
  const { checkItems, name, id } = checkList;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isActive, setIsActive] = useState(false);
  const [itemText, setItemText] = useState("");

  const totalPercentage = checkItems.length
    ? Math.floor(
        (checkItems.filter(({ state }) => state === "complete").length /
          checkItems.length) *
          100
      )
    : 0;

  const handleCheckedInput = async (checkItemId, state) => {
    try {
      setLoading(true);
      const { data } = await apiV1Instance.put(
        `/cards/${cardId}/checkItem/${checkItemId}`,
        {
          state: state === "complete" ? "incomplete" : "complete",
        }
      );
      onUpdateCheckItems((prevCheckList) =>
        prevCheckList.map((checkList) => ({
          ...checkList,
          checkItems: checkList.checkItems.map((item) =>
            item.id === checkItemId ? { ...item, state: data.state } : item
          ),
        }))
      );
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    try {
      setLoading(true);
      const { data } = await apiV1Instance.post(
        `/checklists/${id}/checkItems?name=${itemText}`
      );
      onUpdateCheckItems((prevCheckList) =>
        prevCheckList.map((checkList) =>
          checkList.id === id
            ? { ...checkList, checkItems: [...checkList.checkItems, data] }
            : checkList
        )
      );
      setItemText("");
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loading height="100px" />}
      {error && <Error error={error} />}
      {!loading && !error && (
        <Box mt="10" px="2" py="1">
          <CheckListHeader name={name} />
          <CheckListProgress percentage={totalPercentage} />
          <CheckListItems items={checkItems} onToggle={handleCheckedInput} />
          <CheckListNewItemForm
            isActive={isActive}
            itemText={itemText}
            setItemText={setItemText}
            setIsActive={setIsActive}
            handleAddItem={handleAddItem}
          />
        </Box>
      )}
    </>
  );
};

export default CheckList;
