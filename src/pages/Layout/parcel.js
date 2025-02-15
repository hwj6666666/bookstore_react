import React, { useEffect, useState } from "react";
import { Table, Image, Input, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/store/modules/order";
import { fetchCarts } from "@/store/modules/cart";
import { fetchBooks } from "@/store/modules/book";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const { RangePicker } = DatePicker;
const { Search } = Input;

function MainParcel() {
  const id = localStorage.getItem("id");
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.order.orders);
  const books = useSelector((state) => state.book.books);

  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchCarts(id));
    dispatch(fetchOrders(id));
  }, [dispatch]);

  // Helper function to get book details by bookId
  const getBookById = (bookId) => books.find((book) => book.id === bookId);

  // Filter orders based on search term and date range
  const filteredOrders = orders.filter((order) => {
    const isInDateRange = !dateRange[0] || (dayjs(order.payTime).isBetween(dateRange[0], dateRange[1], null, '[]'));
    const hasBookTitle = order.orderItems.some((item) => {
      const book = getBookById(item.bookId);
      return book ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    });
    return isInDateRange && (hasBookTitle || !searchTerm);
  });

  // Calculate statistics
  const bookStatistics = {};
  let totalBooks = 0;
  let totalAmount = 0;

  filteredOrders.forEach((order) => {
    order.orderItems.forEach((item) => {
      const book = getBookById(item.bookId);
      if (book) {
        if (!bookStatistics[book.title]) {
          bookStatistics[book.title] = {
            quantity: 0,
            totalPrice: 0,
          };
        }
        bookStatistics[book.title].quantity += item.bookNum;
        bookStatistics[book.title].totalPrice += book.price * item.bookNum;
        totalBooks += item.bookNum;
        totalAmount += book.price * item.bookNum;
      }
    });
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
      <div className="w-full flex justify-between mb-4">
        <div className="w-48 mr-2">
          <RangePicker
            onChange={(dates) => setDateRange(dates)}
            format="YYYY-MM-DD"
          />
        </div>
        <Search
          placeholder="Search by book title"
          onSearch={(value) => setSearchTerm(value)}
          style={{ width: 200 }}
        />
      </div>
      <div className="w-full flex">
        <div className="w-1/2 pr-2">
          <Table
            columns={columns}
            dataSource={filteredOrders}
            expandable={{ expandedRowRender }}
            rowKey="id"
          />
        </div>
        <div className="w-1/2 pl-2">
          <div className="mb-4">
            <h3>Total Books: {totalBooks}</h3>
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          </div>
          <Table
            columns={[
              { title: "Book Title", dataIndex: "title", key: "title" },
              { title: "Quantity", dataIndex: "quantity", key: "quantity" },
              {
                title: "Total Price",
                dataIndex: "totalPrice",
                key: "totalPrice",
                render: (text) => `$${text.toFixed(2)}`,
              },
            ]}
            dataSource={Object.keys(bookStatistics).map((title) => ({
              title,
              quantity: bookStatistics[title].quantity,
              totalPrice: bookStatistics[title].totalPrice,
            }))}
            pagination={false}
            rowKey="title"
          />
        </div>
      </div>
    </div>
  );
}

export default MainParcel;
