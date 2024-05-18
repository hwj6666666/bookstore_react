import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card, message } from "antd";
import { fetchBooks } from "@/store/modules/book";

function BookInfo() {
  const { id } = useParams();
  const userId = localStorage.getItem("id");

  const book = useSelector((state) =>
    state.book.books.find((b) => b.id === Number(id))
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleAdd = () => {
    fetch(`http://localhost:8080/carts/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: book.id,
        userId: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      message.success("Add to cart successfully");
  };

  if (!book) return <div>Loading</div>;

  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-1/3 h-full flex flex-col">
        <img
          className="w-full h-2/3 object-cover"
          alt={book.title}
          src={book.imageBase64}
        />
      </div>
      <div className="w-1/3 flex flex-col">
        <Card
          title={<h2>{book.name}</h2>}
          style={{
            width: "100%",
            height: "68%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <p>Author: {book.author}</p>
          <p>Price: {book.price}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Stock: {book.stock}</p>
        </Card>
        <div>
          <button
            className="rounded-lg border border-white text-white w-1/2 h-12 hover:bg-header-purple"
            onClick={handleAdd}
          >
            Add to Cart
          </button>
          <button
            className="rounded-lg border border-white text-white w-1/2 h-12 hover:bg-header-purple"
            onClick={() => {}}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookInfo;
