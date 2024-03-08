import "./App.css";

import React from "react";
import Header from "./components/header.js";
import Aside from "./components/aside.js";
import MainSupport from "./components/main_support.js";

function App() {
  return (
    <div className="App h-screen w-screen flex flex-col">
      <Header />
      <div className="flex-grow flex row ">
        <Aside />
        <MainSupport />
      </div>
    </div>
  );
}

export default App;
