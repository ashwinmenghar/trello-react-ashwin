import { BrowserRouter, Route, Routes } from "react-router";
import BoardList from "./components/board/BoardList";
import BoardCardLists from "./components/cards/BoardCardLists";
import Layout from "./Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/boards" element={<Layout />}>
          <Route index element={<BoardList />} />
          <Route path=":id" element={<BoardCardLists />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
