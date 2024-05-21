import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import App from "../App";
import Eyeglasses from "../pages/dashboard/EyeglassesList";
import AddEyeglasses from "../pages/dashboard/AddEyeglasses";
import Sales from "../pages/dashboard/Sales";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Eyeglasses />,
      },
      {
        path: "dashboard/add-eyeglasses",
        element: <AddEyeglasses />,
      },
      {
        path: "dashboard/eyeglassesList",
        element: <Eyeglasses />,
      },

      {
        path: "sales",
        element: <Sales />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
