import React, { useState, useEffect } from "react";
import { Modal,Table, Button } from "antd";

function MainCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from local storage or server
    // This is just a placeholder, replace it with your actual code
    setCartItems([
      { id: 1, name: "Item 1", price: 10, quantity: 1 },
      { id: 2, name: "Item 2", price: 20, quantity: 2 },
    ]);
  }, []);

  const handleRemove = (id) => {
    // Remove the item with the given id from the cart
    setCartItems(cartItems.filter((item) => item.id !== id));
  };


const handlePay = (id) => {
  Modal.confirm({
    title: 'Choose Payment Method',
    content: 'Please choose your preferred payment method.',
    okText: 'Paypal',
    cancelText: 'Credit Card',
    onOk() {
      console.log('Chose Paypal');
    },
    onCancel() {
      console.log('Chose Credit Card');
    },
  });
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button onClick={() => handleRemove(record.key)}>Remove</Button>
        <Button  style={{ marginLeft: '10px' }} onClick={() => handlePay(record.key)}>Pay</Button>
      </span>
    ),
  },

];

return (
  <div>
    <h1>Cart</h1>
    <Table columns={columns} dataSource={cartItems} rowKey="id" />
  </div>
);
}

export default MainCart;
