import React from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";

function Aside() {
  //反向高亮
  //1. 获取当前路由路径
  const location = useLocation();

  const buttonClass =
    "bg-transparent hover:bg-header-purple w-32 my-2 text-white font-bold py-2 px-4 rounded";
  const activeButtonClass =
    "bg-header-purple w-32 my-2 text-white font-bold py-2 px-4 rounded";

  return (
    <aside className="pt-10 items-center w-1/8 bg-transparent p-4 flex flex-col border-r border-gray-300">
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
      <Link to="/account">
        <button
          className={
            location.pathname === "/account" ? activeButtonClass : buttonClass
          }
          title="Account"
        >
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </Link>
      <Link to="/bookstore">
        <button
          className={
            location.pathname === "/bookstore" ? activeButtonClass : buttonClass
          }
          title="Bookstore"
        >
          <span className="material-symbols-outlined">menu_book</span>
        </button>
      </Link>
      <Link to="/cart">
        <button
          className={
            location.pathname === "/cart" ? activeButtonClass : buttonClass
          }
          title="Shopping Cart"
        >
          <span className="material-symbols-outlined">shopping_cart</span>
        </button>
      </Link>
      <Link to="/parcel">
        <button
          className={
            location.pathname === "/parcel" ? activeButtonClass : buttonClass
          }
          title="Shipping"
        >
          <span className="material-symbols-outlined">local_shipping</span>
        </button>
      </Link>
      <Link to="/support">
        <button
          className={
            location.pathname === "/support" ? activeButtonClass : buttonClass
          }
          title="Support"
        >
          <span className="material-symbols-outlined">contact_support</span>
        </button>
      </Link>
    </aside>
  );
}

export default Aside;
