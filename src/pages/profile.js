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

                <h5>Đơn hàng đang chờ xác nhận vui lòng đợi!!!!</h5>

            </>

        </Fragment>
    )
}
export default Profile;