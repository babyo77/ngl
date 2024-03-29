import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Account from "./components/Account/Account.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
const client = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/:username?",
    element: <App />,
  },
  {
    path: "/da/account",
    element: <Account />,
  },
  {
    path: "*",
    element: <App />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
