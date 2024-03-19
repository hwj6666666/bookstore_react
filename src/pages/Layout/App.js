import "./App.css";

import React, { useEffect } from "react";
import Header from "../../components/header.js";
import Aside from "../../components/aside.js";
import { Outlet } from "react-router-dom";
import { fetchUserInfo } from "@/store/modules/user";
import { UseDispatch, useDispatch, useSelector } from "react-redux";

function App() {

  //触发个人用户信息action
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  const name = useSelector(state => state.user.userInfo.name);

  return (
    <div className="App h-screen w-screen flex flex-col">
      <span>{name}</span>
      <Header />
      <div className="flex-grow flex row ">
        <Aside />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
