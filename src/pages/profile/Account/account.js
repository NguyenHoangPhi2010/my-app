import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import * as Yup from 'yup';
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form } from "react-bootstrap";

const Account = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); }
    const handleShow = () => setShow(true);
    const [userName, setUserName] = useState('')
    const [fullname, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    const [editID, setEditId] = useState('');
    const [data, setData] = useState([]);
    const [datainvoice, setDataInVoice] = useState([]);
    const [disabledFN, setDisabledFN] = useState(true);
    const [disabledE, setDisabledE] = useState(true);
    const [disabledP, setDisabledP] = useState(true);
    const [disabledA, setDisabledA] = useState(true);
    const [password, setPassWord] = useState('')
    const [passwordNew, setPassWordNew] = useState('')
    const [passwordS, setPassWordS] = useState('')
    const usenavigate = useNavigate();
    useEffect(() => {
        getData();
        getDataInvoice();
    }, [])
    const editFullName = () => {
        setDisabledFN(!disabledFN);
    };
    const editPhone = () => {
        setDisabledP(!disabledP);
    };
    const editAddress = () => {
        setDisabledA(!disabledA);
    };
    const editEmail = () => {
        setDisabledE(!disabledE);
    };
    const getData = () => {
        const token = sessionStorage.getItem('token')
        axios.get('https://localhost:7225/api/Accounts/GetUser', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                setEditId(result.data.id)
                setData(result.data)
                setUserName(result.data.userName)
                setFullName(result.data.fullName)
                setAddress(result.data.address)
                setEmail(result.data.email)
                setPhone(result.data.phoneNumber)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getDataInvoice = () => {
        const token = sessionStorage.getItem('token')
        if (token == null) {
            console.log("Cart null")
        } else {
            axios.get('https://localhost:7225/api/Invoices', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then((result) => {
                    setDataInVoice(result.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }
    var tong = datainvoice.reduce((a, v) => a = a + v.total, 0)
    const passwordSchema = Yup.string()
        .required('Mật khẩu không được để tróng')
        .min(8, 'Mật khẩu phải dài ít nhất 8 ký tự')
        .matches(
            /^(?=.*\d)(?=.*[!@#$%?*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%?*]{8,}$/,
            "Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt"
        );
    const Schema = Yup.object().shape({
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
            .required('Số điện thoại không được để trống'),
        email: Yup.string()
            .required('Email không được để trống')
            .email('Invalid email address'),
        address: Yup.string()
            .required('Địa chỉ không được để trống không được để trống'),
        fullname: Yup.string()
            .required('Họ và tên(đầy đủ) không được để trống')
            .max(50, 'Họ và tên(đầy đủ) quá dài'),

    });
    const handleUpdate = async () => {

        try {
            await Schema.validate({ phone, email, address, fullname }, { abortEarly: false });
            const url = `https://localhost:7225/api/Accounts/${editID}`;
            const data1 = {
                "address": address,
                "fullName": fullname,
                "avatar": data.avatar,
                "status": data.status,
                "id": editID,
                "userName": data.userName,
                "normalizedUserName": data.normalizedUserName,
                "email": email,
                "normalizedEmail": email.toUpperCase(),
                "emailConfirmed": false,
                "passwordHash": data.papasswordHash,
                "securityStamp": data.securityStamp,
                "concurrencyStamp": data.concurrencyStamp,
                "phoneNumber": phone,
                "phoneNumberConfirmed": false,
                "twoFactorEnabled": false,
                "lockoutEnd": null,
                "lockoutEnabled": true,
                "accessFailedCount": 0
            }
            axios.put(url, data1)
                .then((result) => {
                    getData();
                    setDisabledE(true);
                    setDisabledA(true);
                    setDisabledFN(true);
                    setDisabledP(true)
                    toast.success('Đã thay đổi thành công');
                }).catch((error) => {
                    toast.error(error);
                })

        } catch (err) {
            const validationErrors = err.inner;
            validationErrors.forEach((error) => {
                toast.error(error.message);
            });
        }

    }
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const handleChangePassWord = async () => {
        try {
            await passwordSchema.validate(passwordNew, { abortEarly: false });
            await passwordSchema.validate(passwordS, { abortEarly: false });

            if (passwordNew !== passwordS) {
                toast.error('Mật khẩu mới và mật khẩu xác nhận không trùng khớp');
            } else {
                const url = 'https://localhost:7225/api/Accounts/ChangePassword'
                const data = {
                    "username": userName,
                    "oldPassword": password,
                    "newPassword": passwordNew
                }
                axios.put(url, data)
                    .then((result) => {
                        toast.success('Đã thay đổi thành công');
                        usenavigate('/login')
                    }).catch((error) => {
                        toast.error("Đã thay đổi không thành công");
                    })
            }
            toast.success('Đã thay đổi thành công');
        } catch (err) {
            const validationErrors = err.inner;
            validationErrors.forEach((error) => {
                toast.error(error.message);
            });
        }


    }
    return (
        <Fragment>
            <ToastContainer />
            <div className="container-fluid py-4 mb-41">

                <div className="col-12 ">
                    <div className="card">
                        <h5 className="mt-5" style={{ paddingLeft: '50px', }}>Thông tin tài khoảng</h5>
                        <div className="row  mb-41">
                            <div className=" col-md-8 mb-auto">
                                <div className="forms-group">
                                    <label
                                        htmlFor="example-text-input"
                                        className="forms-control-label"
                                    >
                                        Họ và tên:
                                    </label>
                                    <div className="d-flex justify-content-lg-end justify-content-center align-items-center">
                                        <input
                                            className="forms-control input-lg"
                                            placeholder="Nhập họ và tên"
                                            value={fullname} onChange={(e) => {
                                                setFullName(e.target.value);
                                            }}
                                            disabled={disabledFN}

                                        />
                                        <button className="btn btn-icon" onClick={() => editFullName()}>
                                            <i className="fa fa-wrench" />
                                        </button>
                                    </div>
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
                                    <div className="d-flex justify-content-lg-end justify-content-center align-items-center">
                                        <input
                                            className="forms-control"
                                            placeholder="Nhập số điện thoại"
                                            value={phone} onChange={(e) => setPhone(e.target.value)}
                                            disabled={disabledP}
                                        />
                                        <button className="btn btn-icon" onClick={() => editPhone()}>
                                            <i className="fa fa-wrench" />
                                        </button>
                                    </div>
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
                                    <div className="d-flex justify-content-lg-end justify-content-center align-items-center">
                                        <input
                                            className="forms-control"
                                            placeholder="Nhập thông tin của GPU"
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            disabled={disabledE}
                                        />
                                        <button className="btn btn-icon" onClick={() => editEmail()}>
                                            <i className="fa fa-wrench" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 mb-auto ">
                                <div className="forms-group">
                                    <label
                                        htmlFor="example-text-input"
                                        className="forms-control-label"
                                    >
                                        Tổng tiền đã nua sắm
                                    </label>

                                    <input
                                        className="forms-control ml-1"
                                        placeholder="Nhập thông tin của GPU"
                                        value={VND.format(tong)}
                                        disabled
                                    />

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
                                    <div className="d-flex justify-content-lg-end justify-content-center align-items-center">
                                        <textarea
                                            rows={3}
                                            className="forms-control"
                                            placeholder="Nhập thông tin của màn hình"
                                            value={address} onChange={(e) => setAddress(e.target.value)}
                                            disabled={disabledA}
                                        />
                                        <button className="btn btn-icon" onClick={() => editAddress()}>
                                            <i className="fa fa-wrench" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-8 mb-auto mt-2 my-2">
                                <button className="forms-control mb-2" onClick={
                                    () => { handleShow() }}>Đổi mật khẩu
                                </button>
                                <button className="btn btn-primary formss-control" onClick={
                                    () => { handleUpdate() }}>Cập nhật thông tin
                                </button>
                            </div>

                        </div>



                    </div>
                </div>



            </div>



            <Modal show={show} onHide={handleClose} className="container-fluid mt-5">
                <Modal.Header >
                    <Modal.Title>Tạo mật khẩu mới
                    </Modal.Title>
                    <button className="btn btn-sm btn-danger" onClick={() => handleClose()}>
                        <i className="fa fa-times" />
                    </button>
                </Modal.Header>
                <Modal.Body >
                    <Form.Floating className="mb-3">
                        <label htmlFor="floatingInputCustom" className="font-weight-semi-bold h6">Nhập mật khẩu hiện tại</label>
                        <Form.Control
                            className="forms-control ml-1 mt-2"
                            id="floatingInputCustom"
                            type="password"
                            placeholder="Nhập mật khẩu hiện tạo của bạn"
                            value={password} onChange={(e) => setPassWord(e.target.value)}
                        />

                    </Form.Floating>
                    <Form.Floating>
                        <label htmlFor="floatingPasswordCustom" className="font-weight-semi-bold h6">Tạo mật khẩu mới</label>
                        <Form.Control
                            className="forms-control ml-1 mt-2"
                            id="floatingPasswordCustom"
                            type="password"
                            placeholder="Nhập mật khẩu mới của bạn"
                            value={passwordNew} onChange={(e) => setPassWordNew(e.target.value)}
                        />
                        <p className="text-red">Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt</p>
                        <Form.Control
                            className="forms-control ml-1 mt-2"
                            id="floatingPasswordCustom"
                            type="password"
                            placeholder="Xác nhận lại mật khẩu"
                            value={passwordS} onChange={(e) => setPassWordS(e.target.value)}
                        />
                    </Form.Floating>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary formss-control" onClick={
                        () => { handleChangePassWord() }}>Xác nhận
                    </button>
                </Modal.Footer>
            </Modal>

        </Fragment>

    )
}
export default Account