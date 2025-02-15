import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Pagination, Input } from "antd";
import { useNavigate } from "react-router-dom";
import MyChart from "@/components/rankChart";
import BookCarousel from "@/components/bookCarousel";
import { fetchBooks } from "@/store/modules/book";

function MainBookstore() {
  const { books } = useSelector((state) => state.book);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 8;

  const handleChange = (page) => {
    setCurrentPage(page);
  };
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // 根据搜索关键字过滤书籍列表
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 分页显示过滤后的书籍列表
  const booksToShow = filteredBooks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (!books) return <div>Loading</div>;

  return (
    <div className="border border-black flex w-full h-full">
      {/* <BookCarousel/> */}
      <div className="flex flex-col items-center w-1/2 h-1/2 box-content">
        <Input.Search
          className="mt-8 w-2/3"
          placeholder="Search for your favorite books"
          onSearch={(value) => {
            setSearchTerm(value);
            setCurrentPage(1); // 搜索后重置当前页码
          }}
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
                    alt={item.title}
                    src={item.imageBase64}
                  />
                }
              >
                <Card.Meta
                  className="text-center"
                  title={item.title}
                  description={`Price: ${item.price} Stock: ${item.stock}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
        <div className="mb-0 flex justify-center backdrop-blur-md bg-white bg-opacity-50">
          <Pagination
            current={currentPage}
            onChange={handleChange}
            total={filteredBooks.length}
            pageSize={pageSize}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}

export default MainBookstore;
