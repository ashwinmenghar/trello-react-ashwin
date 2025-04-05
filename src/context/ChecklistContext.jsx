import { createContext, useContext, useReducer } from "react";

// Actions
const checklistReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHECKLISTS":
      return action.payload;

    case "ADD_CHECKLIST":
      return [...state, action.payload];

    case "DELETE_CHECKLIST":
      return state.filter((list) => list.id !== action.payload);

    case "UPDATE_CHECKITEM":
      return state.map((cl) =>
        cl.id === action.payload.checklistId
          ? {
              ...cl,
              checkItems: cl.checkItems.map((item) =>
                item.id === action.payload.checkItemId
                  ? { ...item, state: action.payload.state }
                  : item
              ),
            }
          : cl
      );

    case "ADD_CHECKITEM":
      return state.map((cl) =>
        cl.id === action.payload.checklistId
          ? {
              ...cl,
              checkItems: [...cl.checkItems, action.payload.newItem],
            }
          : cl
      );

    case "DELETE_CHECKITEM":
      return state.map((cl) =>
        cl.id === action.payload.checklistId
          ? {
              ...cl,
              checkItems: cl.checkItems.filter(
                (item) => item.id !== action.payload.checkItemId
              ),
            }
          : cl
      );

    default:
      return state;
  }
};

const ChecklistContext = createContext();

export const ChecklistProvider = ({ children }) => {
  const [checklists, setChecklists] = useReducer(checklistReducer, []);

  return (
    <ChecklistContext.Provider
      value={{
        checklists,
        setChecklists,
      }}
    >
      {children}
    </ChecklistContext.Provider>
  );
};

export const useChecklist = () => useContext(ChecklistContext);
