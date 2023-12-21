import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/index.tsx";
import Settings from "./pages/Settings.tsx";
import Signup from "./pages/auth/Signup.tsx";
import Login from "./pages/auth/Login.tsx";
import History from "./pages/History/index.tsx";
import Layout from "./pages/Layout.tsx";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/history",
            element: <History />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
        ],
      },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
