import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to the Socket.IO server

const BlogDetail = ({ blogs }) => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  // Check if the blog is found
  if (!blog) {
    return <h2 className="text-center text-2xl">Blog not found</h2>;
  }

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Listen for comment updates from the server
    socket.on('comments-updated', (data) => {
      if (data.postId === blog.id) {
        setComments(data.comments); // Update comments for this post
      }
    });

    // Clean up socket connection when component unmounts
    return () => {
      socket.off('comments-updated');
    };
  }, [blog.id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (comment.trim() === '') return; // Don't allow empty comments

    // Optimistic update: Add the comment locally before it's confirmed by the server
    setComments((prevComments) => [...prevComments, comment]);

    // Emit new comment event to the server
    socket.emit('new-comment', {
      postId: blog.id,
      comment,
    });

    // Clear the input
    setComment('');
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center font-sans">{blog.title}</h1>

      {/* Responsive layout for image and content */}
      <div className="flex flex-col lg:flex-row max-w-5xl w-full mx-auto">
        {/* Image Section */}
        {blog.image && (
          <img
            src={`${blog.image}`} // Display uploaded image
            alt={blog.title}
            className="w-full lg:w-1/3 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          />
        )}

        {/* Content Section */}
        <div className="lg:w-2/3 p-4">
          <p className="text-lg mb-6 text-gray-800">{blog.content}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="w-full max-w-5xl p-4">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <ul className="mb-4 space-y-2">
          {comments.map((c, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              {c}
            </li>
          ))}
        </ul>

        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="flex">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-grow p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Add a comment"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogDetail;
