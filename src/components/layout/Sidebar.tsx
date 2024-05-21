import React from "react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  HomeOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  PlusOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Link, NavLink } from "react-router-dom";
import Title from "antd/es/typography/Title";

const menuItems = [
  {
    key: "Dashboard",
    icon: React.createElement(HomeOutlined),
    label: <NavLink to="/">Dashboard</NavLink>,
  },
  {
    key: "Eye Glasses",
    icon: React.createElement(ProductOutlined),
    label: "Eye Glasses",
    children: [
      {
        key: "add-eyeglasses",
        icon: React.createElement(PlusOutlined),
        label: <NavLink to="/dashboard/add-eyeglasses">Add Eyeglasses</NavLink>,
      },
      {
        key: "eyeglasses",
        icon: React.createElement(ShoppingOutlined),
        label: (
          <NavLink to="/dashboard/eyeglassesList">Eyeglasses List</NavLink>
        ),
      },
    ],
  },
  {
    key: 3,
    icon: React.createElement(ShoppingCartOutlined),
    label: <NavLink to="/sales">Sales</NavLink>,
  },
];

const Sidebar = () => {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div
        className="demo-logo-vertical"
        style={{
          color: "white",
          padding: "10px 5px",
        }}
      >
        <Link to="/">
          <Title
            level={3}
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            LenseHub
          </Title>
        </Link>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
