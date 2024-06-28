import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Pagination, Input, Table } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import MyChart from "@/components/rankChart";
import BookCarousel from "@/components/bookCarousel";
import { fetchBooks } from "@/store/modules/book";
import Header from "@/components/header";
import Aside from "@/components/aside";
import ManageAside from "@/components/manage/aside";

function Manage() {

  return (
    <div className="bg-home bg-no-repeat bg-cover h-screen w-screen flex flex-col">
      <Header />
      <div className="flex-grow flex row ">
        {/* <Aside /> */}
        <ManageAside />
        <Outlet />
      </div>
    </div>
  );
}

export default Manage;
