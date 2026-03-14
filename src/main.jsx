import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./components/welcome/Welcome";
import SignInSide from "./routes/SignInSide";
import SignUp from "./routes/SignUp";

import ReactDOM from "react-dom/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "signin", element: <SignInSide /> },
      { path: "signup", element: <SignUp /> },
    ],
  },
]);

export default function Root() {
  return <RouterProvider router={router} />;
}

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  Root()
);