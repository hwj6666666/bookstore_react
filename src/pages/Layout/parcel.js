import React, { useEffect } from "react";
import { Table, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/store/modules/order";
import { fetchCarts } from "@/store/modules/cart";
import { fetchBooks } from "@/store/modules/book";

function MainParcel() {
  const id = localStorage.getItem("id");
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order.orders);
  const books = useSelector((state) => state.book.books);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchCarts(id));
    dispatch(fetchOrders(id));
  }, [dispatch]);

  // Helper function to get book details by bookId
  const getBookById = (bookId) => books.find((book) => book.id === bookId);

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
        const formattedDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
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
    <Table
      columns={columns}
      dataSource={orders}
      expandable={{ expandedRowRender }}
      rowKey="id"
    />
  );
}

export default MainParcel;
