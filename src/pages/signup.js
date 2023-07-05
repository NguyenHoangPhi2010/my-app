import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import * as Yup from 'yup';
import Jquery from "../components/Jquery";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    useEffect(() => {
        sessionStorage.clear();
    }, []);
    // const CLOUDINARY_URL = "cloudinary://253985863678361:bG3hno_7JGsdL9ykeinZ2T_oxGM@dlhbykfxj"
    const [name, setName] = useState('')
    const [email, setemail] = useState('');
    const [fullname, setfullname] = useState('')
    const [password, setpassword] = useState('')
    const [passwordR, setpasswordR] = useState('')
    const [phone, setphone] = useState('')
    const [address, setaddress] = useState('')
    const [image, setImage] = useState();
    const usenavigate = useNavigate();

    const passwordSchema = Yup.string()
        .required('Mật khẩu không được để trống')
        .min(8, 'Mật khẩu phải có it nhất 8 ký tự')
        .matches(
            /^(?=.*\d)(?=.*[!@#$%?*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%?*]{8,}$/,
            "Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ thường 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt"
        );
    const Schema = Yup.object().shape({
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
            .required('Số điện thoại không được để trống'),
        name: Yup.string()
            .required('Tên đăng nhập không được để trống')
            .max(50, 'Tên đăng nhập quá dài'),
        email: Yup.string()
            .required('Email không được để trống')
            .email('Invalid email address'),
        address: Yup.string()
            .required('Địa chỉ không được để trống không được để trống'),
        fullname: Yup.string()
            .required('Họ và tên(đầy đủ) không được để trống')
            .max(50, 'Họ và tên(đầy đủ) quá dài'),

    });
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await Schema.validate({ phone, name, email, address, fullname }, { abortEarly: false });
            await passwordSchema.validate(password, passwordR, { abortEarly: false });
            if (password === passwordR) {
                let Imagepath = ''

                const formdata = new FormData()


                formdata.append("file", image)

                formdata.append("upload_preset", "fsevfoae")

                const res = await fetch(`https://api.cloudinary.com/v1_1/dlhbykfxj/image/upload`, {
                    method: 'POST',
                    body: formdata
                })
                const data = await res.json()
                Imagepath = data.secure_url

                const url = 'https://localhost:7225/Authenticate/register-admin';
                const form = {

                    "username": name,
                    "email": email,
                    "password": password,
                    "address": address,
                    "phone": phone,
                    "fullName": fullname,
                    "avatar": Imagepath,
                    "status": true,
                }

                await axios.post(url, form)
                    .then(() => {
                        clear();
                        toast.success('Đã thêm tài khoản');
                        usenavigate('/login');
                    }).catch((error) => {
                        toast.error(error);
                    })


            } else {
                toast.error('Mật khẩu không trùng khớp');
            }

        } catch (error) {
            const validationErrors = error.inner;
            validationErrors.forEach((error) => {
                toast.error(error.message);
            });
        }


    };
    const clear = () => {
        setName('');
        setemail('');
        setpassword('');
        setaddress('');
        setphone('');
        setfullname('');
        setImage('');
        // setavatar('');

    }
    return (
        <Fragment>
            <ToastContainer />
            <Jquery />
            <>


                <div >
                    <div className="main-container">

                        <div className="header-w3l">
                            <h1>Đăng ký tại đây</h1>
                        </div>


                        <div className="main-content-agile">
                            <div className="w3ls-pro">
                                <h2>Đăng ký</h2>

                            </div>
                            <div className="sub-main-w3ls">
                                <form onSubmit={handleSave} className="container">

                                    <div className="mb-3">
                                        <label
                                            htmlFor="example-text-input"
                                            className="form-control-label text-left"
                                        >
                                            Tên đăng nhập:
                                        </label>
                                        <input
                                            className="form-control"
                                            value={name} onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="example-text-input"
                                            className="form-control-label text-left"
                                        >
                                            Email:
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email} onChange={(e) => setemail(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="example-text-input"
                                            className="form-control-label text-left"
                                        >
                                            Số điện thoại:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={phone} onChange={(e) => setphone(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="example-text-input"
                                            className="form-control-label text-left"
                                        >
                                            Địa chỉ:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={address} onChange={(e) => setaddress(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="example-text-input"
                                            className="form-control-label text-left"
                                        >
                                            Họ và tên(đầy đủ):
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={fullname} onChange={(e) => setfullname(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="example-text-input"
                                            className="form-control-label text-left"
                                        >
                                            Ảnh:
                                        </label>
                                        <input className="form-control" type="file" onChange={(e) => {

                                            setImage(e.target.files[0])
                                        }} />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="example-text-input"
                                            className="form-control-label text-left"
                                        >
                                            Mật khẩu:
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password} onChange={(e) => setpassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="example-text-input"
                                            className="form-control-label text-left"
                                        >
                                            Nhập lai mật khẩu:
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={passwordR} onChange={(e) => setpasswordR(e.target.value)}
                                        />
                                    </div>
                                    <div className="text-center mb-5">
                                        <div className="w3ls-pro">
                                            <input type="submit" value="" />

                                        </div>
                                    </div>
                                    <div className="form-check form-check-info text-start">

                                        <label
                                            className="form-check-label text-left"
                                            htmlFor="flexCheckDefault"
                                        >
                                            Bạn đã có tài khoản. Đăng nhập{" "}
                                            <a
                                                href="javascript:;"
                                                className="text-dark font-weight-bolder"
                                            >
                                                <Link to='/login'>Tại Đây</Link>

                                            </a>
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Fragment>
    );
}

export default SignUp;