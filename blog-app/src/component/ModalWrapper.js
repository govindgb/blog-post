import React from 'react';
import { Modal } from 'antd';

const ModalWrapper = ({ title, isVisible, onClose, onSubmit, children }) => {
  return (
    <Modal
      title={title}
      visible={isVisible}
      onCancel={onClose}
      onOk={onSubmit}
      okText="Submit"
      cancelText="Cancel"
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
