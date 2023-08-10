import React, { useEffect, useState } from "react";
import { LockOutlined, UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios from "axios";

const ArticleUpload = () => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/upload`,
        { title, content, category, price },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{marginTop:"20px"}}>
      <Form
        form={form}
        layout="vertical"
        name="horizontal_login"
        onFinish={handleSubmit}
        style={{
            maxWidth: 800,
            margin: "auto",
            width:"90%"
        }}
      >
        <div onClick={() => window.history.back()}><ArrowLeftOutlined style={{marginRight:"10px"}}/>Back</div>
        <h2 style={{textAlign:"center"}}>Create New Article</h2>
        <Form.Item>
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ArticleUpload;
