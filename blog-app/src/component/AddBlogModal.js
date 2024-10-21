import React, { useState } from 'react';
import { Form, Input, Upload, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ModalWrapper from './ModalWrapper';

const AddBlogModal = ({ isVisible, onClose, onAddBlog }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const newBlog = {
        title: values.title,
        content: values.content,
        image: fileList.length > 0 ? URL.createObjectURL(fileList[0].originFileObj) : null,
      };
      onAddBlog(newBlog);
      onClose(); // Close modal after submission
      form.resetFields(); // Reset form fields after submission
      setFileList([]); // Clear image upload list
    });
  };

  return (
    <ModalWrapper
      title="Add New Blog"
      isVisible={isVisible}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Enter blog title" />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: 'Please enter the content' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter blog content" />
        </Form.Item>

        <Form.Item label="Upload Image" name="image">
          <Upload
            listType="picture"
            beforeUpload={() => false} // Prevent auto upload
            fileList={fileList}
            onChange={handleUpload}
          >
            <Button icon={<PlusOutlined />}>Select Image</Button>
          </Upload>
        </Form.Item>
      </Form>
    </ModalWrapper>
  );
};

export default AddBlogModal;
