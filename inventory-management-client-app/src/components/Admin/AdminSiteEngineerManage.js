import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Layout, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons'; // Import PlusOutlined icon
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import EngineerModal from '../Admin/EngineerModal';
import Sidebar from './Sidebar';
import './AdminSiteEngineerManage.css';

const { Content } = Layout;

function AdminSiteEngineerManage() {
    const [engineers, setEngineers] = useState([]);
    const [selectedEngineerId, setSelectedEngineerId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [initialFormValues, setInitialFormValues] = useState(null);
    const API = process.env.REACT_APP_API;

    useEffect(() => {
        axios
            .get(`${API}engineers`)
            .then((response) => {
                setEngineers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching engineer data:', error);
            });
    }, [API]);

    const handleEngineerUpdate = (engineerUpdateId) => {
        setSelectedEngineerId(engineerUpdateId);
        const selectedEngineer = engineers.find((engineer) => engineer._id === engineerUpdateId);
        setInitialFormValues(selectedEngineer);
        setModalIsOpen(true);
    };

    const handleFormSubmit = (values) => {
        if (selectedEngineerId) {
            axios
                .put(`${API}engineers/${selectedEngineerId}`, values)
                .then((response) => {
                    setEngineers((prevEngineers) =>
                        prevEngineers.map((engineer) =>
                            engineer._id === selectedEngineerId ? response.data : engineer
                        )
                    );
                    message.success('Engineer Details are Updated Successfully');
                })
                .catch((error) => {
                    console.error('Error updating engineer:', error);
                    message.error('Error updating engineer. Please try again.');
                });
        } else {
            axios
                .post(`${API}engineers`, values)
                .then((response) => {
                    setEngineers((prevEngineers) => [...prevEngineers, response.data]);
                    message.success('Engineer Details are Saved Successfully');
                })
                .catch((error) => {
                    console.error('Error creating engineer:', error);
                    message.error('Error creating engineer. Please try again.');
                });
        }

        setSelectedEngineerId(null);
        setModalIsOpen(false);
    };

    const handleDeleteEngineer = (engineerId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this Engineer?',
            onOk: () => {
                axios
                    .delete(`${API}engineers/${engineerId}`)
                    .then(() => {
                        setEngineers((prevEngineers) =>
                            prevEngineers.filter((engineer) => engineer._id !== engineerId)
                        );
                        message.success('Engineer deleted successfully');
                    })
                    .catch((error) => {
                        console.error('Error deleting engineer:', error);
                        message.error('Error deleting engineer. Please try again.');
                    });
            },
        });
    };

    const columns = [
        { title: 'Sl', dataIndex: 'key', key: 'key' },
        { title: 'Engineer Name', dataIndex: 'engineerName', key: 'engineerName' },
        { title: 'Email', dataIndex: 'engineerEmail', key: 'engineerEmail' },
        { title: 'Specialization', dataIndex: 'engineerSpecialization', key: 'engineerSpecialization' },
        { title: 'Site Location', dataIndex: 'engineerSiteLocation', key: 'engineerSiteLocation' },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <span>
                    <Button type="link" onClick={() => handleEngineerUpdate(record._id)}>
                        Update
                    </Button>
                    <Button type="link" onClick={() => handleDeleteEngineer(record._id)}>
                        Delete
                    </Button>
                </span>
            ),
        },
    ];

    const data = engineers.map((engineer, idx) => ({
        key: idx + 1,
        _id: engineer._id,
        engineerName: engineer.engineerName,
        engineerEmail: engineer.engineerEmail,
        engineerSpecialization: engineer.engineerSpecialization,
        engineerSiteLocation: engineer.engineerSiteLocation,
    }));

    return (
        <Layout className="admin-site-engineer-manage">
            <Sidebar />

            <Layout className="main-content">
                <AdminNavbar />

                <Content className="admin-engineer-manager">
                    <div className="admin-engineer-manager-header">
                        <h1 className="admin-engineer-manager-data-title">ALL ENGINEERS</h1>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />} // Add PlusOutlined icon
                            onClick={() => {
                                setInitialFormValues(null);
                                setSelectedEngineerId(null);
                                setModalIsOpen(true);
                            }}
                        >
                            Add Engineer
                        </Button>
                    </div>

                    <Table columns={columns} dataSource={data} pagination={false} />
                </Content>
            </Layout>

            <EngineerModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onSubmit={handleFormSubmit}
                initialValues={initialFormValues}
            />
        </Layout>
    );
}

export default AdminSiteEngineerManage;
