import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { DialogTitle } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const Footer = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                    &copy; 2023 CyberCell. All rights reserved. <br />
                    <Link onClick={handleClickOpen} > Privacy Policy </Link >
                    <Dialog
                        fullScreen
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                        className='dialog-box'
                    >
                        <AppBar sx={{ position: 'relative', justifyContent: 'end' }}>
                            <Toolbar
                                sx={{ justifyContent: 'space-between', paddingLeft: '0px', backgroundColor: '#262626' }}
                            >
                                <DialogTitle>
                                    Privacy Policy
                                </DialogTitle>
                                <IconButton

                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                        <div className='dialog-content'>
                            <p class="paragraph">
                                <b> At Cybercell</b>, we are committed to protecting your privacy and maintaining the
                                confidentiality of your personal information. This privacy policy outlines
                                how we collect, use, and safeguard the information you provide to us through
                                our website.
                            </p>

                            <p class="paragraph">
                                <b>Information Collection: </b>We may collect personal information, such as your
                                name, email address, phone number, and other relevant information, when you
                                interact with our website, such as when you submit a contact form or subscribe
                                to our newsletter. We may also automatically collect certain non-personal
                                information, such as your IP address, browser type, operating system, and
                                website usage data through cookies and other tracking technologies.
                            </p>

                            <p class="paragraph">
                                <b>  Information Use: </b>We use the information collected to provide you with
                                services, improve our website, communicate with you, and fulfill our legal
                                obligations. We may also use your information to send you promotional
                                materials, newsletters, or other marketing communications, but you can opt out
                                of receiving such communications at any time.
                            </p>

                            <p class="paragraph">
                                <b> Information Sharing: </b>We do not sell, rent, or lease your personal
                                information to third parties. However, we may share your information with
                                trusted service providers who help us operate our website, process payments,
                                or deliver services on our behalf. We may also share your information when
                                required by law, to protect our rights, or to comply with legal proceedings.
                            </p>

                            <p class="paragraph">
                                <b>Data Security:</b> We take appropriate measures to protect your personal
                                information from unauthorized access, loss, misuse, or alteration. However,
                                no method of data transmission over the internet or electronic storage is
                                completely secure, and we cannot guarantee the absolute security of your
                                information.
                            </p>

                            <p class="paragraph">
                                <b>Links to Other Websites: </b>Our website may contain links to third-party
                                websites or services. We are not responsible for the privacy practices or
                                content of those websites. We encourage you to review the privacy policies of
                                those websites before providing any personal information.
                            </p>

                            <p class="paragraph">
                                <b>  Children's Privacy:</b> Our website is not intended for children under the age of
                                13. We do not knowingly collect or maintain personal information from
                                children. If we become aware that we have collected personal information from
                                a child under the age of 13, we will promptly delete that information.
                            </p>

                            <p class="paragraph">
                                <b> Changes to Privacy Policy:</b> We reserve the right to update or modify this
                                privacy policy at any time. Any changes will be effective when posted on our
                                website, and your continued use of our website after the changes indicates
                                your acceptance of the updated privacy policy.
                            </p>
                            <p class="paragraph">
                                <b>Limitation of Liability:</b> In no event shall Cybercell be liable for any direct, indirect, incidental, consequential, special, or punitive damages arising out of or in connection with your use of the website, even if Cybercell has been advised of the possibility of such damages. This limitation of liability applies to all claims, whether based on contract, tort, negligence, strict liability, or any other legal theory.</p>
                            <p class="paragraph">
                                <b>Indemnification:</b> You agree to indemnify, defend, and hold harmless Cybercell and its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, losses, liabilities, and expenses, including legal fees, arising out of or in connection with your use of the website or any violation of these terms and conditions.</p>
                            <p class="paragraph">
                                <b>Termination:</b> Cybercell reserves the right to terminate or suspend your access to the website at any time, without notice or liability, for any reason, including but not limited to a violation of these terms and conditions or any applicable laws or regulations.</p>
                            <p class="paragraph">
                                <b>Governing Law and Jurisdiction:</b> These terms and conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of laws principles. Any legal action or proceeding arising out of or relating to these terms and conditions shall be brought exclusively in the courts of India, and you hereby consent to the jurisdiction and venue of such courts.</p>

                            <p class="paragraph">
                                <b> Contact Us:</b> If you have any questions or concerns about our privacy policy or
                                how we handle your personal information, please contact us using the contact
                                information provided on our website.
                            </p>

                        </div>
                    </Dialog>
                </p>
            </div>
        </div>
    )
}

export default Footer