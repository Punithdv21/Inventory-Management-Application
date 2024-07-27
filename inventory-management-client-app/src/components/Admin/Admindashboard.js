import React from "react";
import { Layout, Menu, Button } from "antd";
import {
  FaUsers,
  FaBuilding,
  FaBoxes,
  FaUserTie,
  FaFileAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "./Admindashboard.css";

const { Sider, Content } = Layout;

const Admindashboard = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh", }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<FaUsers />}>
            <Link to="/Adminstaff">MANAGE STAFF</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FaBuilding />}>
            <Link to="/Adminsite">MANAGE SITE</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FaBoxes />}>
            <Link to="/Admininventory">MANAGE INVENTORIES</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<FaUserTie />}>
            <Link to="/admin-labour">MANAGE LABOUR AND PAYMENTS</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<FaFileAlt />}>
            <Link to="/admingenrep">GENERATE REPORTS</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <AdminNavbar />
        <Content className="site-layout-background">
          <h1 className="admin-dashboard-title">ADMIN DASHBOARD</h1>
          <div className="admin-dashboard-buttons">
            <Button
              className="admin-dashboard-button"
              onClick={() => navigate("/Adminstaff")}
            >
              <FaUsers className="admin-dashboard-button-icon" />
              <span>Manage Staff</span>
            </Button>
            <Button
              className="admin-dashboard-button"
              onClick={() => navigate("/Adminsite")}
            >
              <FaBuilding className="admin-dashboard-button-icon" />
              <span>Manage Site</span>
            </Button>
            <Button
              className="admin-dashboard-button"
              onClick={() => navigate("/Admininventory")}
            >
              <FaBoxes className="admin-dashboard-button-icon" />
              <span>Manage Inventories</span>
            </Button>
            <Button
              className="admin-dashboard-button"
              onClick={() => navigate("/admin-labour")}
            >
              <FaUserTie className="admin-dashboard-button-icon" />
              <span>Manage Labour & <div> Payments </div></span>
            </Button>
            <Button
              className="admin-dashboard-button"
              onClick={() => navigate("/admingenrep")}
            >
              <FaFileAlt className="admin-dashboard-button-icon" />
              <span>Generate Reports</span>
            </Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admindashboard;
