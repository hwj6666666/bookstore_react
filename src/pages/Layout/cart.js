import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts } from "@/store/modules/cart";
import { Table, Button, Checkbox, message } from "antd";
import { fetchBooks } from "@/store/modules/book";

function MainCart() {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const id = localStorage.getItem("id");
  const dispatch = useDispatch();

  const carts = useSelector((state) => state.cart.carts);
  const books = useSelector((state) => state.book.books);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchCarts(id));
  }, [dispatch]);

  const dataSource = carts.map((cart) => {
    const book = books.find((b) => b.id === cart.bookId);
    if (!book) return null;
    return {
      id: cart.id,
      cover: book.imageBase64,
      name: book.title,
      price: book.price,
      quantity: cart.bookNum,
      total: (book.price * cart.bookNum).toFixed(2),
      addTime: new Date(cart.addTime).toLocaleString(),
    };
  });

  const columns = [
    {
      title: "Cover",
      dataIndex: "cover",
      key: "cover",
      render: (text) => (
        <img src={text} alt="cover" style={{ width: "50px" }} />
      ),
    },
    {
      title: "Book Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Add Time",
      dataIndex: "addTime",
      key: "addTime",
    },
    {
      title: "Select",
      dataIndex: "id",
      key: "select",
      render: (text, record) => (
        <Checkbox onChange={(e) => handleSelect(record.id, e.target.checked)} />
      ),
    },
  ];

  const handleSelect = (id, checked) => {
    if (checked) {
      setSelectedKeys((prevKeys) => [...prevKeys, id]);
    } else {
      setSelectedKeys((prevKeys) => prevKeys.filter((key) => key !== id));
    }
  };

  const handleRemove = () => {
    fetch("http://localhost:8080/carts/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedKeys),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        dispatch(fetchCarts(id));
        message.success("Remove successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const userId = localStorage.getItem("id");
  const handlePay = () => {
    console.log("Pay", selectedKeys);
    fetch("http://localhost:8080/orders/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedKeys, userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          dispatch(fetchCarts(id));
          handleRemove();
          message.success("Pay successfully");
        } else {
          message.error("Not enough stock");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="w-full h-full">
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <Button
        className="rounded-lg border border-white text-black w-1/2 h-12 hover:bg-header-purple"
        onClick={handleRemove}
      >
        Remove
      </Button>
      <Button
        className="rounded-lg border border-white text-black w-1/2 h-12 hover:bg-header-purple"
        onClick={handlePay}
      >
        Pay
      </Button>
    </div>
  );
}

export default MainCart;
