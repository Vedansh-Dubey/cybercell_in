import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShieldAlt,
    faLeaf,
    faPalette,
    faShieldHalved,
    faLock,
    faHourglass,
} from "@fortawesome/free-solid-svg-icons";
import "./WhatWeBring.css"

const WhatWeBring = () => {
    return (
        <section className="WhatWeBring">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
                        <div className="why-us-head">
                            <div className="why-us-title">
                                <h2>Confidentiality, Integrity, and Availability</h2>
                                <p>
                                Cybercell provides comprehensive cybersecurity services with a focus on ensuring the confidentiality, integrity, and availability of our clients' sensitive information and systems.
                                </p>
                                <span className="why-us-title-border"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="why-us-content">
                            <div className="service-3">
                                <div className="service-box">
                                    <div className="clearfix">
                                        <div className="iconset">
                                        <FontAwesomeIcon icon={faLock} className="icon" />
                                        </div>
                                        <div className="why-us-content">
                                            <h4 className='subheader'>Confidentiality</h4>
                                            <p>
                                            We prioritize the confidentiality of your sensitive information and use the latest encryption techniques to ensure that it is kept secure and confidential.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="service-box">
                                    <div className="clearfix">
                                        <div className="iconset">
                                            <FontAwesomeIcon icon={faShieldHalved} className="icon" />
                                        </div>
                                        <div className="why-us-content">
                                            <h4 className='subheader'>Integrity</h4>
                                            <p>
                                            Maintaining the integrity of your data is our top priority. We use advanced technologies and processes to protect against data breaches and ensure that your data is accurate and complete.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="service-box">
                                    <div className="clearfix">
                                        <div className="iconset">
                                            <FontAwesomeIcon icon={faHourglass} className="icon" />
                                        </div>
                                        <div className="why-us-content">
                                            <h4 className='subheader'>Availability</h4>
                                            <p>
                                            We understand the importance of having access to your data when you need it. That's why we have measures in place to ensure that your data is available 24/7, with minimal downtime and disruptions.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default WhatWeBring;