import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShieldAlt,
    faLeaf,
    faPalette,
    faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import "./WhyChooseUs.css"

const WhyChooseUs = () => {
    return (
        <section className="why-choose-us-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
                        <div className="y-us-head">
                            <div className="y-us-title">
                                <h2>Why choose us ?</h2>
                                <p>
                                    At CyberCell, we are committed to providing top-notch cybersecurity solutions to our clients. Here are some of the many reasons why you should choose us as your cybersecurity partner:
                                </p>
                                <span className="y-us-title-border"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <div className="y-us-content">
                            <div className="service-3">
                                <div className="service-box">
                                    <div className="clearfix">
                                        <div className="iconset">
                                            <FontAwesomeIcon icon={faShieldAlt} className="icon" />
                                        </div>
                                        <div className="y-us-content">
                                            <h4>Expertise</h4>
                                            <p>
                                                Our team of highly skilled professionals have years of experience in the field of cybersecurity. They have the knowledge and expertise to handle any security challenge that comes their way.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="service-box">
                                    <div className="clearfix">
                                        <div className="iconset">
                                            <FontAwesomeIcon icon={faShieldHalved} className="icon" />
                                        </div>
                                        <div className="y-us-content">
                                            <h4>Customized solutions</h4>
                                            <p>
                                                We understand that every business has unique security needs. That's why we offer customized solutions that are tailored to your specific requirements.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="service-box">
                                    <div className="clearfix">
                                        <div className="iconset">
                                            <FontAwesomeIcon icon={faPalette} className="icon" />
                                        </div>
                                        <div className="y-us-content">
                                            <h4>Advanced technology</h4>
                                            <p>
                                            We use the latest and most advanced technology to ensure that your systems and data are fully protected against all types of cyber threats.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="service-box">
                                    <div className="clearfix">
                                        <div className="iconset">
                                            <FontAwesomeIcon icon={faLeaf} className="icon" />
                                        </div>
                                        <div className="y-us-content">
                                            <h4>Customer service</h4>
                                            <p>
                                            At CyberCell, we believe in putting our clients first. We provide exceptional customer service, and we are always available to answer any questions or concerns that you may have.
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
export default WhyChooseUs;