import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = ({ blogs }) => {
  const { id } = useParams();
  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) {
    return <h2>Blog not found</h2>;
  }

  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full max-w-4xl mb-6 object-cover rounded-lg shadow-lg"
      />

      <p className="text-lg mb-6">{blog.content}</p>
    </div>
  );
}

export default BlogDetail;
