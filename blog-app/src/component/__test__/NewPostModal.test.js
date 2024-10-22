import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers
import NewPostModal from '../components/NewPostModal'; // adjust the import path as necessary

describe('NewPostModal', () => {
  const mockHandleClose = jest.fn();
  const mockHandleAddPost = jest.fn();

  beforeEach(() => {
    render(
      <NewPostModal
        isVisible={true}
        handleClose={mockHandleClose}
        handleAddPost={mockHandleAddPost}
      />
    );
  });

  test('renders correctly', () => {
    expect(screen.getByText(/Add New Blog Post/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Content/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload/i)).toBeInTheDocument();
  });

  test('calls handleAddPost on submitting the form', () => {
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: 'New Blog Title' },
    });
    fireEvent.change(screen.getByLabelText(/Content/i), {
      target: { value: 'This is the content of the blog.' },
    });

    fireEvent.click(screen.getByText(/Add Post/i));
    
    expect(mockHandleAddPost).toHaveBeenCalledWith({
      title: 'New Blog Title',
      content: 'This is the content of the blog.',
      image: '', // assuming the image is not being set in this test
    });
    expect(mockHandleClose).toHaveBeenCalled();
  });

  test('does not submit if fields are empty', () => {
    fireEvent.click(screen.getByText(/Add Post/i));
    
    expect(mockHandleAddPost).not.toHaveBeenCalled();
  });
});
