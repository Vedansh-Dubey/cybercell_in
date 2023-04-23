import React from 'react'
import ContactForm from '../../Components/Form/ContactForm';
import './ContactUs.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMailBulk,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from 'react-helmet';

const ContactUs = () => {
  return (
    <div className='ContactPage'>
      <Helmet>
        <title>Contact Us | Cybercell</title>
        <meta name='description' content='Contact us for inquiries, feedback, or support. Get in touch with us via phone, email, or visit our location. Contact CyberCell for all your cybersecurity needs.' />
        <link rel="canonical" href="https://cybercell.in/contact" />
      </Helmet>
      <head>
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Cybercell",
            "url": "https://cybercell.in",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+918830537097",
              "contactType": "customer support"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "IT Park",
              "addressLocality": "Nagpur",
              "addressRegion": "Maharashtra",
              "postalCode": "440022",
              "addressCountry": "India"
            }
          }
          `}
        </script>
      </head>
      <h1 className='ContactTitle'>Contact Us</h1>
      <div className='Contact-header'>
        <img className='Contact-img' src="https://i.ibb.co/Nt3ccLC/5127314-removebg-preview.png" alt="Customer Support" border="0" />
        <ContactForm className='contactform' />
      </div>
      <div className='ContactSmall'>

        <a className='SmallContact-link' href="tel:+918830537097">
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

        <a href="https://maps.google.com/maps?q=IT Park, Nagpur, Maharashtra, India" className='SmallContact-link'>
          <div className="WrapperSmall">
            <FontAwesomeIcon icon={faLocationArrow} className="Contact-icon" />
            <h3 className='Contact-small-subhead'>LOCATE US</h3>
            <h4 className='Contact-small-subheading-2'>IT Park, Nagpur <br />Maharashtra, India</h4>
          </div>
        </a>


      </div>
    </div>

  )
}

export default ContactUs