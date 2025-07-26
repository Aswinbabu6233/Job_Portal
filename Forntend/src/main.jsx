import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";

import { RouterProvider } from "react-router-dom";
import Routerpath from "./router.jsx";
import store from "./utils/store.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Routerpath} />
    </Provider>
  </StrictMode>
);
