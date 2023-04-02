import React from "react";
import './Faq.css';

import { useState } from 'react';

const Faq = () => {
  const [showFaq, setShowFaq] = useState(false);

  const handleButtonClick = () => {
    setShowFaq(!showFaq);
  }

  return (

<section>
    <h1 className="title">FAQ's</h1>

    <div className="questions-container">
        <div className="question">
            <button onClick={handleButtonClick}>
                <span>What's the best way to study JavaScript?</span>
                <i className={showFaq ? 'fas fa-chevron-up d-arrow rotate' : 'fas fa-chevron-down d-arrow'}></i>
            </button>
            {showFaq && <p>Start With An Online Course.An online tutorial is probably the best way to learn JavaScript.If you're serious about learning fast, efficiently and without missing any important information, then you should consider enrolling in an online course.</p>}
        </div>

        <div className="question">
            <button>
                <span>What should I learn after JavaScript / js?</span>
                <i className="fas fa-chevron-down d-arrow"></i>
            </button>
            <p>I suggest taking a look at Typescript and learning some popular frontend framework (Angular, React, Vue). If you are interested in backend, take a look at Node. js.</p>
        </div>

        <div className="question">
            <button>
                <span>Can I get a job after learning JavaScript?</span>
                <i className="fas fa-chevron-down d-arrow"></i>
            </button>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi laboriosam ea odit voluptate culpa quas explicabo.</p>
        </div>

        <div className="question">
            <button>
                <span>How long will it take to learn JavaScript?</span>
                <i className="fas fa-chevron-down d-arrow"></i>
            </button>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus corporis pariatur a maiores minus tempore magni nam beatae dolores omnis.</p>
        </div>
    </div>
</section>

  );
}

export default Faq;