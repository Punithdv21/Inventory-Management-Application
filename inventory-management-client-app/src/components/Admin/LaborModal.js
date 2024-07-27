import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './LaborModal.css';

const LaborModal = ({ isOpen, onRequestClose, onSubmit, initialValues }) => {
    const formik = useFormik({
        initialValues: initialValues || {
            laborName: '',
            laborCount: '',
            laborPayment: '',
        },
        validationSchema: Yup.object({
            laborName: Yup.string().required('Labor Name is required'),
            laborCount: Yup.number()
                .required('Labor Count is required')
                .min(1, 'At least 1 labor is required'),
            laborPayment: Yup.number()
                .required('Labor Payment is required')
                .min(1, 'Payment must be positive'),
        }),
        onSubmit: (values) => {
            onSubmit(values);
            formik.resetForm();
            onRequestClose();
        },
    });

    return (
        <Modal
            title={initialValues?._id ? 'Update Labor' : 'Add New Labor'}
            visible={isOpen}
            onCancel={onRequestClose}
            footer={null}
            centered
            className="labor-modal"
        >
            <Form layout="vertical" onSubmitCapture={formik.handleSubmit} className="labor-modal-form">
                <Form.Item
                    label="Labor Name"
                    validateStatus={formik.touched.laborName && formik.errors.laborName ? 'error' : ''}
                    help={formik.touched.laborName && formik.errors.laborName ? formik.errors.laborName : ''}
                >
                    <Input
                        name="laborName"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.laborName}
                        placeholder="Labor Name"
                        className="labor-modal-input"
                    />
                </Form.Item>

                <Form.Item
                    label="Labor Count"
                    validateStatus={formik.touched.laborCount && formik.errors.laborCount ? 'error' : ''}
                    help={formik.touched.laborCount && formik.errors.laborCount ? formik.errors.laborCount : ''}
                >
                    <Input
                        type="number"
                        name="laborCount"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.laborCount}
                        placeholder="Labor Count"
                        className="labor-modal-input"
                    />
                </Form.Item>

                <Form.Item
                    label="Labor Payment"
                    validateStatus={formik.touched.laborPayment && formik.errors.laborPayment ? 'error' : ''}
                    help={formik.touched.laborPayment && formik.errors.laborPayment ? formik.errors.laborPayment : ''}
                >
                    <Input
                        type="number"
                        name="laborPayment"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.laborPayment}
                        placeholder="Labor Payment"
                        className="labor-modal-input"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block className="labor-modal-submit-button">
                        {initialValues?._id ? 'Update Labor' : 'Add Labor'}
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button onClick={onRequestClose} block className="labor-modal-cancel-button">
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LaborModal;
