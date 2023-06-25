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
const Account = () => {
    const [fullname, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    const [editID, setEditId] = useState('');
    const [editfulname, setEditFullName] = useState('')
    const [editphone, setEditPhone] = useState('')
    const [editemail, setEditEmail] = useState('')
    const [editaddress, setEditAddress] = useState('')
    const [data, setData] = useState([]);
    const [disabled, setDisabled] = useState(true);


    useEffect(() => {
        getData();
    }, [])
    const toggleInput = () => {
        setDisabled(!disabled);
    };
    const getData = () => {
        const token = sessionStorage.getItem('token')
        axios.get('https://localhost:7225/api/Accounts/GetUser', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                setData(result.data)
                setFullName(result.data.fullName)
                setAddress(result.data.address)
                setEmail(result.data.email)
                setPhone(result.data.phoneNumber)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <Fragment>
            <ToastContainer />



            <div className="container-fluid py-4 mb-41">

                <div className="col-12">
                    <div className="card">
                        <h5 style={{ paddingLeft: '50px', }}>Thông tin tài khoảng</h5>
                        <div className="row  mb-41">
                            <div className=" col-md-8 mb-auto">
                                <div className="form-group">
                                    <label
                                        htmlFor="example-text-input"
                                        className="forms-control-label"
                                    >
                                        Họ và tên:
                                    </label>
                                    <input
                                        className="forms-control input-lg"
                                        type="text" placeholder="Nhập Mã sản phẩm"
                                        value={fullname} onChange={(e) => {
                                            setEditFullName(e.target.value);
                                        }}

                                        disabled={disabled}
                                    />

                                </div>
                            </div>
                            <div className=" col-md-8 mb-auto">
                                <div className="forms-group">
                                    <label
                                        htmlFor="example-text-input"
                                        className="forms-control-label"
                                    >
                                        Số điện thoại:
                                    </label>
                                    <input
                                        className="forms-control"
                                        placeholder="Nhập thông tin của GPU"
                                        value={phone} onChange={(e) => setEditPhone(e.target.value)}
                                        disabled={disabled} />

                                </div>
                            </div>
                            <div className="col-md-8 mb-auto">
                                <div className="forms-group">
                                    <label
                                        htmlFor="example-text-input"
                                        className="forms-control-label"
                                    >
                                        Email:
                                    </label>
                                    <input
                                        className="forms-control"
                                        placeholder="Nhập thông tin của GPU"
                                        value={email} onChange={(e) => setEditEmail(e.target.value)}
                                        disabled={disabled} />
                                </div>
                            </div>
                            <div className="col-md-8 mb-auto">
                                <div className="forms-group">
                                    <label
                                        htmlFor="example-text-input"
                                        className="forms-control-label"
                                    >
                                        Đia chỉ:
                                    </label>
                                    <textarea

                                        rows={3}
                                        className="form-control"
                                        placeholder="Nhập thông tin của màn hình"
                                        value={address} onChange={(e) => setEditAddress(e.target.value)}
                                        disabled={disabled} />
                                </div>
                            </div>
                            <div className="col-md-8 mb-auto">
                                <button className="btn btn-primary" onClick={
                                    () => { toggleInput() }}>Chỉnh sửa
                                </button>
                            </div>
                        </div>



                    </div>
                </div>



            </div>





        </Fragment>
    )
}
export default Account