import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Input, InputNumber, Space, Layout, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from '../Admin/AdminNavbar';
import Sidebar from './SiteEngineerSidebar';
import './LaborManagement.css';

const { Content } = Layout;
const { Title } = Typography;

const SiteEngineerLaborManagement = () => {
  const [labors, setLabors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLabor, setSelectedLabor] = useState(null);
  const [form] = Form.useForm();
  const API = process.env.REACT_APP_API; // Replace with your actual API endpoint

  useEffect(() => {
    fetchLabors();
  }, []);

  const fetchLabors = async () => {
    try {
      const response = await axios.get(`${API}labors`);
      setLabors(response.data);
    } catch (error) {
      console.error('Error fetching labor data:', error);
    }
  };

  const handleAddLaborClick = () => {
    setSelectedLabor(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (selectedLabor && selectedLabor._id) {
        await axios.put(`${API}labors/${selectedLabor._id}`, values);
        setLabors((prevLabors) =>
          prevLabors.map((labor) =>
            labor._id === selectedLabor._id ? { ...labor, ...values } : labor
          )
        );
        toast.success('Labor updated successfully');
      } else {
        const response = await axios.post(`${API}labors`, values);
        setLabors((prevLabors) => [...prevLabors, response.data]);
        toast.success('Labor created successfully');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving labor:', error);
      toast.error('Error saving labor. Please try again.');
    }
  };

  const handleEditLabor = (labor) => {
    setSelectedLabor(labor);
    form.setFieldsValue(labor);
    setIsModalOpen(true);
  };

  const handleDeleteLabor = async (laborId) => {
    if (window.confirm('Are you sure you want to delete this labor?')) {
      try {
        await axios.delete(`${API}labors/${laborId}`);
        setLabors((prevLabors) => prevLabors.filter((labor) => labor._id !== laborId));
        toast.success('Labor deleted successfully');
      } catch (error) {
        console.error('Error deleting labor:', error);
        toast.error('Error deleting labor. Please try again.');
      }
    }
  };

  const columns = [
    {
      title: 'SL',
      dataIndex: 'sl',
      key: 'sl',
      align: 'center',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Labor Name',
      dataIndex: 'laborName',
      key: 'laborName',
      align: 'center',
    },
    {
      title: 'Labor Count',
      dataIndex: 'laborCount',
      key: 'laborCount',
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditLabor(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDeleteLabor(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout className='site-layout'>
        <AdminNavbar />
        <Content className='content'>
          <div className='content-header'>
            <Title level={2} style={{ color: '#1890ff', marginBottom: 0 }}>Labor Management</Title>
            <div className='button-container'>
              <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={handleAddLaborClick}
              >
                Add New Labor
              </Button>
            </div>
          </div>
          <div className='table-container'>
            <Table
              dataSource={labors}
              columns={columns}
              rowKey='_id'
              pagination={false}
            />
          </div>
          <Modal
            title={selectedLabor ? 'Edit Labor' : 'Add New Labor'}
            visible={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={() => form.submit()}
            okText="Save"
            cancelText="Cancel"
          >
            <Form
              form={form}
              layout='vertical'
              onFinish={handleFormSubmit}
              initialValues={{
                laborName: '',
                laborCount: 0,
                ...selectedLabor
              }}
            >
              <Form.Item
                name='laborName'
                label='Labor Name'
                rules={[{ required: true, message: 'Please enter labor name' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='laborCount'
                label='Labor Count'
                rules={[{ required: true, message: 'Please enter labor count' }]}
              >
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Form>
          </Modal>
          <ToastContainer />
        </Content>
      </Layout>
    </Layout>
  );
}

export default SiteEngineerLaborManagement;

