import React from "react";
import './ContactForm.css';
import emailjs from '@emailjs/browser';

function ContactForm() {

  const submitHandler = (event) => {

    event.preventDefault();
    alert('Your response submitted successfully');
    emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, event.target, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
      .then((result) => {
        console.log('Response submitted');
      }, (error) => {
        alert('OOPS! Something went wrong. Please try other method to Contact till things get normal')
        console.log(error.text);
      });
  }


  return (
    <div className="ContactCard">
      <span className="title">GET IN TOUCH</span>
      <form className="form" onSubmit={submitHandler}>
        <div className="group">
          <input
            name="name"
            id="name"
            placeholder=" "
            type="text"
            required='true'
            minLength='2'
            maxLength='50'
          // onChange={(event) => setName(event.target.value)}
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
          // onChange={(event) => setEmail(event.target.value)}
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
          // onChange={(event) => setPhone(event.target.value)}
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
          // onChange={(event) => setMessage(event.target.value)}
          ></textarea>
          <label className='label' htmlFor="message">Message</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
