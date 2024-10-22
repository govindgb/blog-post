// BlogDetail.js (Frontend)
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Connect to the Socket.IO server

const BlogDetail = ({ blogs }) => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  // Check if the blog is found
  if (!blog) {
    return <h2>Blog not found</h2>;
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
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      {/* Render the image if it exists */}
      {blog.image && (
        <img
          src={`${blog.image}`} // Display uploaded image
          alt={blog.title}
          className="w-full max-w-4xl mb-6 object-cover rounded-lg shadow-lg"
        />
      )}

      <p className="text-lg mb-6">{blog.content}</p>

      {/* Comments Section */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <ul className="mb-4">
          {comments.map((c, index) => (
            <li key={index} className="bg-white p-4 rounded shadow mb-2">
              {c}
            </li>
          ))}
        </ul>

        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="w-full flex">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-grow p-2 rounded border border-gray-300"
            placeholder="Add a comment"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogDetail;
