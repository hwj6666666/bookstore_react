import { message } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

function ManageAside() {
  const location = useLocation();

  const buttonClass =
    "bg-transparent hover:bg-header-purple w-32 my-2 text-white font-bold py-2 px-4 rounded";
  const activeButtonClass =
    "bg-header-purple w-32 my-2 text-white font-bold py-2 px-4 rounded";

  const navigate = useNavigate();
  const handleLogout = () => {
    message.success("Logout successfully");
    localStorage.removeItem("isManager");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("id");
    navigate("/login");
  };

  return (
    <aside className="backdrop-blur-lg pt-10 items-center w-1/8 bg-transparent p-4 flex flex-col ">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <style>{`
          .material-symbols-outlined {
             font-variation-settings:
             'FILL' 0,
              'wght' 400,
              'GRAD' 0,
             'opsz' 24;
             font-size: 80px;
           }
        `}</style>
      </Helmet>
      <Link to="/manage/user">
        <button
          className={
            location.pathname === "/manage/user"
              ? activeButtonClass
              : buttonClass
          }
          title="Account"
        >
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </Link>
      <Link to="/manage/book">
        <button
          className={
            location.pathname === "/manage/book"
              ? activeButtonClass
              : buttonClass
          }
          title="Bookstore"
        >
          <span className="material-symbols-outlined">menu_book</span>
        </button>
      </Link>
      <Link to="/manage/order">
        <button
          className={
            location.pathname === "/manage/order"
              ? activeButtonClass
              : buttonClass
          }
          title="Order"
        >
          <span className="material-symbols-outlined">local_shipping</span>
        </button>
      </Link>
      <Link to="/manage/statistic">
        <button
          className={
            location.pathname === "/manage/statistic"
              ? activeButtonClass
              : buttonClass
          }
          title="Order"
        >
          <span className="material-symbols-outlined">query_stats</span>
        </button>
      </Link>
      {/* <Link to="/login"> */}
      <button className={buttonClass} onClick={handleLogout}>
        <span className="material-symbols-outlined">logout</span>
      </button>
      {/* </Link> */}
    </aside>
  );
}

export default ManageAside;
