import React from 'react'
import ContactForm from '../../Components/Form/ContactForm';
import './ContactUs.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faLeaf,
  faPalette,
  faShieldHalved,
  faLock,
  faHourglass,
  faPhone,
  faMailBulk,
  faMailReply,
  faMailForward,
  faLocation,
  faLocationPin,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
const ContactUs = () => {
  return (
    <div className='ContactPage'>
      <h1 className='ContactTitle'>Contact Us</h1>
      <div className='Contact-header'>
        <img className='Contact-img' src="https://i.ibb.co/Nt3ccLC/5127314-removebg-preview.png" alt="5127314-removebg-preview" border="0" />
        <ContactForm className='contactform'/>
      </div>
      <div className='ContactSmall'>

      <a  className='SmallContact-link' href="tel:+918830537097">
        <div className="WrapperSmall">
          <FontAwesomeIcon icon={faPhone} className="Contact-icon" />
          <h3 className='Contact-small-subhead'>CALL US</h3>
          <h4 className='Contact-small-subheading-2'>+918830537097</h4>
        </div>
        </a>

        <a href="mailto:vibhum@cybercell.in" className='SmallContact-link'>
        <div className="WrapperSmall">
          <FontAwesomeIcon icon={faMailBulk} className="Contact-icon" />
          <h3 className='Contact-small-subhead'>MAIL US</h3>
          <h4 className='Contact-small-subheading-2'>vibhum@cybercell.in</h4>
        </div>
        </a>

        <a href="https://maps.google.com/maps?q=Manish Nagar, Nagpur, Maharashtra, India" className='SmallContact-link'>
        <div className="WrapperSmall">
          <FontAwesomeIcon icon={faLocationArrow} className="Contact-icon" />
          <h3 className='Contact-small-subhead'>LOCATE US</h3>
          <h4 className='Contact-small-subheading-2'>Manish Nagar, Nagpur <br />Maharashtra, India</h4>
        </div>
        </a>


      </div>
    </div>

  )
}

export default ContactUs