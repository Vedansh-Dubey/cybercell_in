import React from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Services from './Pages/Services';
import About from './Pages/About';
import './App.css'
import BlogPage from './Pages/BlogPage/BlogPage';
import BlogDetailPage from './Pages/BlogDetailPage/BlogDetailPage';
import ContactUs from './Pages/ContactUs/ContactUs';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/blogs" element={<BlogPage/>} />
        <Route path="/blogs/:id" element={<BlogDetailPage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<ContactUs/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;