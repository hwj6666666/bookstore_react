import MyChart from "@/components/rankChart";
import React from "react";
import { useState, useEffect } from "react";
import { Modal, Table, Button } from "antd";

function MainParcel() {
  // const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   // Fetch cart items from local storage or server
  //   // This is just a placeholder, replace it with your actual code
  //   setCartItems([
  //     { id: 1, name: "Item 1", price: 10, quantity: 1 },
  //     { id: 2, name: "Item 2", price: 20, quantity: 2 },
  //   ]);
  // }, []);

  // const handleRemove = (id) => {
  //   // Remove the item with the given id from the cart
  //   setCartItems(cartItems.filter((item) => item.id !== id));
  // };

  // const columns = [
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Quantity",
  //     dataIndex: "quantity",
  //     key: "quantity",
  //   },

  //   {
  //     title: "Time",
  //   },

  //   {
  //     title: "Total Price",
  //     dataIndex: "Total price",
  //     key: "price",
  //   },
  //   {
  //     title: "status",
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (text, record) => (
  //       <span>
  //         <Button onClick={() => handleRemove(record.key)}>Remove</Button>
  //       </span>
  //     ),
  //   },
  // ];

  return (
    <div>
      {/* <h1 className="">Cart</h1>
      <Table columns={columns} dataSource={cartItems} rowKey="id" /> */}
    </div>
  );
}

export default MainParcel;
