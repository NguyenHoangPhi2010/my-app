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
function Checkout() {

    const [shippingAddress, SetshippingAddress] = useState('')
    const [shippingPhone, SetshippingPhone] = useState('')
    const [data, setData] = useState([]);
    const usenavigate = useNavigate();
    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        const token = sessionStorage.getItem('token')
        if (token == null) {
            console.log("Cart null")
        } else {
            axios.get('https://localhost:7225/api/Carts', {
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
    const handleupdatequantitydecrease = (item) => {
        const url = `https://localhost:7225/api/Carts/${item.id}`;
        const data = {
            "id": item.id,
            "accountId": item.accountId,
            "productId": item.productId,
            "quantity": item.quantity + 1
        }
        axios.put(url, data)
            .then(() => {
                getData();
            }).catch((error) => {
                toast.error(error);
            })
    }
    const handleupdatequantityincrease = (item) => {
        const url = `https://localhost:7225/api/Carts/${item.id}`;
        const data = {
            "id": item.id,
            "accountId": item.accountId,
            "productId": item.productId,
            "quantity": item.quantity - 1
        }
        if (data.quantity <= 0) {
            handleDelect(data.id)
        } else {
            axios.put(url, data)
                .then(() => {
                    getData();
                }).catch((error) => {
                    toast.error(error);
                })
        }

    }
    const handleDelect = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng") == true) {
            axios.delete(`https://localhost:7225/api/Carts/${id}`)
                .then((result) => {
                    toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
                    getData();
                })
                .catch((error) => {
                    toast.error(error);
                })
        }
    }
    const handleCheckOut = () => {
        const token = sessionStorage.getItem('token')
        console.log('ok', token)
        const url = 'https://localhost:7225/api/Invoices';
        const data = {
            "code": "string",
            "applicationUserId": "string",
            "applicationUser": null,
            "issuedDate": "2023-05-20T14:04:06.905Z",
            "shippingAddress": shippingAddress,
            "shippingPhone": shippingPhone,
            "total": 0,
            "status": "string"
        }
        console.log('ok', data)
        axios.post(url, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(() => {
                toast.success('Đơn hàng đang chờ xác nhận vui lòng đợi');
                usenavigate('/profile')
            }).catch((error) => {
                toast.error(error);
            })
    }

    return (
        <Fragment>
            <ToastContainer />
            <>
                <Header />
                {/* Checkout Start */}
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-lg-8">
                            <h5 className="section-title position-relative text-uppercase mb-3">
                                <span className="bg-secondary pr-3">Billing Address</span>
                            </h5>
                            <div className="bg-light p-30 mb-5">
                                <div className="row">
                                    {/* <div className="col-md-6 form-group">
                                        <label>First Name</label>
                                        <input className="form-control" type="text" placeholder="John" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Last Name</label>
                                        <input className="form-control" type="text" placeholder="Doe" />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>E-mail</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="example@email.com"
                                        />
                                    </div> */}
                                    <div className="col-md-6 form-group">
                                        <label>Số điện thoại</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Nhập số điện thoại"
                                            value={shippingPhone} onChange={(e) => SetshippingPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Địa chỉ</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="Nhập Địa chỉ"
                                            value={shippingAddress} onChange={(e) => SetshippingAddress(e.target.value)}
                                        />
                                    </div>
                                    {/* <div className="col-md-6 form-group">
                                        <label>Address Line 2</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="123 Street"
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>Country</label>
                                        <select className="custom-select">
                                            <option selected="">United States</option>
                                            <option>Afghanistan</option>
                                            <option>Albania</option>
                                            <option>Algeria</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>City</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="New York"
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>State</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            placeholder="New York"
                                        />
                                    </div>
                                    <div className="col-md-6 form-group">
                                        <label>ZIP Code</label>
                                        <input className="form-control" type="text" placeholder={123} />
                                    </div>
                                    <div className="col-md-12 form-group">
                                        <div className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="newaccount"
                                            />
                                            <label className="custom-control-label" htmlFor="newaccount">
                                                Create an account
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                className="custom-control-input"
                                                id="shipto"
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor="shipto"
                                                data-toggle="collapse"
                                                data-target="#shipping-address"
                                            >
                                                Ship to different address
                                            </label>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            {/* <div className="collapse mb-5" id="shipping-address">
                                <h5 className="section-title position-relative text-uppercase mb-3">
                                    <span className="bg-secondary pr-3">Shipping Address</span>
                                </h5>
                                <div className="bg-light p-30">
                                    <div className="row">
                                        <div className="col-md-6 form-group">
                                            <label>First Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label>Last Name</label>
                                            <input className="form-control" type="text" placeholder="Doe" />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label>E-mail</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="example@email.com"
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label>Mobile No</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="+123 456 789"
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label>Address Line 1</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="123 Street"
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label>Address Line 2</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="123 Street"
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label>Country</label>
                                            <select className="custom-select">
                                                <option selected="">United States</option>
                                                <option>Afghanistan</option>
                                                <option>Albania</option>
                                                <option>Algeria</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label>City</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="New York"
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label>State</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="New York"
                                            />
                                        </div>
                                        <div className="col-md-6 form-group">
                                            <label>ZIP Code</label>
                                            <input className="form-control" type="text" placeholder={123} />
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="col-lg-4">

                            <div className="mb-5">
                                <h5 className="section-title position-relative text-uppercase mb-3">
                                    <span className="bg-secondary pr-3">Payment</span>
                                </h5>
                                <div className="bg-light p-30">
                                    <div className="form-group">
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                name="payment"
                                                id="paypal"
                                            />
                                            <label className="custom-control-label" htmlFor="paypal">
                                                Paypal
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                name="payment"
                                                id="directcheck"
                                            />
                                            <label className="custom-control-label" htmlFor="directcheck">
                                                Direct Check
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group mb-4">
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                name="payment"
                                                id="banktransfer"
                                            />
                                            <label className="custom-control-label" htmlFor="banktransfer">
                                                Bank Transfer
                                            </label>
                                        </div>
                                    </div>
                                    <button className="btn btn-block btn-primary font-weight-bold py-3" onClick={() => handleCheckOut()}>
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row px-xl-4">
                            <h5 className="section-title position-relative text-uppercase mb-3">
                                <span className="bg-secondary pr-3">
                                    Review Cart
                                </span>
                            </h5>
                            <table className="table table-light table-borderless table-hover text-center mb-0">
                                <thead className="thead-dark">
                                    <tr>
                                        <th></th>
                                        <th>Products</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody className="align-middle">
                                    {

                                        data.map((item, Index) => {
                                            return (

                                                <tr key={Index}>
                                                    <td className="align-middle">
                                                        <img src={`../ASSETS/image/${item.product.image}`} alt="" style={{ width: 200 }} />{" "}

                                                    </td>
                                                    <td className="align-middle">{item.product.name}</td>
                                                    <td className="align-middle">{VND.format(item.product.price)}</td>
                                                    <td className="align-middle">
                                                        <div
                                                            className="input-group quantity mx-auto"
                                                            style={{ width: 100 }}
                                                        >
                                                            <div className="input-group-btn">
                                                                <button className="btn btn-sm btn-primary btn-minus" onClick={() => handleupdatequantityincrease(item)}>
                                                                    <i className="fa fa-minus" />
                                                                </button>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm bg-secondary border-0 text-center"
                                                                Value={item.quantity}
                                                            />

                                                            <div className="input-group-btn">
                                                                <button className="btn btn-sm btn-primary btn-plus" onClick={() => handleupdatequantitydecrease(item)}>
                                                                    <i className="fa fa-plus" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="align-middle" >{VND.format(item.quantity * item.product.price)}</td>
                                                    <td className="align-middle">
                                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelect(item.id)}>
                                                            <i className="fa fa-times" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })

                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
                {/* Checkout End */}
                <Footer />
            </>

        </Fragment>
    )
}
export default Checkout;