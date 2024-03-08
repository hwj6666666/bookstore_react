import React from "react";
import { Helmet } from "react-helmet";

function Aside() {
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
      <button
        className="bg-transparent hover:bg-header-purple w-32  my-2 text-white font-bold py-2 px-4 rounded"
        title="Account"
      >
        <span className="material-symbols-outlined">account_circle</span>
      </button>
      <button
        className="bg-transparent hover:bg-header-purple w-32  my-2 text-white font-bold py-2 px-4 rounded"
        title="Bookstore"
      >
        <span className="material-symbols-outlined">menu_book</span>
      </button>
      <button
        className="bg-transparent hover:bg-header-purple w-32  my-2 text-white font-bold py-2 px-4 rounded"
        title="Shopping Cart"
      >
        <span className="material-symbols-outlined">shopping_cart</span>
      </button>
      <button
        className="bg-transparent hover:bg-header-purple w-32  my-2 text-white font-bold py-2 px-4 rounded"
        title="Shipping"
      >
        <span className="material-symbols-outlined">local_shipping</span>
      </button>
      <button
        className="bg-transparent hover:bg-header-purple w-32  my-2 text-white font-bold py-2 px-4 rounded"
        title="Support"
      >
        <span className="material-symbols-outlined">contact_support</span>
      </button>
    </aside>
  );
}

export default Aside;
