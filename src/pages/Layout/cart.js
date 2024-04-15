import React, { useState, useEffect } from "react";
import { Modal, Table, Button, Input } from "antd";

function MainCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems([
      {
        id: 1,
        name: "Harry Potter and the Philosopher's Stone",
        price: 10,
        amount: 5,
        cover: "/hp1.jpg",
      },
      {
        id: 2,
        name: "Harry Potter and the Chamber of Secrets",
        price: 20,
        amount: 2,
        cover: "/hp2.jpg",
      },
      {
        id: 2,
        name: "Harry Potter and the Prisoner of Azkaban",
        price: 20,
        amount: 8,
        cover: "/hp3.jpg",
      },
      {
        id: 2,
        name: "Harry Potter and the Order of the Phoenix",
        price: 20,
        amount: 9,
        cover: "/hp4.jpg",
      },
      {
        id: 2,
        name: "Harry Potter and the Goblet of Fire",
        price: 20,
        amount: 1,
        cover: "/hp5.jpg",
      },
    ]);
  }, []);

  const handleRemove = (id) => {
    // Remove the item with the given id from the cart
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

const handlePay = (id) => {
  Modal.info({
    title: "Choose Payment Method",
    okText: "Cancel",
    okButtonProps: { style: { color: "black" } },
    content: (
      <div>
        <Button onClick={() => showPaymentCode("alipay")}>Alipay</Button>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={() => showPaymentCode("wechat")}
        >
          WeChat Pay
        </Button>
      </div>
    ),
  });
};

const showPaymentCode = (method) => {
  let paymentImage;
  if (method === "alipay") {
    paymentImage = <img src="path/to/alipay/image.jpg" alt="Alipay QR Code" />;
  } else if (method === "wechat") {
    paymentImage = (
      <img src="path/to/wechat/image.jpg" alt="WeChat Pay QR Code" />
    );
  }

  Modal.info({
    title: `${method} Payment QR Code`,
    okText: "Cancel",
    okButtonProps: { style: { color: "black" } },
    content: paymentImage,
  });
};

const columns = [
  {
    title: "Cover",
    dataIndex: "cover",
    key: "cover",
    render: (text, record) => (
      <img
        src={record.cover}
        alt="Cover"
        style={{ width: "50px", height: "50px" }}
      />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <Button onClick={() => handleRemove(record.key)}>Remove</Button>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={() => handlePay(record.key)}
        >
          Pay
        </Button>
      </span>
    ),
  },
];

return (
  <div>
    <h1 className="">Cart</h1>
    <div className="flex justify-center my-4">
      {/* <Input.Search placeholder="Search..." style={{ width: 200 }} /> */}
      <Input.Search></Input.Search>
    </div>
    <Table columns={columns} dataSource={cartItems} rowKey="id" />
  </div>
);
}

export default MainCart;
