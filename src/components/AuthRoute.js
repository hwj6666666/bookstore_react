//封装高阶组件
//核心逻辑：有token 正常跳转 无token 跳转到登录页

import { Navigate } from "react-router-dom";
import { getToken } from "@/utils";

export function AuthRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  // return getToken() ? children : <Navigate to="/login" replace/>;
  return isLoggedIn ? children : <Navigate to="/login" replace/>;
}
