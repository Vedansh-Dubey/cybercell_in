import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>About CyberCell</h1>
                <p>We are a team of cybersecurity experts dedicated to protecting your online identity and keeping you safe on the internet. Our goal is to provide high-quality cybersecurity services and solutions to individuals, businesses, and organizations of all sizes. We believe that everyone has the right to a safe and secure online experience, and we're committed to helping our clients achieve that.</p>
            </div>
            <div className="about-sections">
                <div className="about-section">
                    <h2>Our Mission</h2>
                    <p>At CyberCell, our mission is to provide you with the best cybersecurity solutions to keep your personal information and online activity safe and secure. </p>
                </div>
                <div className="about-section">
                    <h2>Our Team</h2>
                    <p>Our team consists of experienced cybersecurity professionals who are passionate about keeping you safe on the internet. We have a wide range of expertise in areas such as network security, data privacy, and threat intelligence.</p>
                </div>
                <div className="about-section">
                    <h2>Our Services</h2>
                    <p>We offer a range of services to help you stay protected online, including:</p>
                    <ul>
                        <li>Vulnerability assessments</li>
                        <li>Penetration testing</li>
                        <li>Data privacy consulting</li>
                        <li>Threat intelligence monitoring</li>
                        <li>Security Audit</li>
                        <li>Incident Responding</li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;
