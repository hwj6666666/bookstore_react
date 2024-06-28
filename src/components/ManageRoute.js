import { Navigate } from "react-router-dom";

export function ManageRoute({ children }) {
  const isManager = localStorage.getItem("isManager");
  return isManager ? children : <Navigate to="/login" replace />;
}
