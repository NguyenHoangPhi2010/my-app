import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Header from "../../../components/Header";
import axios from "axios";
import Menu from "../menu";
import Invoice from "./invoice";


function InvoiceDetails() {
    const params = useParams();
    const [datadetail, setDataDetail] = useState([]);
    const [data, setData] = useState([]);
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
            })
            .catch((error) => {
                console.log(error)
            })
    }
    console.log("data", data)
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <Fragment>
            <>
                <Header />
                <Tab.Container id="left-tabs-example" defaultActiveKey="detail">
                    <Row>
                        <div className="col-lg-3 col-md-4">
                            <Menu />
                        </div>
                        <div className="col-lg-9 col-md-8">
                            <Col >
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <Invoice />
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="detail">

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
                                                <h4 className="font-weight-semi-bold m-0 pb-2"> Mã đơn hàng: {data.code} - {data.status}</h4>
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

                                                            {/* <p className="font-weight-semi-bold m-1">{data.applicationUser.fullName}</p> */}

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

                                                            <p className="font-weight-semi-bold m-1"></p>

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

                                                            <p className="font-weight-semi-bold m-1"></p>

                                                        </div>
                                                    </div>

                                                </div>


                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </div>
                    </Row>
                </Tab.Container>
            </>

        </Fragment>
    )
}
export default InvoiceDetails;