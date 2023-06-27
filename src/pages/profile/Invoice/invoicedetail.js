import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Header from "../../../components/Header";
import axios from "axios";
import Menu from "../menu";
import Invoice from "./invoice";
import Jquery from "../../../components/Jquery";

function InvoiceDetails() {
    const params = useParams();
    const [datadetail, setDataDetail] = useState([]);
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(() => {
        getData();
        getDataDetail();
    }, [])
    const getDataDetail = () => {
        let id = params.id;
        axios.get(`https://localhost:7225/api/InvoiceDetails/${id}`)
            .then((result) => {
                setDataDetail(result.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    const getData = () => {
        const token = sessionStorage.getItem('token')
        let id = params.id;
        axios.get(`https://localhost:7225/api/Invoices/${id}`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then((result) => {
                setData(result.data)
                setUser(result.data.applicationUser)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const renderStatus = (item) => {
        if (item === 1) {
            return (
                <b className="text-danger text-sm font-weight-bolder ">Chờ xác nhận</b>

            )

        }
        else if (item == 2) {
            return (
                <div><b b style={{ color: "#F29727" }} className="text-sm font-weight-bolder ">Đã xác nhận</b></div>
            )
        }
        else if (item == 3) {
            return (
                <div><b style={{ color: "#F2BE22" }} className="text-sm font-weight-bolder ">Đang giao</b></div>
            )
        }
        else if (item == 4) {
            return (
                <div><b style={{ color: "#22A699" }} className="text-sm font-weight-bolder ">Đã giao</b></div>
            )
        }
        else {
            return (
                <div><b className="text-success text-sm font-weight-bolder ">Hoàn tất</b></div>
            )

        }
    }
    return (
        <Fragment>
            <Jquery />
            <>
                <div className="container-fluid bg-grey">

                    <div className="row px-xl-4 pb-3 ">

                        <div
                            className=" bg-grey "
                            style={{ padding: 10 }}
                        >
                            <Link className="d-flex align-items-center" to={`/myaccount`}>
                                <h1 className="fa fa-arrow-left bg-grey m-0 mr-2" />

                                <div className=" align-middle flex-fill pl-1">

                                    <h5 className="font-weight-semi-bold m-0"> Chi tiết đơn hàng</h5>

                                </div>
                            </Link>

                        </div>



                    </div>
                    <div className="row px-xl-5 ">
                        <h4 className="font-weight-semi-bold m-0 pb-2"> Mã đơn hàng: {data.code} - {renderStatus(data.status)}</h4>
                    </div>
                    <div className="row px-xl-5  ">
                        <p className="h6 text-grey">{data.issuedDate}</p>
                    </div>
                    <div className="row px-xl-5 pb-3 ">
                        <table className="table table-light table-borderless table-hover  ">

                            <tbody className="align-middle">
                                {

                                    datadetail.map((item, Index) => {
                                        return (

                                            <tr key={Index}>
                                                <td className="align-middle">
                                                    <img src={`../ASSETS/image/${item.product.image}`} alt="" style={{ width: 180 }} />

                                                </td>
                                                <td>
                                                    <Link className="h6 text-uppercase" to={`../detail/${item.product.id}`}> {item.product.name}</Link>
                                                    <p className="mb-4.5">Số lượng: {item.quantity}</p>

                                                    <h6 className="text-red">{VND.format(item.product.price)}</h6>


                                                </td>

                                                <td className="text-lg-right">
                                                    <button className="btn btn-sm btn-danger">
                                                        Đánh giá
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })

                                }

                            </tbody>
                        </table>
                    </div>
                    <div className="px-xl-4 pb-3 ">

                        <div
                            className=" bg-grey "
                            style={{ padding: 10 }}
                        >
                            <div className="d-flex align-items-center">


                                <div className=" align-middle flex-fill pl-1">

                                    <h4 className="font-weight-semi-bold m-0">Thông tin khách hàng</h4>

                                </div>
                            </div>

                        </div>
                        <div
                            className=" bg-grey "
                            style={{ padding: 5 }}
                        >
                            <div className="d-flex bg-grey align-items-center">
                                <h3 className="fa fa-user bg-grey m-0 mx-4" />

                                <div className=" align-middle flex-fill pl-1">

                                    <p className="font-weight-semi-bold m-1">{user.fullName}</p>

                                </div>
                            </div>

                        </div>
                        <div
                            className=" bg-grey "
                            style={{ padding: 5 }}
                        >
                            <div className="d-flex bg-grey align-items-center">
                                <h3 className="fa fa-phone bg-grey m-0 mx-4" />

                                <div className=" align-middle flex-fill pl-1">

                                    <p className="font-weight-semi-bold m-1">{user.phoneNumber}</p>

                                </div>
                            </div>

                        </div>
                        <div
                            className=" bg-grey "
                            style={{ padding: 5 }}
                        >
                            <div className="d-flex bg-grey align-items-center">
                                <h3 className="fa fa-map-marker bg-grey m-0 mx-4" />

                                <div className=" align-middle flex-fill pl-1">

                                    <p className="font-weight-semi-bold m-1">{user.address}</p>

                                </div>
                            </div>

                        </div>


                    </div>
                </div>


            </>

        </Fragment>
    )
}
export default InvoiceDetails;