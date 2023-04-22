// import React, { useEffect } from 'react';
// import Navbar from './Components/Navbar';
// import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
// import Homepage from './Pages/Homepage';
// import Services from './Pages/Services';
// import About from './Pages/About';
// import './App.css'
// import BlogPage from './Pages/BlogPage/BlogPage';
// import BlogDetailPage from './Pages/BlogDetailPage/BlogDetailPage';
// import ContactUs from './Pages/ContactUs/ContactUs';

// function ScrollToTop() {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <ScrollToTop />
//       <Routes>
//         <Route path="/" element={<Homepage/>} />
//         <Route path="/services" element={<Services/>} />
//         <Route path="/blogs" element={<BlogPage/>} />
//         <Route path="/blogs/:id" element={<BlogDetailPage/>} />
//         <Route path="/about" element={<About/>} />
//         <Route path="/contact" element={<ContactUs/>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React, { lazy, Suspense, useEffect } from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';

const Homepage = lazy(() => import('./Pages/Homepage'));
const Services = lazy(() => import('./Pages/Services'));
const About = lazy(() => import('./Pages/About'));
const BlogPage = lazy(() => import('./Pages/BlogPage/BlogPage'));
const BlogDetailPage = lazy(() => import('./Pages/BlogDetailPage/BlogDetailPage'));
const ContactUs = lazy(() => import('./Pages/ContactUs/ContactUs'));

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
      <Suspense fallback={<div className="loader">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:id" element={<BlogDetailPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer/>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
