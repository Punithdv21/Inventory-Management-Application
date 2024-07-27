import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './AddItemModal.css';

const AddItemModal = ({ isOpen, onRequestClose, onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            itemName: '',
            itemQuantity: '',
            itemHSN: '',
            itemPrice: '',
            itemTaxRate: '',
            itemDesc: '',
            itemFrom: '',
            itemTo: '',
        },
        validationSchema: Yup.object({
            itemName: Yup.string().required('Item Name is required'),
            itemQuantity: Yup.number().required('Item Quantity is required'),
            itemHSN: Yup.number().required('Item HSN is required'),
            itemPrice: Yup.number().required('Item Price is required'),
            itemTaxRate: Yup.number().required('Item Tax Rate is required'),
            itemFrom: Yup.string().required('Item From is required'),
            itemTo: Yup.string().required('Item To is required'),
        }),
        onSubmit: (values) => {
            onSubmit(values);
            formik.resetForm();
            onRequestClose();
        },
    });

    return (
        <Modal
            title="Add New Inventory Item"
            visible={isOpen}
            onCancel={onRequestClose}
            footer={null}
            centered
            className="custom-modal"
        >
            <Form layout="vertical" onSubmitCapture={formik.handleSubmit} className="custom-form">
                <Form.Item
                    label="Item Name"
                    validateStatus={formik.touched.itemName && formik.errors.itemName ? 'error' : ''}
                    help={formik.touched.itemName && formik.errors.itemName ? formik.errors.itemName : ''}
                >
                    <Input
                        name="itemName"
                        onChange={formik.handleChange}
                        value={formik.values.itemName}
                        placeholder="Item Name"
                    />
                </Form.Item>

                <Form.Item
                    label="Item Quantity"
                    validateStatus={formik.touched.itemQuantity && formik.errors.itemQuantity ? 'error' : ''}
                    help={formik.touched.itemQuantity && formik.errors.itemQuantity ? formik.errors.itemQuantity : ''}
                >
                    <Input
                        type="number"
                        name="itemQuantity"
                        onChange={formik.handleChange}
                        value={formik.values.itemQuantity}
                        placeholder="Item Quantity"
                    />
                </Form.Item>

                <Form.Item
                    label="Item HSN"
                    validateStatus={formik.touched.itemHSN && formik.errors.itemHSN ? 'error' : ''}
                    help={formik.touched.itemHSN && formik.errors.itemHSN ? formik.errors.itemHSN : ''}
                >
                    <Input
                        type="number"
                        name="itemHSN"
                        onChange={formik.handleChange}
                        value={formik.values.itemHSN}
                        placeholder="Item HSN"
                    />
                </Form.Item>

                <Form.Item
                    label="Item Price"
                    validateStatus={formik.touched.itemPrice && formik.errors.itemPrice ? 'error' : ''}
                    help={formik.touched.itemPrice && formik.errors.itemPrice ? formik.errors.itemPrice : ''}
                >
                    <Input
                        type="number"
                        name="itemPrice"
                        onChange={formik.handleChange}
                        value={formik.values.itemPrice}
                        placeholder="Item Price"
                    />
                </Form.Item>

                <Form.Item
                    label="Item Tax Rate"
                    validateStatus={formik.touched.itemTaxRate && formik.errors.itemTaxRate ? 'error' : ''}
                    help={formik.touched.itemTaxRate && formik.errors.itemTaxRate ? formik.errors.itemTaxRate : ''}
                >
                    <Input
                        type="number"
                        name="itemTaxRate"
                        onChange={formik.handleChange}
                        value={formik.values.itemTaxRate}
                        placeholder="Item Tax Rate"
                    />
                </Form.Item>

                <Form.Item
                    label="Item Description"
                    validateStatus={formik.touched.itemDesc && formik.errors.itemDesc ? 'error' : ''}
                    help={formik.touched.itemDesc && formik.errors.itemDesc ? formik.errors.itemDesc : ''}
                >
                    <Input.TextArea
                        name="itemDesc"
                        onChange={formik.handleChange}
                        value={formik.values.itemDesc}
                        placeholder="Item Description"
                    />
                </Form.Item>

                <Form.Item
                    label="Item From"
                    validateStatus={formik.touched.itemFrom && formik.errors.itemFrom ? 'error' : ''}
                    help={formik.touched.itemFrom && formik.errors.itemFrom ? formik.errors.itemFrom : ''}
                >
                    <Input
                        name="itemFrom"
                        onChange={formik.handleChange}
                        value={formik.values.itemFrom}
                        placeholder="Item From"
                    />
                </Form.Item>

                <Form.Item
                    label="Item To"
                    validateStatus={formik.touched.itemTo && formik.errors.itemTo ? 'error' : ''}
                    help={formik.touched.itemTo && formik.errors.itemTo ? formik.errors.itemTo : ''}
                >
                    <Input
                        name="itemTo"
                        onChange={formik.handleChange}
                        value={formik.values.itemTo}
                        placeholder="Item To"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block className="custom-button">
                        Add Item
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button onClick={onRequestClose} block className="custom-button cancel-button">
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddItemModal;
