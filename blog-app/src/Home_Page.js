import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from './CardComponent';
import NewPostModal from './component/NewPostModal'; // Import the modal component
import { Pagination } from 'antd'; // Import Ant Design Pagination component

const Home = ({ blogs, addBlog }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4; // Number of posts per page

  // Calculate the indices for slicing the blogs array
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstPost, indexOfLastPost); // Get the current blogs to display

  // Handle page change
  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl text-center font-bold mb-6 text-blue-500">Blog Posts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {currentBlogs.map((blog) => (
          <Link key={blog.id} to={`/posts/${blog.id}`}>
            <Card title={blog.title} description={blog.excerpt} imageUrl={blog.image} />
          </Link>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="mt-8">
        <Pagination
          current={currentPage} // Current active page
          pageSize={postsPerPage} // Number of posts per page
          total={blogs.length} // Total number of blogs
          onChange={onChangePage} // Function to handle page changes
        />
      </div>

      <div className="mt-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={openModal}
        >
          Add Blog
        </button>
      </div>

      <NewPostModal
        isVisible={isModalVisible}
        handleClose={closeModal}
        handleAddPost={addBlog}
      />
    </div>
  );
};

export default Home;
