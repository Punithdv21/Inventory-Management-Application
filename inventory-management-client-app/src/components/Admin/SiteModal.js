// SiteModal.js
import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './SiteModal.css';

const SiteModal = ({ isOpen, onClose, initialValues, onSubmit }) => {
    const formik = useFormik({
        initialValues: initialValues || {
            siteName: '',
            siteAddress: '',
        },
        validationSchema: Yup.object({
            siteName: Yup.string().required('Site Name is required'),
            siteAddress: Yup.string().required('Site Address is required'),
        }),
        onSubmit: (values) => {
            onSubmit(values);
            formik.resetForm();
            onClose();
        },
    });

    return (
        <Modal
            title={initialValues ? 'Update Site' : 'Add New Site'}
            visible={isOpen}
            onCancel={onClose}
            footer={null}
            centered
            className="site-modal"
        >
            <Form layout="vertical" onFinish={formik.handleSubmit} className="site-modal-form">
                <Form.Item
                    label="Site Name"
                    validateStatus={formik.touched.siteName && formik.errors.siteName ? 'error' : ''}
                    help={formik.touched.siteName && formik.errors.siteName ? formik.errors.siteName : ''}
                >
                    <Input
                        name="siteName"
                        value={formik.values.siteName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="site-modal-input"
                    />
                </Form.Item>
                <Form.Item
                    label="Site Address"
                    validateStatus={formik.touched.siteAddress && formik.errors.siteAddress ? 'error' : ''}
                    help={formik.touched.siteAddress && formik.errors.siteAddress ? formik.errors.siteAddress : ''}
                >
                    <Input.TextArea
                        name="siteAddress"
                        value={formik.values.siteAddress}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="site-modal-textarea"
                    />
                </Form.Item>
                <Form.Item>
                    <div className="modal-footer-buttons">
                        <Button type="primary" htmlType="submit" className="modal-button">
                            {initialValues ? 'Update Site' : 'Add Site'}
                        </Button>
                        <Button type="default" onClick={onClose} className="modal-button">
                            Cancel
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SiteModal;
