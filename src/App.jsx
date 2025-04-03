import BoardList from "./components/board/BoardList";
import { BoardProvider } from "./context/BoardContext";
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
