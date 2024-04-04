import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
const App = lazy(() => import("./App.tsx"));
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Account = lazy(() => import("./components/Account/Dashboard.tsx"));
import { QueryClient, QueryClientProvider } from "react-query";
import { Loader } from "./components/Loaders/Loader.tsx";
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
      <Suspense
        fallback={
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex   items-center space-x-2">
            <Loader color="red" />
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>
);
