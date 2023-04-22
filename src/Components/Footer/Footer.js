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
                            <Link className='li-link' to='/'> Home </Link>
                        </li>
                        <li className='aside-1-li'>
                            <Link className='li-link' to='/contact'> Reach Us </Link>
                        </li>
                        <li className='aside-1-li'>
                            <Link className='li-link' to='/services'> Services we offer </Link>

                        </li>
                        <li className='aside-1-li'>
                            <Link className='li-link' to='/blogs'> Blogs </Link>

                        </li>
                        <li className='aside-1-li'>
                            <Link className='li-link' to='/about'> About Us </Link>

                        </li>
                    </ul>
                </div>
                <div className='aside-2'>
                    <h3 className='aside-2-h3'>
                        Subscribe to our Newsletter
                    </h3>
                    <div className="input-group">
                        <form>
                            <input type="email" className="input" id="Email" name="Email" placeholder="mail@example.com" autoComplete="off" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" />
                            <button className="button--submit" type="submit">Subscribe</button>
                        </form>
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