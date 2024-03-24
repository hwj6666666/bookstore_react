import React, { useState, useEffect } from "react";

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

  return (
    <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => handleRemove(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MainCart;
