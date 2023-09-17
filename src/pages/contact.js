import React, { Fragment } from "react";
import Jquery from "../components/Jquery";
import { Link } from "react-router-dom";
function Contact() {
    return (
        <Fragment>
            <Jquery />
            <>
                {/* Breadcrumb Start */}
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-12">
                            <nav className="breadcrumb bg-light mb-30">
                                <Link className="breadcrumb-item text-dark" to={"/"}>
                                    Trang chủ
                                </Link>
                                <span className="breadcrumb-item active">
                                    Hỗ trợ
                                </span>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Breadcrumb End */}
                {/* Contact Start */}
                <div className="container-fluid">
                    <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                        <span className="bg-secondary pr-3">Hỗ trợ</span>
                    </h2>
                    <div className="row px-xl-5">
                        <div className="col-lg mb-5">
                            <div className="contact-form bg-light p-30">
                                <div id="success" />
                                <form name="sentMessage" id="contactForm" noValidate="novalidate">
                                    <div className="control-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            placeholder=""
                                            required="required"
                                            data-validation-required-message="Vui lòng nhập tên"
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div className="control-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder=""
                                            required="required"
                                            data-validation-required-message="Vui lòng nhập Email"
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div className="control-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="subject"
                                            placeholder=""
                                            required="required"
                                            data-validation-required-message="Vui lòng nhập tiêu đề"
                                        />
                                        <p className="help-block text-danger" />
                                    </div>
                                    <div className="control-group">
                                        <textarea
                                            className="form-control"
                                            rows={8}
                                            id="message"
                                            placeholder=""
                                            required="required"
                                            data-validation-required-message="Vui lòng để lại lời nhắn"
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
                        {/* <div className="col-lg-5 mb-5">
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
                        </div> */}
                    </div>
                </div>
                {/* Contact End */}

            </>

        </Fragment>
    )
}
export default Contact;