import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Card } from "antd";

function BookInfo() {
  const { id } = useParams();
  const book = useSelector((state) =>
    state.book.book.find((b) => b.id === Number(id))
  );

  return (
    <div className="w-full h-full flex flex-row">
      <div className="w-1/3 flex flex-col ">
        <img className="w-full " alt={book.name} src={book.picture} />
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
          <p>ISBN: {book.ISBN}</p>
          <p>Remaining: {book.remaining}</p>


        </Card>
        <div >
          <button
            className="rounded-lg border border-white text-white w-1/2 h-12 hover:bg-header-purple"
            onClick={() => {
              /* Add to cart function */
            }}
          >
            Add to Cart
          </button>
          <button
            className="rounded-lg border border-white text-white w-1/2 h-12 hover:bg-header-purple"
            onClick={() => {
              /* Buy now function */
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookInfo;
