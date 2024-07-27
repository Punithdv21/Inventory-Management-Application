import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { FaBox, FaUsers, FaFileAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AdminNavbar from '../Admin/AdminNavbar'; // Assuming AdminNavbar is correctly imported
import './SiteEngineerDashboard.css'; // Import CSS file

const { Sider, Content } = Layout;

const SiteEngineerDashboard = () => {
    const navigate = useNavigate();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<FaBox />}>
                        <Link to="/site-inventory">MANAGE INVENTORY</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<FaUsers />}>
                        <Link to="/site-labor">MANAGE LABOR</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FaFileAlt />}>
                        <Link to="/site-reports">VIEW REPORTS</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <AdminNavbar/>
                <Content className="site-layout-background">
                    <h1 className="site-engineer-dashboard-title">MAIN MENU</h1>
                    <div className="site-engineer-dashboard-buttons">
                        <Button
                            className="site-engineer-dashboard-button"
                            onClick={() => navigate('/site-inventory')}
                        >
                            <FaBox className="site-engineer-dashboard-button-icon" />
                            <span>Manage Inventory</span>
                        </Button>
                        <Button
                            className="site-engineer-dashboard-button"
                            onClick={() => navigate('/site-labor')}
                        >
                            <FaUsers className="site-engineer-dashboard-button-icon" />
                            <span>Manage Labor</span>
                        </Button>
                        <Button
                            className="site-engineer-dashboard-button"
                            onClick={() => navigate('/site-reports')}
                        >
                            <FaFileAlt className="site-engineer-dashboard-button-icon" />
                            <span>View Reports</span>
                        </Button>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default SiteEngineerDashboard;
