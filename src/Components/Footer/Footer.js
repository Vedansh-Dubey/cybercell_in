import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';
const Footer = () => {

    
    return (
        <div className='footer-wrapper'>
            <div className='footer-section-1'>
                <div className='aside-1'>
                    <h3 className='aside-1-h3'>
                        Cybercell
                    </h3>
                    <p className='aside-1-p'>
                        We are dedicated to protect your online identity and keeping you safe on the internet. Our goal is to provide high-quality cybersecurity services and solutions to individuals, businesses, and organizations of all sizes.
                    </p>
                    <h3 className='ul-heading'>
                        Important Links
                    </h3>
                    <ul className='aside-1-ul'>
                        <li className='aside-1-li'>
                            Home
                        </li>
                        <li className='aside-1-li'>
                            Reach Us
                        </li>
                        <li className='aside-1-li'>
                            Services we offer
                        </li>
                        <li className='aside-1-li'>
                            Blogs
                        </li>
                        <li className='aside-1-li'>
                            About Us
                        </li>
                    </ul>
                </div>
                <div className='aside-2'>
                    <h3 className='aside-2-h3'>
                        Subscribe to our Newsletter
                    </h3>
                    <div class="input-group">
                        <input type="email" className="input" id="Email" name="Email" placeholder="mail@example.com" autocomplete="off" />
                        <input className="button--submit" value="Subscribe" type="submit" />
                    </div>
                </div>
            </div>
            <div className='footer-section-2'>
                <p className='footer-section-2-p'>
                &copy; 2023 CyberCell. All rights reserved. |
                <Link to='/'> Privacy Policy </Link >|<Link to='/'> Terms of Service </Link>
                </p>
            </div>
        </div>
    )
}

export default Footer