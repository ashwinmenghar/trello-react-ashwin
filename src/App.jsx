import { BrowserRouter, Route, Routes } from "react-router";
import BoardList from "./components/board/BoardList";
import BoardCardLists from "./components/Cards/BoardCardLists";
import { BoardProvider } from "./context/BoardContext";
import { BoardListProvider } from "./context/BoardListContext";
import Layout from "./Layout";
import { ChecklistProvider } from "./context/ChecklistContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/boards" element={<Layout />}>
          <Route
            index
            element={
              <BoardProvider>
                <BoardList />
              </BoardProvider>
            }
          />
          <Route
            path=":id"
            element={
              <BoardListProvider>
                <ChecklistProvider>
                  <BoardCardLists />
                </ChecklistProvider>
              </BoardListProvider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
