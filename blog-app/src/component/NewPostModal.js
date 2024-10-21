import React, { useState } from 'react';
import { Modal, Button, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const NewPostModal = ({ isVisible, handleClose, handleAddPost }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        handleAddPost({ ...values, image: imageUrl });
        handleClose();
      })
      .catch((info) => {
        console.log('Validation Failed:', info);
      });
  };

  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
    }
  };

  return (
    <Modal
      title="Add New Blog Post"
      visible={isVisible}
      onCancel={handleClose}
      onOk={handleSubmit}
      okText="Add Post"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter the title' }]}
        >
          <Input placeholder="Enter blog title" />
        </Form.Item>
        <Form.Item
          name="content"
          label="Content"
          rules={[{ required: true, message: 'Please enter the content' }]}
        >
          <Input.TextArea placeholder="Enter blog content" rows={4} />
        </Form.Item>
        <Form.Item label="Upload Image">
          <Upload
            listType="picture-card"
            showUploadList={false}
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleImageUpload}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="blog" style={{ width: '100%' }} />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewPostModal;
