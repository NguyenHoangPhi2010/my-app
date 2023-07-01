import React, { Fragment } from "react";
import Jquery from "../components/Jquery";
function Contact() {
    return (
        <Fragment>
            <Jquery />
            <>

                {/* Contact Start */}
                <div className="container-fluid">
                    <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                        <span className="bg-secondary pr-3">Hổ trợ</span>
                    </h2>
                    <div className="row px-xl-5">
                        <div className="col-lg-7 mb-5">
                            <div className="contact-form bg-light p-30">
                                <div id="success" />
                                <form name="sentMessage" id="contactForm" noValidate="novalidate">
                                    <div className="control-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder="Your Name"
                                            required="required"
                                            data-validation-required-message="Please enter your name"
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div className="control-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Your Email"
                                            required="required"
                                            data-validation-required-message="Please enter your email"
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div className="control-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="subject"
                                            placeholder="Subject"
                                            required="required"
                                            data-validation-required-message="Please enter a subject"
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div className="control-group">
                                        <textarea
                                            className="form-control"
                                            rows={8}
                                            id="message"
                                            placeholder="Message"
                                            required="required"
                                            data-validation-required-message="Please enter your message"
                                            defaultValue={""}
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-primary py-2 px-4"
                                            type="submit"
                                            id="sendMessageButton"
                                        >
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-5 mb-5">
                            <div className="bg-light p-30 mb-30">

                            </div>
                            <div className="bg-light p-30 mb-3">
                                <p className="mb-2">
                                    <i className="fa fa-map-marker-alt text-primary mr-3" />
                                    123 Street, New York, USA
                                </p>
                                <p className="mb-2">
                                    <i className="fa fa-envelope text-primary mr-3" />
                                    info@example.com
                                </p>
                                <p className="mb-2">
                                    <i className="fa fa-phone-alt text-primary mr-3" />
                                    +012 345 67890
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Contact End */}

            </>

        </Fragment>
    )
}
export default Contact;