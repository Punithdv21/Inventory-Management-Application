import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../Admin/AdminNavbar';
import Sidebar from './Sidebar';
import { Layout, Input, Button, Table, Modal, message } from 'antd';
import AddItemModal from './AddItemModal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AdminInventory.css';
import { PlusOutlined } from '@ant-design/icons';

const { Content } = Layout;

const AdminInventory = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const API = process.env.REACT_APP_API;

    const [searchInput, setSearchInput] = useState('');
    const sortedItems = [...inventoryItems].reverse();
    const displayedItemsSearch = sortedItems.filter((item) =>
        item.itemName.toLowerCase().includes(searchInput.toLowerCase())
    );

    useEffect(() => {
        axios
            .get(`${API}inventory`)
            .then((response) => {
                setInventoryItems(response.data);
            })
            .catch((error) => {
                console.error('Error fetching inventory data:', error);
            });
    }, [API]);

    const formik = useFormik({
        initialValues: {
            itemName: '',
            itemQuantity: '',
            itemHSN: '',
            itemPrice: '',
            itemTaxRate: '',
            itemDesc: '',
            from: '',
            to: ''
        },
        validationSchema: Yup.object({
            itemName: Yup.string().required('Item Name is required'),
            itemQuantity: Yup.number().required('Item Quantity is required'),
            itemHSN: Yup.number().required('Item HSN is required'),
            itemPrice: Yup.number().required('Item Price is required'),
            itemTaxRate: Yup.number().required('Item Tax Rate is required'),
            from: Yup.string().required('From is required'),
            to: Yup.string().required('To is required'),
        }),
        onSubmit: (values) => {
            handleFormSubmit(values);
        },
    });

    const handleItemUpdate = (itemId) => {
        setSelectedItemId(itemId);
        const selectedItem = inventoryItems.find((item) => item._id === itemId);
        formik.setValues({ ...selectedItem });
        setModalIsOpen(true);
    };

    const handleFormSubmit = (values) => {
        if (selectedItemId) {
            axios
                .put(`${API}inventory/${selectedItemId}`, values)
                .then((response) => {
                    setInventoryItems((prevItems) =>
                        prevItems.map((item) =>
                            item._id === selectedItemId ? response.data : item
                        )
                    );
                    message.success('Item updated successfully');
                    setModalIsOpen(false);
                })
                .catch((error) => {
                    console.error('Error updating item:', error);
                    message.error('Error updating item. Please try again.');
                });
        } else {
            axios
                .post(`${API}inventory`, values)
                .then((response) => {
                    setInventoryItems((prevItems) => [...prevItems, response.data]);
                    message.success('Item added successfully');
                    setModalIsOpen(false);
                })
                .catch((error) => {
                    console.error('Error adding item:', error);
                    message.error('Error adding item. Please try again.');
                });
        }

        formik.resetForm();
        setSelectedItemId(null);
    };

    const handleDeleteItem = (itemId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this item?',
            onOk: () => {
                axios
                    .delete(`${API}inventory/${itemId}`)
                    .then(() => {
                        setInventoryItems((prevItems) =>
                            prevItems.filter((item) => item._id !== itemId)
                        );
                        message.success('Item deleted successfully');
                    })
                    .catch((error) => {
                        console.error('Error deleting item:', error);
                        message.error('Error deleting item. Please try again.');
                    });
            },
        });
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout className="site-layout">
                <AdminNavbar />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="site-layout-background" style={{ padding: 24 }}>
                        <div className="admin-inventory-manage">
                            <div className="admin-inventory-manage-header">
                                <h1 className="admin-inventory-manage-title">
                                    ALL INVENTORY ITEMS
                                </h1>
                                <Button
                                    type="primary"
                                    className="admin-inventory-manage-add-button"
                                    onClick={() => setModalIsOpen(true)}
                                    icon={<PlusOutlined />}
                                >
                                    Add New Inventory Item
                                </Button>
                            </div>
                            <div className="admin-inventory-manage-data">
                                <Input
                                    placeholder="Search Item Name..."
                                    className="admin-inventory-manage-search-input"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                                <div className="table-scroll-inventory">
                                    <Table
                                        dataSource={displayedItemsSearch}
                                        rowKey={(record) => record._id}
                                        pagination={{ pageSize: 10 }}
                                    >
                                        <Table.Column
                                            title="Sl"
                                            dataIndex="_id"
                                            key="_id"
                                            render={(text, record, index) => index + 1}
                                        />
                                        <Table.Column
                                            title="Item Name"
                                            dataIndex="itemName"
                                            key="itemName"
                                        />
                                        <Table.Column
                                            title="Item Description"
                                            dataIndex="itemDesc"
                                            key="itemDesc"
                                            ellipsis
                                        />
                                        <Table.Column
                                            title="Item Quantity"
                                            dataIndex="itemQuantity"
                                            key="itemQuantity"
                                        />
                                        <Table.Column
                                            title="Item Price"
                                            dataIndex="itemPrice"
                                            key="itemPrice"
                                        />
                                        <Table.Column
                                            title="Item Tax Rate"
                                            dataIndex="itemTaxRate"
                                            key="itemTaxRate"
                                        />
                                        <Table.Column
                                            title="From"
                                            dataIndex="from"
                                            key="from"
                                        />
                                        <Table.Column
                                            title="To"
                                            dataIndex="to"
                                            key="to"
                                        />
                                        <Table.Column
                                            title="Actions"
                                            key="action"
                                            render={(text, record) => (
                                                <span>
                                                    <Button
                                                        type="link"
                                                        onClick={() =>
                                                            handleItemUpdate(record._id)
                                                        }
                                                    >
                                                        Update
                                                    </Button>
                                                    <Button
                                                        type="link"
                                                        onClick={() =>
                                                            handleDeleteItem(record._id)
                                                        }
                                                        style={{ color: 'red' }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </span>
                                            )}
                                        />
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
            <AddItemModal
                isOpen={modalIsOpen}
                onRequestClose={() => {
                    setModalIsOpen(false);
                    formik.resetForm();
                    setSelectedItemId(null);
                }}
                onSubmit={handleFormSubmit}
            />
        </Layout>
    );
};

export default AdminInventory;
