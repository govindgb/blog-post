import React from 'react';
import { Link } from 'react-router-dom';
import Card from './CardComponent';

const Home = ({ blogs }) => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl text-center font-bold mb-6 text-blue-500">Blog Posts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {blogs.map((blog) => (
          <Link key={blog.id} to={`/posts/${blog.id}`}>
            <Card title={blog.title} description={blog.excerpt} imageUrl = {blog?.image} />
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Add Blog
        </button> 
      </div>
    </div>
  );
}

export default Home;
