import React,{useEffect} from 'react';
import Card from '../../Components/Cards/Cards.js';
import './Services.css';
import { motion } from 'framer-motion';
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import WhatWeBring from '../../Components/WhatWeBringToYou/WhatWeBring.js';
import { Helmet } from 'react-helmet';
const Services = () => {

    const services = [
        {
            title: 'Penetration Testing',
            body: 'Our threat detection solutions use advanced technology to detect and respond to cyber threats in real-time.'
        },
        {
            title: 'Vulnerability Assesment',
            body: 'Our vulnerability management services help identify and prioritize vulnerabilities to prevent potential attacks.'
        },
        {
            title: 'Consultancy',
            body: 'We provide comprehensive compliance and governance services to ensure your business adheres to industry regulations.'
        },
        {
            title: 'Incident Response',
            body: 'Our incident response team is available 24/7 to help minimize the impact of security incidents and quickly restore your systems.'
        },
        {
            title: 'Security Audits',
            body: 'Our managed security services offer complete security management and monitoring to ensure your business stays protected.'
        }
    ];

    const controls = useAnimation();
    const { ref, inView } = useInView({
      threshold: 0.2,
      triggerOnce: true
    });
  
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    }, [controls, inView]);
  
    const variants = {
      hidden: { opacity: 1, y: 50 },
      visible: { opacity: 1, y: 0 }
    };
  
    return (
      <div
        className="services-container">
        <motion.section className='header' variants={variants}
        initial="hidden"
        animate={controls}
        ref={ref}>
           <Helmet>
                <title>Our Services | Cybercell</title>
                <meta name="description" content="We provide advanced cybersecurity solutions to safeguard your digital assets and protect against cyber threats. Trust Cybercell for expert services that ensure the confidentiality, integrity, and availability of your sensitive information." />
                <meta name='keywords' content='Cyber Services, VAPT, Cyber Security, Cybersecurity Consultancy'/>
                <link rel="canonical" href="https://cybercell.in/services" />
            </Helmet>
          <h1 className='services_heading'>Our Services</h1>
          <hr className='hr' />
          <p className='services_paragraph'>We provide advanced cybersecurity solutions to safeguard your digital assets and protect against cyber threats. Trust Cybercell for expert services that ensure the confidentiality, integrity, and availability of your sensitive information.</p>
        </motion.section>
        <motion.div className="card-container" variants={variants}
        initial="hidden"
        animate={controls}
        ref={ref}>
          {services.map(service => (
            <Card key={service.title} title={service.title} body={service.body} />
          ))}
        </motion.div>
        <svg className='svg' viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#0099ff" fillOpacity="0.8" d="M0,128L60,149.3C120,171,240,213,360,208C480,203,600,149,720,149.3C840,149,960,203,1080,208C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
        <WhatWeBring/>
      </div>
    );

  };



export default Services;
