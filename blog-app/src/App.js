import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home_Page';
import BlogDetail from './component/BlogDetail';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'How to Learn React',
      excerpt: 'This guide will take you through the basics of React step-by-step...',
      content: 'Full blog post content for How to Learn React',
      image: 'https://via.placeholder.com/600x400?text=React+Blog+1',
    },
    {
      id: 2,
      title: 'Understanding JavaScript Promises',
      excerpt: 'Promises are an essential feature of JavaScript that enable asynchronous programming...',
      content: 'Full blog post content for Understanding JavaScript Promises',
      image: 'https://via.placeholder.com/600x400?text=JavaScript+Promises',
    },
    {
      id: 3,
      title: 'CSS Flexbox Explained',
      excerpt: 'Flexbox is a powerful layout module in CSS that allows for dynamic control over layouts...',
      content: 'Full blog post content for CSS Flexbox Explained',
      image: 'https://via.placeholder.com/600x400?text=CSS+Flexbox',
    },
    {
      id: 4,
      title: 'Understanding Node.js',
      excerpt: 'Node.js is a powerful runtime environment for building server-side applications...',
      content: 'Full blog post content for Understanding Node.js',
      image: 'https://placeimg.com/600/400/animals',
    },
  ]);
  const addBlog = (newBlog) => {
    setBlogs([...blogs, { ...newBlog, id: blogs.length + 1 }]);
  };


  return (
    <Router>
      <div className="flex justify-center items-center flex-col min-h-screen bg-gray-100 py-10">
        <Routes>
          <Route path="/" element={<Home blogs={blogs} addBlog={addBlog} />} />
          <Route path="/posts/:id" element={<BlogDetail blogs={blogs} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
