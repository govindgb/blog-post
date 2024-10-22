import React, { useState } from 'react';
import { Modal, Form, Input, Upload, message } from 'antd';
import { PlusOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const NewPostModal = ({ isVisible, handleClose, handleAddPost }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null); // For image preview
  const [imageFile, setImageFile] = useState(null); // Store image file

  // Submit handler to validate form, upload image, and add post
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // If there's an image file, upload it
      let uploadedImageUrl = imageUrl; // Default to current preview URL

      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile); // Attach the image file to the form

        // Upload image to the backend
        const res = await axios.post('http://localhost:4000/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        uploadedImageUrl = res.data.imageUrl; // Get uploaded image URL from response
      }

      // Create post with the uploaded image URL and other form data
      const newPost = { ...values, image: uploadedImageUrl };
      handleAddPost(newPost); // Call parent handler to add the post

      form.resetFields(); // Clear form fields
      setImageUrl(null); // Reset image preview
      setImageFile(null); // Reset image file
      handleClose(); // Close modal after submission
    } catch (error) {
      console.log('Error during submission:', error);
      message.error('Failed to submit the post. Please check your inputs.');
    }
  };

  // Image upload handler to manage file and preview
  const handleImageUpload = ({ file }) => {
    setImageFile(file); // Store the image file
    const previewUrl = URL.createObjectURL(file); // Create a local preview URL
    setImageUrl(previewUrl); // Set image preview
  };

  // Remove image handler
  const handleRemoveImage = () => {
    setImageUrl(null);
    setImageFile(null);
  };

  return (
    <Modal
      title="Add New Blog Post"
      open={isVisible} // Updated to use `open` instead of `visible`
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
            onChange={(info) => handleImageUpload(info)}
          >
            {imageUrl ? (
              <div style={{ position: 'relative' }}>
                <img src={imageUrl} alt="blog" style={{ width: '100%' }} />
                {/* Add cut button to remove image */}
                <CloseCircleOutlined
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    fontSize: 20,
                    color: 'red',
                    cursor: 'pointer',
                  }}
                  onClick={handleRemoveImage}
                />
              </div>
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
