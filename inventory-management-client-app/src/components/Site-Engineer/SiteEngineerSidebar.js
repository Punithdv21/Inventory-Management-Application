import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  FileOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import './SiteEngineerSidebar.css';

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className="custom-sidebar">
      <div className="logo">Logo</div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/home">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<AppstoreOutlined />}>
          <Link to="/site-inventory">Inventory Management</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<FileOutlined />}>
          <Link to="/site-labor">Labor Management</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<SettingOutlined />}>
          <Link to="/reports">Reports</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
