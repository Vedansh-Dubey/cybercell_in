import React, { useEffect } from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Services from './Pages/Services';
import About from './Pages/About';
import './App.css'
import BlogPage from './Pages/BlogPage/BlogPage';
import BlogDetailPage from './Pages/BlogDetailPage/BlogDetailPage';
import ContactUs from './Pages/ContactUs/ContactUs';
import Footer from './Components/Footer/Footer';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;