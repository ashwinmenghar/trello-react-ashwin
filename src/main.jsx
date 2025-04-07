import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import App from "./App.jsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </Provider>
  </StrictMode>
);
