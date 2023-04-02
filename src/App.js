import React from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Services from './Pages/Services';
import About from './Pages/About';
import Footer from './Components/Footer/Footer';
import './App.css'
import BlogPage from './Pages/BlogPage/BlogPage';
import BlogDetails from './Components/Blog/BlogDetails';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/services" element={<Services/>} />
        <Route path="/blogs" element={<BlogPage/>} />
        <Route path="/blogs/:id" element={<BlogDetails/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;