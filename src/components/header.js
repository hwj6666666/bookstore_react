import React from "react";
import { Helmet } from "react-helmet";

function Header() {
  return (
    <div className="flex justify-center items-center p-4 bg-header-purple text-center w-full h-32 box-border mb-0">
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <img className="h-20 w-auto max-w-full" src="/owl.png" alt="owl" />
      <h1
        className="text-white text-8xl mx-auto font-normal"
        style={{ fontFamily: "Dancing Script, cursive" }}
      >
        Mystic Pages Emporium
      </h1>
      <img
        className="h-20 w-auto max-w-full"
        src="/skeleton.png"
        alt="skeleton"
      />
    </div>
  );
}

export default Header;
