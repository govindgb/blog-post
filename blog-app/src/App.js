import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home_Page';
import BlogDetail from './component/BlogDetail';
import pinacaImg from './assests/images/pinaca.jpg'
import pinacaCompiditors from './assests/images/compi.jpg'

import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Pinaca Technologies Overview',
      excerpt: 'This guide will take you through the basics of React step-by-step...',
      content: 'Founded in 2019 and based in Pune, India, Pinaca Technologies is an innovative startup operating within the fintech sector. The company specializes in B2B payments, aiming to simplify and streamline financial transactions between businesses. By focusing on enhancing the efficiency of payment processes, Pinaca Technologies is dedicated to helping businesses manage their financial operations more effectively. The company leverages cutting-edge technology to provide solutions that cater to the unique needs of modern businesses in a rapidly evolving financial landscape.​',
      image: pinacaImg,
    },
    {
      id: 2,
      title: 'Pinaka Technology',
      excerpt: 'Pinaka Technology can surpass competitors in the defense sector...',
      content: 'Pinaka Technology faces competition from various companies in the defense and aerospace sectors, including major players like Bharat Electronics, Hindustan Aeronautics Limited (HAL), and others involved in defense manufacturing and technology solutions. These competitors have established reputations and extensive portfolios that encompass everything from avionics systems to ground support equipment. For instance, Bharat Electronics focuses on electronic products for defense applications, while HAL specializes in aircraft manufacturing and services, giving them a significant market presence and influence in India’s defense landscape',
      image: pinacaCompiditors,
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
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5S_veyC3KeLmrwVQE5WIhw8SXZxpz-Zh0Uw&s ',
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
