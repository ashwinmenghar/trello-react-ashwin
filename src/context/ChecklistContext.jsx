import { createContext, useContext, useState } from "react";

const ChecklistContext = createContext();

export const ChecklistProvider = ({ children }) => {
  const [checklists, setChecklists] = useState([]);

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
