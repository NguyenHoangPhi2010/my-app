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


    const [datadetail, setDataDetail] = useState([]);
    useEffect(() => {
        getData();
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

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    var tong = data.reduce((a, v) => a = a + v.total, 0)


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
                                                <td className="align-middle"><span className="btn-grey">{item.status}</span></td>
                                                <td className="align-middle text-red">{VND.format(item.total)}</td>
                                                <td className="align-middle">

                                                    <Link className="btn btn-primary" on to={`/invoicedetail/${item.id}`}>
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