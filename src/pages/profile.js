import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Jquery from "../components/Jquery";
function Profile() {
    return (
        <Fragment>
            <ToastContainer />
            <Jquery />
            <>


                <div className="position-relative"
                    style={{ height: 450 }}>
                    <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                        <div className="p-3" style={{ maxWidth: 700 }}>
                            <h1 className="fa fa-check-circle text-success mb-3 animate__animated animate__fadeInDown" style={{ size: 700 }}></h1>
                            <h1 className="text-white mb-3 animate__animated animate__fadeInDown">
                                Đặt hàng thành công
                            </h1>
                            <p className="mx-md-4 px-5 animate__animated animate__bounceIn">
                                Đơn hàng đang chờ xác nhận Nhấp vào Kiểm tra để xem thông tin thêm!!!
                            </p>
                            <Link
                                className="btn btn-outline-light py-2 px-4 mt-3 mr-5 animate__animated animate__fadeInUp"
                                to={"/"}
                            >
                                Trang chủ
                            </Link>
                            <Link
                                className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                                to={"/myaccount"}
                            >
                                kiểm tra
                            </Link>
                        </div>
                    </div>
                </div>
            </>

        </Fragment>
    )
}
export default Profile;