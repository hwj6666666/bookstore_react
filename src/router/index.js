//路由配置

// import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import App from "@/pages/Layout/App";
import MainBookstore from "@/pages/Layout/bookstore";
import MainSupport from "@/pages/Layout/support";

import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";
import AccountPage from "@/pages/Layout/account";
import MainCart from "@/pages/Layout/cart";
import MainParcel from "@/pages/Layout/parcel";
import BookInfo from "@/pages/Layout/bookInfo";

//配置路由实例

const router = createBrowserRouter([
  {
    path: "/",
    //根据token控制路由权限
    element: (
      <AuthRoute>
        <App />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: <MainBookstore />,
      },
      {
        path: "account",
        element: <AccountPage />,
      },
      {
        path: "bookstore",
        element: <MainBookstore />,
      },
      {
        path: "cart",
        element: <MainCart />,
      },
      {
        path: "parcel",
        element: <MainParcel />,
      },
      {
        path: "support",
        element: <MainSupport />,
      },
      {
        path: "bookstore/:id",
        element: <BookInfo />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
