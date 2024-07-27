import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Input, Badge } from 'antd';
import { UserOutlined, BellOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import './AdminNavbar.css';

const { Header } = Layout;

const AdminNavbar = ({ isLoggedIn, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <Header className="navbar">
      <div className="navbar-left">
        {/* Content on the left side */}
      </div>
      <div className="navbar-right">
        <div className="search-container">
          <Input
            className="search-input"
            placeholder="Search..."
            prefix={<SearchOutlined />}
          />
        </div>
        <Link to="/notifications" className="navbar-link">
          <Badge count={3}>
            <BellOutlined className="navbar-icon" />
          </Badge>
        </Link>
        {isLoggedIn ? (
          <>
            <div className="user-actions">
              <UserOutlined className="navbar-icon" />
              <button onClick={handleLogout} className="logout-button">
                Logout <LogoutOutlined />
              </button>
            </div>
          </>
        ) : (
          <Link to="/adminlogin" className="navbar-link">
            <UserOutlined className="navbar-icon" />
            Login
          </Link>
        )}
      </div>
    </Header>
  );
};

export default AdminNavbar;
