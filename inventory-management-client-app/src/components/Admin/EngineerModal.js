import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './EngineerModal.css';

const EngineerModal = ({ isOpen, onRequestClose, onSubmit, initialValues }) => {
    const formik = useFormik({
        initialValues: initialValues || {
            engineerName: '',
            engineerEmail: '',
            engineerPassword: '',
            engineerSpecialization: '',
            engineerOfficeLocation: '',
        },
        validationSchema: Yup.object({
            engineerName: Yup.string().required('Engineer Name is required'),
            engineerEmail: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            engineerPassword: Yup.string().required('Password is required'),
            engineerSpecialization: Yup.string().required('Specialization is required'),
            engineerOfficeLocation: Yup.string().required('Office Location is required'),
        }),
        onSubmit: (values) => {
            onSubmit(values);
            formik.resetForm();
            onRequestClose();
        },
    });

    return (
        <Modal
            title={initialValues ? 'Update Engineer' : 'Add Engineer'}
            visible={isOpen}
            onCancel={onRequestClose}
            footer={null}
            className="engineer-modal"
            destroyOnClose={true}
            maskClosable={false}
        >
            <Form layout="vertical" onSubmit={formik.handleSubmit}>
                <Form.Item
                    label="Engineer Name"
                    validateStatus={formik.touched.engineerName && formik.errors.engineerName ? 'error' : ''}
                    help={formik.touched.engineerName && formik.errors.engineerName ? formik.errors.engineerName : ''}
                >
                    <Input
                        placeholder="Enter Engineer Name"
                        {...formik.getFieldProps('engineerName')}
                    />
                </Form.Item>

                <Form.Item
                    label="Email"
                    validateStatus={formik.touched.engineerEmail && formik.errors.engineerEmail ? 'error' : ''}
                    help={formik.touched.engineerEmail && formik.errors.engineerEmail ? formik.errors.engineerEmail : ''}
                >
                    <Input
                        type="email"
                        placeholder="Enter Email"
                        {...formik.getFieldProps('engineerEmail')}
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    validateStatus={formik.touched.engineerPassword && formik.errors.engineerPassword ? 'error' : ''}
                    help={formik.touched.engineerPassword && formik.errors.engineerPassword ? formik.errors.engineerPassword : ''}
                >
                    <Input.Password
                        placeholder="Enter Password"
                        {...formik.getFieldProps('engineerPassword')}
                    />
                </Form.Item>

                <Form.Item
                    label="Specialization"
                    validateStatus={formik.touched.engineerSpecialization && formik.errors.engineerSpecialization ? 'error' : ''}
                    help={formik.touched.engineerSpecialization && formik.errors.engineerSpecialization ? formik.errors.engineerSpecialization : ''}
                >
                    <Input
                        placeholder="Enter Specialization"
                        {...formik.getFieldProps('engineerSpecialization')}
                    />
                </Form.Item>

                <Form.Item
                    label="Office Location"
                    validateStatus={formik.touched.engineerOfficeLocation && formik.errors.engineerOfficeLocation ? 'error' : ''}
                    help={formik.touched.engineerOfficeLocation && formik.errors.engineerOfficeLocation ? formik.errors.engineerOfficeLocation : ''}
                >
                    <Input
                        placeholder="Enter Office Location"
                        {...formik.getFieldProps('engineerOfficeLocation')}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block className="submit-button">
                        {initialValues ? 'Update Engineer' : 'Add Engineer'}
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button onClick={onRequestClose} block className="close-button">
                        Close
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EngineerModal;
