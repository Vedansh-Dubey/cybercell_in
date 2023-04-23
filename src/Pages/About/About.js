import React from 'react';
import './About.css';

const About = () => {

    
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>ABOUT CYBERCELL</h1>
                <div className='about-subheader'>
                    <img className='subheader-img' src="https://i.ibb.co/Jk3gFmb/6505028-fotor-bg-remover-20230422224834.png" alt="6505028-fotor-bg-remover-20230422224834" border="0" />
                    <p className='subheader-p'>We are a team of cybersecurity experts dedicated to protecting your online identity and keeping you safe on the internet. Our goal is to provide high-quality cybersecurity services and solutions to individuals, businesses, and organizations of all sizes. We believe that everyone has the right to a safe and secure online experience, and we're committed to helping our clients achieve that.</p>
                </div>
            </div>
            <div className='about-author'>
                <h2 className='author-h2'>THE AUTHOR</h2>
                <div className='author-info'>
                    <div className='author-subinfo'>
                        <img className='author-img' src="https://i.ibb.co/L6jyWf8/avatar.webp" alt="avatar" border="0" />
                        <h3 className='author-name'>
                            Vibhum Dubey
                        </h3>
                        <h4 className='author-designation'>
                            Founder, CyberCell.in
                        </h4>
                    </div>
                    <div className='author-details-wrapper'>
                    <p className='author-details'>
                    Vibhum Dubey, founder of cybercell.in, is a renowned cybersecurity expert with extensive experience in the field. As a Senior Software Security Analyst at Persistent Systems, he identifies and mitigates security risks. He is also a trusted advisor and consultant in the cybersecurity community, known for his expertise in ethical hacking, penetration testing, and vulnerability assessment. With a passion for promoting cybersecurity best practices, Vibhum is dedicated to safeguarding digital assets and ensuring a secure cyber environment.
                    </p>
                    </div>
                </div>
            </div>
            <div className='about-goal'>
                    <h3 className='goal-h3'>OUR MISSION</h3>
                    <div className='goal-info'>
                    <img className='goal-img' src="https://i.ibb.co/c2j9vdq/19199152.png" alt="19199152" border="0"/>
                    <p className='goal-p'>
                    At cybercell.in, our primary goal is to safeguard our nation and society against cybercrime. We provide advanced cybersecurity solutions, raise awareness through education, blogs and training, and empower individuals, businesses, and organizations to build robust defenses against cyber threats. Trust us to protect your digital landscape and contribute to a safer cyber environment for all.
                    </p>
                    </div>

                </div>
        </div>
    );
};

export default About;
