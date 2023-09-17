import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
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
    const [showAddress, setShowAddress] = useState(false);
    const handleCloseAddress = () => { setShow(false); }
    const handleShowAddress = () => setShow(true);
    const [userName, setUserName] = useState('')
    const [fullname, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
<<<<<<< HEAD
=======

>>>>>>> f125f77413c46b346417db359020eb1a320fca1c
    const [editID, setEditId] = useState('');
    const [data, setData] = useState([]);
    const [datainvoice, setDataInVoice] = useState([]);
    const [disabledFN, setDisabledFN] = useState(true);
    const [disabledE, setDisabledE] = useState(true);
    const [disabledP, setDisabledP] = useState(true);
    const [disabledA, setDisabledA] = useState(true);
    const [disabledA1, setDisabledA1] = useState(true);
    const [password, setPassWord] = useState('')
    const [passwordNew, setPassWordNew] = useState('')
    const [passwordS, setPassWordS] = useState('')
    const [editcyti, setEditCyti] = useState([]);
    const [editdistrict, setEditDistrict] = useState([])
    const [editward, setEditWard] = useState([])
    const [editaddress, setEditAddress] = useState('')
    const [dataTrue, setDataTrue] = useState([]);
    const usenavigate = useNavigate();
    useEffect(() => {
        getData();
        getDataInvoice();
        getaccountaddress();
        getDataStatus();
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
    const editAddress1 = () => {
        setDisabledA1(!disabledA1);
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
                setAddress1(result.data.address1)
                setAddress2(result.data.address2)
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
    var tong = dataTrue.reduce((a, v) => a = a + v.total, 0)
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
<<<<<<< HEAD
=======
        address1: Yup.string()
            .required('Địa chỉ không được để trống không được để trống'),
        address2: Yup.string()
            .required('Địa chỉ không được để trống không được để trống'),
>>>>>>> f125f77413c46b346417db359020eb1a320fca1c
        fullname: Yup.string()
            .required('Họ và tên(đầy đủ) không được để trống')
            .max(50, 'Họ và tên(đầy đủ) quá dài'),

    });
    const handleUpdate = async () => {

        try {
<<<<<<< HEAD
            await Schema.validate({ phone, email, fullname }, { abortEarly: false });
=======
            await Schema.validate({ phone, email, address1, address2, fullname }, { abortEarly: false });
>>>>>>> f125f77413c46b346417db359020eb1a320fca1c
            const url = `https://localhost:7225/api/Accounts/${editID}`;
            const data1 = {
                "address1": address1,
                "address2": address2,
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
                    setDisabledA1(true);
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
    const getaccountaddress = async () => {
        const token = sessionStorage.getItem('token')
        await axios.get('https://localhost:7225/api/AccountAddresss/GetAccountAddressDefault', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {


                setEditCyti(result.data.cyti);
                setEditDistrict(result.data.district);
                setEditWard(result.data.ward);
                setEditAddress(result.data.address);
            })
            .catch((error) => {
                console.log(error)
            })
    }
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
    return (
        <Fragment>
            <ToastContainer />
            <div className="container-fluid py-4 mb-41">

                <div className="col-12 ">
                    <div className="card">
                        <h5 className="mt-5" style={{ paddingLeft: '50px', }}>Thông tin tài khoản</h5>
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
<<<<<<< HEAD
                                        Đia chỉ :
=======
                                        Đia chỉ 1:
>>>>>>> f125f77413c46b346417db359020eb1a320fca1c
                                    </label>
                                    <div className="d-flex justify-content-lg-end justify-content-center align-items-center">
                                        <textarea
                                            rows={1}
                                            className="forms-control"
                                            placeholder="Nhập thông tin của màn hình"
<<<<<<< HEAD
                                            value={editaddress + "," + editward + "," + editdistrict + "," + editcyti}
                                            disabled={disabledA1}
=======
                                            value={address1} onChange={(e) => setAddress1(e.target.value)}
                                            disabled={disabledA}
>>>>>>> f125f77413c46b346417db359020eb1a320fca1c
                                        />
                                        <Link className="btn btn-icon" to={"../accountaddress"}>
                                            <i className="fa fa-wrench" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
<<<<<<< HEAD
                            <div className="col-md-8 mb-auto mt-3">
=======
                            <div className="col-md-8 mb-auto">
                                <div className="forms-group">
                                    <label
                                        htmlFor="example-text-input"
                                        className="forms-control-label"
                                    >
                                        Đia chỉ 2:
                                    </label>
                                    <div className="d-flex justify-content-lg-end justify-content-center align-items-center">
                                        <textarea
                                            rows={3}
                                            className="forms-control"
                                            placeholder="Nhập thông tin của màn hình"
                                            value={address2} onChange={(e) => setAddress2(e.target.value)}
                                            disabled={disabledA1}
                                        />
                                        <button className="btn btn-icon" onClick={() => editAddress1()}>
                                            <i className="fa fa-wrench" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 mb-auto mt-2 my-2">
>>>>>>> f125f77413c46b346417db359020eb1a320fca1c
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
            <Modal show={showAddress} onHide={handleCloseAddress} className="container-fluid mt-5">
                <Modal.Header >
                    <Modal.Title>Tạo mật khẩu mới
                    </Modal.Title>
                    <button className="btn btn-sm btn-danger" onClick={() => handleCloseAddress()}>
                        <i className="fa fa-times" />
                    </button>
                </Modal.Header>
                <Modal.Body >

                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary formss-control" onClick={
                        () => { }}>Xác nhận
                    </button>
                </Modal.Footer>
            </Modal>

        </Fragment>

    )
}
export default Account