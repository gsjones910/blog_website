import React from "react";
import {
  LogoutOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

const MenuComponent = ({ collapsed }) => {
  const logOutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        items={[
          {
            key: "1",
            icon: <UserOutlined />,
            label: <a href="/">Dashboard</a>,
          },
          {
            key: "2",
            icon: <VideoCameraOutlined />,
            label: <a href="/article/upload">Create New Blog</a>,
          },
          {
            key: "3",
            icon: <LogoutOutlined />,
            label: <div onClick={() => logOutHandler()}>Log out</div>,
          },
        ]}
      />
    </Sider>
  );
};

export default MenuComponent;
