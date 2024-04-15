import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col, Pagination, Input } from "antd";
import { useNavigate } from "react-router-dom";
import MyChart from "@/components/rankChart";
import BookCarousel from "@/components/bookCarousel";

function MainBookstore() {
  const { book } = useSelector((state) => state.book);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const handleChange = (page) => {
    setCurrentPage(page);
  };
  const navigate = useNavigate();

  const booksToShow = book.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="border border-black flex w-full h-full">

      {/* <BookCarousel/> */}
      <div className="flex flex-col items-center w-1/2 h-1/2 box-content">
        <Input.Search
        className="mt-8 w-2/3"
          placeholder="Search for your favorite books"
        />
        <MyChart />
      </div>
      <div className="w-1/2 h-full flex flex-col justify-between box-content">
        <Row gutter={3}>
          {booksToShow.map((item) => (
            <Col span={6} key={item.id}>
              <Card
                className="shadow-white mt-10 ml-2 transform hover:scale-105 transition-transform duration-200"
                hoverable
                onClick={() => navigate(`/bookstore/${item.id}`)}
                cover={
                  <img
                    className="h-40 object-cover"
                    alt={item.name}
                    src={item.picture}
                  />
                }
              >
                <Card.Meta
                  className="text-center"
                  title={item.name}
                  description={`Price: ${item.price} Remaing: ${item.remaining}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
        <div className="mb-0 flex justify-center backdrop-blur-md bg-white bg-opacity-50">
          <Pagination
            current={currentPage}
            onChange={handleChange}
            total={book.length}
            pageSize={pageSize}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}

export default MainBookstore;
