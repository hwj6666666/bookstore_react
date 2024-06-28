import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";

function UserManage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/users");
      const result = await response.json();
      if (result.code === 200) {
        setUsers(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserState = async (userId) => {
    fetch("http://localhost:8080/auth/ban", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `userId=${userId}`,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        console.log("User ban status updated:", data);
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      render: (text, record) =>
        record.state === 1
          ? "Active"
          : record.state === -1
          ? "Banned"
          : "Manager",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button
          className={`text-black border ${
            record.state === -1
              ? "border-green-500 bg-green-500"
              : record.state === 1
              ? "border-red-500 bg-red-500"
              : "border-black"
          }`}
          type="primary"
          onClick={() => updateUserState(record.id)}
          disabled={record.state === 0}
        >
          {record.state === -1
            ? "Unban"
            : record.state === 1
            ? "Ban"
            : "Manager"}
        </Button>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <Table
      className="w-full"
      columns={columns}
      dataSource={users}
      rowKey="id"
    />
  );
}

export default UserManage;
