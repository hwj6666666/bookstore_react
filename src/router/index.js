//路由配置

// import Layout from "@/pages/Layout";
import Login from "@/pages/Login";
import App from "@/pages/Layout/App";
import MainBookstore from "@/components/main_bookstore";
import MainSupport from "@/components/main_support";

import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";
import MainAccount from "@/components/main_account";
import MainCart from "@/components/main_cart";
import MainParcel from "@/components/main_parcel";

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
        element: <MainBookstore/>
      },
      {
        path: "account",
        element: <MainAccount/>
      },
      {
        path: "bookstore",
        element: <MainBookstore />,
      },
      {
        path: "cart",
        element: <MainCart/>
      },
      {
        path: "parcel",
        element: <MainParcel/>
      },
      {
        path: "support",
        element: <MainSupport />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
