import React, { useState, useEffect } from 'react';
import { Layout, Button, Table, Modal, message } from 'antd';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import SiteModal from './SiteModal';
import Sidebar from './Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SiteManagment.css'; // Ensure the file name and path are correct
import { PlusOutlined } from '@ant-design/icons';

const { Content } = Layout;

function SiteManagement() {
    const [sites, setSites] = useState([]);
    const [selectedSite, setSelectedSite] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const API = process.env.REACT_APP_API;

    useEffect(() => {
        fetchSites();
    }, []);

    const fetchSites = () => {
        axios
            .get(`${API}sites`)
            .then((response) => {
                setSites(response.data);
            })
            .catch((error) => {
                console.error('Error fetching site data:', error);
            });
    };

    const handleAddSiteClick = () => {
        setSelectedSite(null);
        setIsModalOpen(true);
    };

    const handleFormSubmit = (values) => {
        if (selectedSite && selectedSite._id) {
            axios
                .put(`${API}sites/${selectedSite._id}`, values)
                .then((response) => {
                    setSites((prevSites) =>
                        prevSites.map((site) =>
                            site._id === selectedSite._id ? response.data : site
                        )
                    );
                    message.success('Site updated successfully');
                })
                .catch((error) => {
                    console.error('Error updating site:', error);
                    message.error('Error updating site. Please try again.');
                });
        } else {
            axios
                .post(`${API}sites`, values)
                .then((response) => {
                    setSites((prevSites) => [...prevSites, response.data]);
                    message.success('Site created successfully');
                })
                .catch((error) => {
                    console.error('Error creating site:', error);
                    message.error('Error creating site. Please try again.');
                });
        }

        setIsModalOpen(false);
    };

    const handleEditSite = (siteId) => {
        const selected = sites.find((site) => site._id === siteId);
        setSelectedSite(selected);
        setIsModalOpen(true);
    };

    const handleDeleteSite = (siteId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this site?',
            onOk: () => {
                axios
                    .delete(`${API}sites/${siteId}`)
                    .then(() => {
                        setSites((prevSites) => prevSites.filter((site) => site._id !== siteId));
                        message.success('Site deleted successfully');
                    })
                    .catch((error) => {
                        console.error('Error deleting site:', error);
                        message.error('Error deleting site. Please try again.');
                    });
            },
        });
    };

    const columns = [
        { title: 'Sl', dataIndex: 'key', key: 'key' },
        { title: 'Site Name', dataIndex: 'siteName', key: 'siteName' },
        { title: 'Site Address', dataIndex: 'siteAddress', key: 'siteAddress' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" onClick={() => handleEditSite(record._id)}>
                        ✏️
                    </Button>
                    <Button type="link" onClick={() => handleDeleteSite(record._id)} style={{ marginLeft: '10px' }}>
                        🗑️
                    </Button>
                </span>
            ),
        },
    ];

    const data = sites.map((site, index) => ({
        key: index + 1,
        _id: site._id,
        siteName: site.siteName,
        siteAddress: site.siteAddress,
    }));

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />

            <Layout className="site-layout">
                <AdminNavbar />

                <Content style={{ margin: '0 16px' }}>
                    <div className="admin-site-manage">
                        <div className="admin-site-manage-header">
                            <h1 className="admin-site-manage-title">ALL SITES</h1>
                            <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSiteClick}>
                                Add New Site
                            </Button>
                        </div>
                        <Table columns={columns} dataSource={data} pagination={false} />
                    </div>
                </Content>
            </Layout>
            <SiteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialValues={selectedSite}
                onSubmit={handleFormSubmit}
            />
            <ToastContainer />
        </Layout>
    );
}

export default SiteManagement;
