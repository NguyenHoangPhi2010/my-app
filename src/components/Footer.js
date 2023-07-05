import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Jquery from "../components/Jquery";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
function Footer() {
    const usenavigate = useNavigate();
    const handlecheck = () => {
        const token = sessionStorage.getItem('token')

        if (token === null) {
            toast.error('Vui lòng đăng nhập để sử dụng');
        } else {
            usenavigate('/myaccount')
        }
    }
    return (

        <Fragment>
            {/* Footer Start */}
            <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
                <div className="row px-xl-5 pt-5">
                    <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
                        <h5 className="text-secondary text-uppercase mb-4">Get In Touch</h5>
                        <p className="mb-4">
                            No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et
                            dolor sed dolor. Rebum tempor no vero est magna amet no
                        </p>
                        <p className="mb-2">
                            <i className="fa fa-map-marker-alt text-primary mr-3" />
                            123 Street, New York, USA
                        </p>
                        <p className="mb-2">
                            <i className="fa fa-envelope text-primary mr-3" />
                            info@example.com
                        </p>
                        <p className="mb-0">
                            <i className="fa fa-phone-alt text-primary mr-3" />
                            +012 345 67890
                        </p>
                    </div>
                    <div className="col-lg-8 col-md-12">
                        <div className="row">
                            <div className="col-md-4 mb-5">
                                <h5 className="text-secondary text-uppercase mb-4">Cửa hàng</h5>
                                <div className="d-flex flex-column justify-content-start">
                                    <Link className="text-secondary mb-2" to={"/"} href="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        Trang chủ
                                    </Link>
                                    <Link className="text-secondary mb-2" to={"/shop"} href="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        Sản phảm
                                    </Link>
                                    <Link className="text-secondary mb-2" to={"/cart"} href="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        Giỏ hàng
                                    </Link>
                                    <Link className="text-secondary mb-2" to={"/contact"} href="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        Hổ trợ
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5 className="text-secondary text-uppercase mb-4">Tài khoản</h5>
                                <div className="d-flex flex-column justify-content-start">
                                    <Link className="text-secondary mb-2" to={"/login"} href="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        Đăng nhập
                                    </Link>
                                    <Link className="text-secondary mb-2" to={"/signup"} href="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        Đăng ký
                                    </Link>
                                    <Link className="text-secondary mb-2" onClick={() => handlecheck()} href="#">
                                        <i className="fa fa-angle-right mr-2" />
                                        Tài khoản cá nhân
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-4 mb-5">
                                <h5 className="text-secondary text-uppercase mb-4">Newsletter</h5>
                                <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
                                <form action="">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Your Email Address"
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary">Sign Up</button>
                                        </div>
                                    </div>
                                </form>
                                <h6 className="text-secondary text-uppercase mt-4 mb-3">
                                    Follow Us
                                </h6>
                                <div className="d-flex">
                                    <a className="btn btn-primary btn-square mr-2" href="#">
                                        <i className="fab fa-twitter" />
                                    </a>
                                    <a className="btn btn-primary btn-square mr-2" href="#">
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                    <a className="btn btn-primary btn-square mr-2" href="#">
                                        <i className="fab fa-linkedin-in" />
                                    </a>
                                    <a className="btn btn-primary btn-square" href="#">
                                        <i className="fab fa-instagram" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="row border-top mx-xl-5 py-4"
                    style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}
                >
                    <div className="col-md-6 px-xl-0">
                        <p className="mb-md-0 text-center text-md-left text-secondary">
                            ©{" "}
                            <a className="text-primary" href="#">
                                Domain
                            </a>
                            . All Rights Reserved. Designed by
                            <a className="text-primary" href="https://htmlcodex.com">
                                HTML Codex
                            </a>
                        </p>
                    </div>
                    <div className="col-md-6 px-xl-0 text-center text-md-right">
                        <img className="img-fluid" src="ASSETS/img/payments.png" alt="" />
                    </div>
                </div>
            </div>
            {/* Footer End */}
            {/* Back to Top */}
            <a href="#" className="btn btn-primary back-to-top"><i className="fa fa-angle-double-up"></i></a>
        </Fragment>

    )
}

export default Footer