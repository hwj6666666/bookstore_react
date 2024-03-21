import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col, Pagination } from "antd";
import { useNavigate } from "react-router-dom";

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
    <div>
      <Row gutter={3}>
        {booksToShow.map((item) => (
          <Col span={6} key={item.id}>
            <Card
              onClick={() => navigate(`/bookstore/${item.id}`)}
              style={{ width: 250 }}
              cover={<img alt={item.name} src={item.picture} />}
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
      <Pagination
        current={currentPage}
        onChange={handleChange}
        total={book.length}
        pageSize={pageSize}
        showSizeChanger={false}
      />
    </div>
  );
}

export default MainBookstore;
