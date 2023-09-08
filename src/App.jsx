import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout";
import Home from "./pages/Home";
import Register from "./component/Auth/Register";
import Login from "./component/Auth/Login";
import Topup from "./pages/Topup";
import Akun from "./pages/Akun";
import Transaction from "./pages/Transaction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "topup",
        element: <Topup />,
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "akun",
    element: <Akun />,
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
