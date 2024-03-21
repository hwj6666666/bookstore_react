import React, { useEffect } from "react";
import Header from "../../components/header.js";
import Aside from "../../components/aside.js";
import { Outlet } from "react-router-dom";
import { fetchUserInfo } from "@/store/modules/user";
import {  useDispatch, useSelector } from "react-redux";

function App() {

  //触发个人用户信息action
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);
  const name = useSelector(state => state.user.userInfo.name);

  return (
    <div className="bg-home bg-no-repeat bg-cover h-screen w-screen flex flex-col">
      <Header />
      <div className="flex-grow flex row ">
        <Aside />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
