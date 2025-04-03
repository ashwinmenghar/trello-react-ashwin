import Header from "./components/header/Header";
import BoardList from "./components/board/BoardList";
import { BoardProvider } from "./context/BoardContext";
import { Outlet } from "react-router";
// import { BoardProvider } from "./context/BoardContext";
function App() {
  return (
    <>
      <BoardProvider>
        <BoardList />
      </BoardProvider>
    </>
  );
}

export default App;
