import React, { useState } from "react";
import { Table, DatePicker, Button, Radio, message } from "antd";

function StatisticsManage() {
  const [bookSalesData, setBookSalesData] = useState([]);
  const [userConsumptionData, setUserConsumptionData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [view, setView] = useState("books"); // 'books' or 'users'

  const { RangePicker } = DatePicker;

  const fetchBookSalesData = (startDate, endDate) => {
    fetch(
      `http://localhost:8080/books/sales?startDate=${startDate}&endDate=${endDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("book");
        console.log(data);
        setBookSalesData(data.data);
        return data.data;
      })
      .catch((error) => console.error("Error:", error));
  };

  const fetchUserConsumptionData = (startDate, endDate) => {
    fetch(
      `http://localhost:8080/auth/rank?startDate=${startDate}&endDate=${endDate}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("user");
        console.log(data);
        setUserConsumptionData(data.data);
        return data.data;
      })
      .catch((error) => console.error("Error:", error));
  };
  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const handleFetchData = () => {
    const [startDate, endDate] = dateRange;
    const formattedStartDate = startDate ? startDate.toISOString() : null;
    const formattedEndDate = endDate ? endDate.toISOString() : null;

    if (!startDate || !endDate) {
      message.error("Please select a date range");
      return;
    }

    // 获取书籍销量数据
    // const booksData = fetchBookSalesData(formattedStartDate, formattedEndDate);
    // setBookSalesData(booksData);
    fetchBookSalesData(formattedStartDate, formattedEndDate);

    // 获取用户消费数据
    // const usersData = fetchUserConsumptionData(
    //   formattedStartDate,
    //   formattedEndDate
    // );

    // setUserConsumptionData(usersData);
    fetchUserConsumptionData(formattedStartDate, formattedEndDate);
  };

  const bookSalesColumns = [
    { title: "ID", dataIndex: ["book", "id"], key: "id" },
    { title: "Title", dataIndex: ["book", "title"], key: "title" },
    { title: "Author", dataIndex: ["book", "author"], key: "author" },
    { title: "ISBN", dataIndex: ["book", "isbn"], key: "isbn" },
    { title: "Price", dataIndex: ["book", "price"], key: "price" },
    { title: "Stock", dataIndex: ["book", "stock"], key: "stock" },
    {
      title: "Sales",
      dataIndex: "sales",
      key: "sales",
      sorter: (a, b) => a.sales - b.sales,
    },
  ];

  const userConsumptionColumns = [
    { title: "ID", dataIndex: ["user", "id"], key: "id" },
    { title: "Name", dataIndex: ["user", "name"], key: "name" },
    { title: "State", dataIndex: ["user", "state"], key: "state" },
    { title: "Email", dataIndex: ["user", "email"], key: "email" },
    {
      title: "Consumption",
      dataIndex: "comsumption",
      key: "consumption",
      sorter: (a, b) => a.comsumption - b.comsumption,
      render: (text) => parseFloat(text).toFixed(2),
    },
  ];

  return (
    <div className="w-full" style={{ padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <RangePicker
          onChange={handleDateChange}
          style={{ marginRight: "10px" }}
        />
        <Button
          className="border-white"
          type="primary"
          onClick={handleFetchData}
          style={{ marginRight: "10px" }}
        >
          Fetch Data
        </Button>
        <Radio.Group onChange={(e) => setView(e.target.value)} value={view}>
          <Radio.Button value="books">Book Sales</Radio.Button>
          <Radio.Button value="users">User Consumption</Radio.Button>
        </Radio.Group>
      </div>
      {view === "books" ? (
        <Table columns={bookSalesColumns} dataSource={bookSalesData} />
      ) : (
        <Table
          columns={userConsumptionColumns}
          dataSource={userConsumptionData}
        />
      )}
    </div>
  );
}

export default StatisticsManage;
