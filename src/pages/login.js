import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer"
import Jquery from "../components/Jquery";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');

    const usenavigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    // const ProceedLogin = (e) => {
    //     e.preventDefault();
    //     if (validate()) {
    //         ///implentation
    //         // console.log('proceed');
    //         fetch("https://localhost:7225/Authenticate/login/" + username).then((res) => {
    //             return res.json();
    //         }).then((resp) => {
    //             //console.log(resp)
    //             if (Object.keys(resp).length === 0) {
    //                 toast.error('Please Enter valid username');
    //             } else {
    //                 if (resp.password === password) {
    //                     toast.success('Success');
    //                     sessionStorage.setItem('username', username);
    //                     sessionStorage.setItem('token', resp.token);
    //                     usenavigate('/')
    //                 } else {
    //                     toast.error('Please Enter valid credentials');
    //                 }
    //             }
    //         }).catch((err) => {
    //             toast.error('Login Failed due to :' + err.message);
    //         });
    //     }
    // }

    const ProceedLoginusingAPI = (e) => {
        e.preventDefault();
        if (validate()) {
            ///implentation
            // console.log('proceed');

            let inputobj = {
                "username": username,
                "password": password
            };
            fetch("https://localhost:7225/Authenticate/login", {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(inputobj)
            }).then((res) => {
                return res.json();
            }).then((resp) => {
                //console.log(resp)
                if (resp.status === 401) {
                    toast.error('Đăng nhập thất bại');
                } else {
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('token', resp.token);
                    usenavigate('/')
                    toast.success('Đăng nhập thành công');
                }
                // if (Object.keys(resp).length === 0) {
                //     toast.error('Please Enter valid username');
                // } else {
                //     if (resp.password === password) {
                //         toast.success('Success');
                //         sessionStorage.setItem('username',username);
                //         usenavigate('/')
                //     }else{
                //         toast.error('Please Enter valid credentials');
                //     }
                // }
            }).catch((err) => {
                toast.error('Login Failed due to :' + err.message);
            });
        }
    }
    const validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Vui lòng nhập tài khoản');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Vui lòng nhập mật khẩu');
        }
        return result;
    }
    return (
        <Fragment>
            <ToastContainer />
            <Jquery />
            <>

                {/* <div className="row">
                    <div className="offset-lg-3 col-lg-6" style={{ marginTop: '100px' }}>
                        <form onSubmit={ProceedLoginusingAPI} className="container">
                            <div className="card">
                                <div className="card-header">
                                    <h2>User Login</h2>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label>User Name <span className="errmsg">*</span></label>
                                        <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Password <span className="errmsg">*</span></label>
                                        <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">Login</button> |
                                    <Link className="btn btn-success" to={'/register'}>New User</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div> */}
                <div >
                    <div className="main-container">

                        <div className="header-w3l">
                            <h1>Đăng Nhập Tại Đây</h1>
                        </div>


                        <div className="main-content-agile">
                            <div className="w3ls-pro">
                                <h2>Đăng Nhập</h2>

                            </div>
                            <div className="sub-main-w3ls">
                                <form onSubmit={ProceedLoginusingAPI} className="container">
                                    <div className="form-group">
                                        <label className="text-left">Tài khoản </label>
                                        <input value={username} onChange={e => usernameupdate(e.target.value)} className="form-control"></input>
                                    </div>
                                    <div className="form-group">
                                        <label className="text-left">Mật khẩu </label>
                                        <input type="password" value={password} onChange={e => passwordupdate(e.target.value)} className="form-control"></input>
                                    </div>


                                    <div className="text-center mb-5">
                                        <div className="w3ls-pro">
                                            <input type="submit" value="" />

                                        </div>
                                    </div>
                                </form>

                                <div className="form-check form-check-info text-start">

                                    <label
                                        className="form-check-label text-left"
                                        htmlFor="flexCheckDefault"
                                    >
                                        Bạn chưa có tài khoản. Tạo tài khoản{" "}
                                        <a
                                            href="javascript:;"
                                            className="text-dark font-weight-bolder"
                                        >
                                            <Link to='/signup'>Tại Đây</Link>

                                        </a>
                                    </label>
                                </div>
                                <div className="form-check form-check-info text-start">

                                    <label
                                        className="form-check-label text-left"
                                        htmlFor="flexCheckDefault"
                                    >
                                        Bạn đã quên mật Khẩu.
                                        <a
                                            href="javascript:;"
                                            className="text-dark font-weight-bolder"
                                        >
                                            <Link > Lấy lại mật Khẩu</Link>

                                        </a>
                                    </label>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </>
        </Fragment>
    );
}

export default Login;