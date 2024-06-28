import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Pagination, Input, Image, Table, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import MyChart from "@/components/rankChart";
import BookCarousel from "@/components/bookCarousel";
import { fetchBooks } from "@/store/modules/book";
import { fetchAllOrders, fetchOrders } from "@/store/modules/order";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Search } = Input;

function ParcelManage() {
  const id = localStorage.getItem("id");
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order.orders);
  const books = useSelector((state) => state.book.books);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  // Helper function to get book details by bookId
  const getBookById = (bookId) => books.find((book) => book.id === bookId);

  // Filter orders based on search term and date range
  const filteredOrders = orders.filter((order) => {
    const isInDateRange = !dateRange[0] || (moment(order.payTime).isBetween(dateRange[0], dateRange[1], null, '[]'));
    const hasBookTitle = order.orderItems.some((item) => {
      const book = getBookById(item.bookId);
      return book ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    });
    return isInDateRange && (hasBookTitle || !searchTerm);
  });

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Pay Time",
      dataIndex: "payTime",
      key: "payTime",
      render: (text) => {
        const date = new Date(text);
        const formattedDate = `${date.getFullYear()}/${
          date.getMonth() + 1
        }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return formattedDate;
      },
    },
    {
      title: "Total Amount",
      key: "totalAmount",
      render: (record) => {
        const totalAmount = record.orderItems.reduce((sum, item) => {
          const book = getBookById(item.bookId);
          return sum + (book ? book.price * item.bookNum : 0);
        }, 0);
        return `$${totalAmount.toFixed(2)}`;
      },
    },
  ];

  const expandedRowRender = (order) => {
    const orderItemColumns = [
      {
        title: "Book Title",
        key: "bookTitle",
        render: (record) => {
          const book = getBookById(record.bookId);
          return book ? book.title : "N/A";
        },
      },
      {
        title: "Book Cover",
        key: "bookCover",
        render: (record) => {
          const book = getBookById(record.bookId);
          return book ? <Image width={50} src={book.imageBase64} /> : "N/A";
        },
      },
      {
        title: "Book Num",
        dataIndex: "bookNum",
        key: "bookNum",
      },
      {
        title: "Unit Price",
        key: "unitPrice",
        render: (record) => {
          const book = getBookById(record.bookId);
          return book ? `$${book.price.toFixed(2)}` : "N/A";
        },
      },
      {
        title: "Total Price",
        key: "totalPrice",
        render: (record) => {
          const book = getBookById(record.bookId);
          const totalPrice = book ? book.price * record.bookNum : 0;
          return `$${totalPrice.toFixed(2)}`;
        },
      },
    ];

    return (
      <Table
        columns={orderItemColumns}
        dataSource={order.orderItems}
        pagination={false}
        rowKey="id"
      />
    );
  };

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="w-2/3 mb-4">
        <RangePicker
          className="mr-2"
          onChange={(dates) => setDateRange(dates)}
          format="YYYY-MM-DD"
        />
        <Search
          placeholder="Search by book title"
          onSearch={(value) => setSearchTerm(value)}
          style={{ width: 200 }}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredOrders}
        expandable={{ expandedRowRender }}
        rowKey="id"
        className="w-2/3"
      />
    </div>
  );
}

export default ParcelManage;
