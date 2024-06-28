import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Input, Modal, Form, message } from "antd";
import { fetchBooks } from "@/store/modules/book";

const { Search } = Input;

function BookManage() {
  const { books } = useSelector((state) => state.book);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const pageSize = 8;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // 过滤书籍列表
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 根据分页显示的书籍
  const booksToShow = filteredBooks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 处理搜索
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // 处理编辑
  const handleEdit = (book) => {
    setEditingBook(book);
    setIsModalVisible(true);
  };

  // 处理删除
  const handleDelete = (bookId) => {
    fetch("http://localhost:8080/books/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `bookId=${bookId}`,
    })
      .then((response) => response.json())
      .then((data) => {
        message.success("Delete successfully");
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        dispatch(fetchBooks());
      });
  };

  // 处理新增
  const handleAddNew = () => {
    setEditingBook(null);
    setIsModalVisible(true);
  };

  // 处理确认提交
  const handleOk = (values) => {
    if (editingBook) {
      // 更新书籍信息
      fetch("http://localhost:8080/books/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(() => {
        message.success("Update successfully");
        dispatch(fetchBooks());
      });
    } else {
      // 新增书籍
      fetch("http://localhost:8080/books/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then(() => {
        message.success("Add successfully");
        dispatch(fetchBooks());
      });
    }
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "imageBase64",
      key: "image",
      render: (text, record) => (
        <img
          src={record.imageBase64}
          alt={record.title}
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Author", dataIndex: "author", key: "author" },
    { title: "ISBN", dataIndex: "isbn", key: "isbn" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* 搜索框 */}
      <Search
        placeholder="Search by title"
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 20 }}
      />
      <Button
        type="primary"
        onClick={handleAddNew}
        className="ml-5 border-white"
      >
        Add New Book
      </Button>
      {/* 书籍列表 */}
      <Table
        className="w-full"
        columns={columns}
        dataSource={booksToShow}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize,
          total: filteredBooks.length,
          onChange: (page) => setCurrentPage(page),
        }}
      />
      {/* 编辑或新增书籍的模态框 */}
      <Modal
        title={editingBook ? "Edit Book" : "Add Book"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form initialValues={editingBook} onFinish={handleOk}>
          <Form.Item name="id" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: "Please input the author!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ISBN"
            name="isbn"
            rules={[{ required: true, message: "Please input the ISBN!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Stock"
            name="stock"
            rules={[{ required: true, message: "Please input the stock!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Image"
            name="imageBase64"
            rules={[{ required: true, message: "Please input the image!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              className="border-black text-black"
              type="primary"
              htmlType="submit"
            >
              {editingBook ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default BookManage;
