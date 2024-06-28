import React, { useState } from "react";
import { Form, Input, Button, Card, message, Modal } from "antd";
import { useDispatch } from "react-redux";
import { fetchLogin } from "@/store/modules/user";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginFinish = async (values) => {
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    if (result.code === 0) {
      message.error(result.message);
    } else {
      message.success(result.message);

      if (result.data === 1) {
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("id", result.code);
        navigate("/");
      } else {
        localStorage.setItem("isManager", true);
        navigate("/manage");
      }
    }
  };

  const handleRegisterFinish = async (values) => {
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    if (result.code === 0) {
      message.error(result.message);
    } else {
      message.success("Sign up successfully!");
      setIsModalVisible(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card title="Login" style={{ width: 300 }}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleLoginFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ backgroundColor: "blue" }}
            >
              Log in
            </Button>
            <Link
              className="ml-5 underline"
              onClick={() => setIsModalVisible(true)}
            >
              Sign up now!
            </Link>
          </Form.Item>
        </Form>
      </Card>

      <Modal
        title="Register"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          name="register"
          className="register-form"
          onFinish={handleRegisterFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your Password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input type="password" placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
              { required: true, message: "Please input your E-mail!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ backgroundColor: "blue" }}
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
