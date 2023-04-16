import React, { useState } from "react";
import './ContactForm.css';
import emailjs from'@emailjs/browser';

function ContactForm() {
  const SecureToken = process.env.REACT_APP_SECURETOKEN;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const submitHandler = (event) => {

    const service_id=process.env.REACT_APP_SERVICE_ID;
    event.preventDefault();
    emailjs.sendForm(service_id, 'template_id', event.target, 'public_key');
    const config = {
      
    };

  }

  return (
    <div className="ContactCard">
      <span className="title">GET IN TOUCH</span>
      <form className="form" onSubmit={submitHandler} method="POST">
        <div className="group">
          <input 
            name="name"
            id="name"
            placeholder=" " 
            type="text" 
            required='true' 
            minLength='2' 
            maxLength='50'
            onChange={(event) => setName(event.target.value)}
          />
          <label className="label" htmlFor="name" >Full Name</label>
        </div>
        <div className="group">
          <input
            placeholder=" "
            type="email"
            id="email"
            name="email"
            required='true'
            title="Please enter a valid email address"
            onChange={(event) => setEmail(event.target.value)}
          />
          <label className="label" htmlFor="email">Email</label>
        </div>

        <div className="group">
          <input
            placeholder=" "
            type="tel"
            id="phone"
            name="phone"
            required='true'
            pattern="^(\\+91|0)?[6789]\d{9}$"
            title="Please enter a valid Indian phone number"
            onChange={(event) => setPhone(event.target.value)}
          />
          <label className="label" htmlFor="phone">Phone no.</label>
        </div>

        <div className="group">
          <textarea
            placeholder=" "
            id="message"
            name="message"
            rows="5"
            required='true'
            maxLength='1000'
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
          <label className='label' htmlFor="message">Message</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
