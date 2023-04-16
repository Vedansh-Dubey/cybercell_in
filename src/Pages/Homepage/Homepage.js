import React from 'react';
import { motion } from 'framer-motion';
import "./Homepage.css";
import { Link } from 'react-router-dom'; 

import WhyChooseUs from '../../Components/WhyChooseUs/WhyChooseUs';
// import Faq from '../../Components/FAQ/Faq.js';

const items = [
    {
        icon: "/path/to/your/icon1.png",
        title: "Expert Team",
        description:
            "Our team of experts is dedicated to protecting your business from cyber threats.",
    },
    {
        icon: "/path/to/your/icon2.png",
        title: "Custom Solutions",
        description:
            "We provide customized cyber security solutions tailored to your specific needs.",
    },
    {
        icon: "/path/to/your/icon3.png",
        title: "24/7 Support",
        description:
            "Our support team is available 24/7 to help you with any cyber security issues.",
    },
];



const Homepage = () => {
    return (
        <><div className="hero-section">
            <svg className='svg' viewBox="0 0 1440 320" preserveAspectRatio="none"> 
                <motion.path
                    fill="#0099ff"
                    fillOpacity="0.8"
                    d="M0,128L48,122.7C96,117,192,107,288,117.3C384,128,480,160,576,192C672,224,768,256,864,234.7C960,213,1056,139,1152,112C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0 }} />
            </svg>
            <motion.div
                className="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
            >
                <motion.h1 className="hero-title" initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}>Cybercell</motion.h1>
                <motion.h2 className='hero-h2'
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
                    One stop solution for your cyber security problems.
                </motion.h2>
                <motion.button
                    className="button"
                    alt="Explore Now"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <i>E</i>
                    <i>x</i>
                    <i>p</i>
                    <i>l</i>
                    <i>o</i>
                    <i>r</i>
                    <i>e</i>
                    <i>&nbsp;</i>
                    <i>n</i>
                    <i>o</i>
                    <i>w</i>
                </motion.button>
                <motion.h3 className='hero-h3'
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                >
             Experienced data breach, online fraud, or virus attack ? <br/> <Link className='victim-link' to='/contact'> Contact us immediately here.</Link> 
                </motion.h3>
            </motion.div>
        </div>
        <WhyChooseUs />
        {/* <Faq/> */}
        </>
    );
};

export default Homepage;
