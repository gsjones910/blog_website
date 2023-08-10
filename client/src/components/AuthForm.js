import React, { useState } from "react";
import axios from "axios";
import { Typography, Form, Input, Button, Checkbox, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const { Title } = Typography;

const AuthForm = ({ authType }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/${authType}`,{ username, password });
      if (authType == "login") {
        const token = response.data.token;
        localStorage.setItem("token", token);
        window.location.href ="/";
      }else{
          window.location.href ="/login";
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    console.log("Handle password recovery logic here");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <Card style={{ width: 500 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title level={2}>{authType === "signup" ? "Register" : "Login"} </Title>
        </div>
        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={handleSubmit}>
          <Form.Item>
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username" value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a style={{ float: "right" }} className="login-form-forgot" href="" onClick={handleForgotPassword}>Forgot password</a>
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block>
              {authType === "signup" ? "SignUp" : "Login"}
            </Button>
            Don't have an account{" "}
            <a href={authType === "signup" ? "login" : "signup"}>
              {authType === "signup" ? "Login" : "SignUp"}
            </a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AuthForm;
