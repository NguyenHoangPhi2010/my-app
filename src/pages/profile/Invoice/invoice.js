import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Jquery from "../../../components/Jquery";

function Invoice() {
    const [data, setData] = useState([]);
    const [dataTrue, setDataTrue] = useState([]);
    const [datadetail, setDataDetail] = useState([]);
    const [statusOptions, setStatusOptions] = useState([]);
    useEffect(() => {
        getData();
        getDataStatus();
    }, [])
    const usenavigate = useNavigate();

    const getData = () => {
        const token = sessionStorage.getItem('token')
        if (token == null) {
            console.log("Cart null")
        } else {
            axios.get('https://localhost:7225/api/Invoices', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then((result) => {
                    setData(result.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }
<<<<<<< HEAD
    const getDataStatus = () => {
        const token = sessionStorage.getItem('token')
        if (token == null) {
            console.log("Cart null")
        } else {
            axios.get('https://localhost:7225/api/Invoices/GetInvoicesStatus', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then((result) => {
                    setDataTrue(result.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }
=======
>>>>>>> f125f77413c46b346417db359020eb1a320fca1c
    console.log('data', data)
    const renderStatus = (item) => {
        if (item.status === 1) {
            return (
                <div style={{ width: "150px" }}><b className="text-danger text-sm font-weight-bolder btn-grey">Chờ xác nhận</b></div>

            )

        }
        else if (item.status == 2) {
            return (
                <div style={{ width: "150px" }}><b style={{ color: "#F29727" }} className="text-sm font-weight-bolder btn-grey">Đã xác nhận</b></div>
            )
        }
        else if (item.status == 3) {
            return (
                <div style={{ width: "150px" }}><b style={{ color: "#F2BE22" }} className="text-sm font-weight-bolder btn-grey">Đang giao</b></div>
            )
        }
        else if (item.status == 4) {
            return (
                <div style={{ width: "150px" }}><b style={{ color: "#22A699" }} className="text-sm font-weight-bolder btn-grey">Đã giao</b></div>
            )
        }
        else {
            return (
                <div style={{ width: "150px" }}><b style={{ color: "red" }} className="text-sm font-weight-bolder btn-grey">Đã hủy</b></div>
            )

        }
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    var tong = dataTrue.reduce((a, v) => a = a + v.total, 0)
    return (
        <Fragment>
            <Jquery />
            <>
                <ToastContainer />
                <div className="container-fluid ">
                    <h3 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                        <span className="bg-secondary pr-3">Quản lý đơn hàng</span>
                    </h3>
                    <div className="row px-xl-5 pb-3 ">
                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                            <div
                                className="d-flex align-items-center bg-light mb-4"
                                style={{ padding: 20 }}
                            >
                                <h1 className="fa fa-shipping-fast text-primary m-0 mr-2" />
                                <div className=" align-middle flex-fill pl-3">

                                    <h6 className="font-weight-semi-bold m-0">{data.length} Đơn hàng</h6>

                                </div>

                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                            <div
                                className="d-flex align-items-center bg-light mb-4"
                                style={{ padding: 20 }}
                            >
                                <h1 className="fa fa-shopping-basket text-primary m-0 mr-3" />
                                <div className="flex-fill pl-3">
                                    <h6>Đã mua</h6>

                                    <h6 className="font-weight-semi-bold m-0">{VND.format(tong)}</h6>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row px-xl-5 pb-3 ">
                        <table className="table table-light table-borderless table-hover text-center mb-0">
                            <thead className="thead-dark">
                                <tr>

                                    <th>Mã đơn hàng</th>
                                    <th>Ngày lập</th>
                                    <th>Tình trạng</th>
                                    <th>Tổng tiền</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {

                                    data.map((item, Index) => {

                                        return (

                                            <tr key={Index}>
                                                <td className="align-middle">{item.code}</td>
                                                <td className="align-middle">{item.issuedDate}</td>
                                                <td className="align-middle">{renderStatus(item)}</td>
                                                <td className="align-middle text-red">{VND.format(item.total)}</td>
                                                <td className="align-middle">

                                                    <Link className="btn btn-primary" to={`/invoicedetail/${item.id}`}>
                                                        Xem chi tiết
                                                    </Link>

                                                </td>
                                            </tr>
                                        )
                                    })

                                }

                            </tbody>
                        </table>
                    </div>
                </div>

            </>

        </Fragment>
    )
}
export default Invoice;