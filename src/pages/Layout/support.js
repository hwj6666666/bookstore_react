import React from "react";
import { Helmet } from "react-helmet";

const MainSupport = () => {
  return (
    <div className="max-w-screen-md mx-auto p-4">
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <img
        src={process.env.PUBLIC_URL + "/icon.jpg"}
        alt="Icon"
        className="mx-auto block pt-20"
      />

      <h1
        className="text-6xl font-light text-center"
        style={{ fontFamily: "Dancing Script, cursive" }}
      >
        Mystic Pages Emporium
      </h1>
      <hr className="border-gray-200" />
      <div className="flex">
        <section
          className="w-1/2 flex-grow text-center"
          style={{ fontFamily: "Dancing Script, cursive" }}
        >
          <h4 className="text-3xl font-light my-2">About Me</h4>
          <p>
            Welcome to Mystic Pages Emporium, where every book holds the key to
            unlocking the secrets of the universe.
          </p>
        </section>
        <section
          className="flex-grow text-center ml-4"
          style={{ fontFamily: "Dancing Script, cursive" }}
        >
          <h4 className="text-3xl font-light my-2 ">My Favorite Book</h4>
          <p>Harry Potter</p>
        </section>
      </div>
    </div>
  );
};

export default MainSupport;
