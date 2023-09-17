import React, { Fragment, useEffect, useState, } from "react";
import * as Yup from 'yup';
import Jquery from "../components/Jquery";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import AccountAddress from "./profile/Account/accountAddress";
function Checkout() {
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const params = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [accountaddress, setAccountAddress] = useState([]);
    const [datauser, setDataUser] = useState([]);
    const [amount, setAmount] = useState(0);
    const total = params.total;
    const usenavigate = useNavigate();
    const [values, setValues] = useState([])
    const [options, setOptions] = useState()
    const [options1, setOptions1] = useState()
    const [options2, setOptions2] = useState()
    const [Cytis, setCytis] = useState([]);
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [cyti, setCyti] = useState([]);
    const [district, setDistrict] = useState([])
    const [ward, setWard] = useState([])
    const [editcyti, setEditCyti] = useState([]);
    const [editdistrict, setEditDistrict] = useState([])
    const [editward, setEditWard] = useState([])
    const [editaddress, setEditAddress] = useState('')
    useEffect(() => {
        getUser();
        getData();
        getCyti();
        getaccountaddress()
    }, [])
    const token = sessionStorage.getItem('token')
    const getData = async () => {

        await axios.get('https://localhost:7225/api/Carts', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getUser = async () => {
        await axios.get('https://localhost:7225/api/Accounts/GetUser', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {

                setDataUser(result.data)



            })
            .catch((error) => {
                console.log(error)
            })
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
            toast.error("Giá trị đã giảm xuống mức tối thiểu")
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
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng") === true) {
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
    const Schema = Yup.object().shape({
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
            .required('Số điện thoại không được để trống'),
        editaddress: Yup.string()
            .required('Địa chỉ không được để trống'),
        editcyti: Yup.string()
            .required('Thành Phố  không được để trống'),
        editdistrict: Yup.string()
            .required('Quận,huyện không được để trống'),
        editward: Yup.string()
            .required('Phường, Xã không được để trống'),


    });
    const handleCheckOut = async () => {
        try {
            await Schema.validate({ phone, editaddress, editcyti, editdistrict, editward }, { abortEarly: false });
            const token = sessionStorage.getItem('token')
            const url = 'https://localhost:7225/api/Invoices';
            const data = {
                "code": "string",
                "applicationUserId": "string",
                "applicationUser": null,
                "issuedDate": "2023-05-20T14:04:06.905Z",
                "shippingAddress": editaddress + "," + editward + "," + editdistrict + "," + editcyti,
                "shippingPhone": phone,
                "total": 0,
                "status": 1
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
        } catch (error) {
            const validationErrors = error.inner;
            validationErrors.forEach((error) => {
                toast.error(error.message);
            });
        }

    }
    const handleCheckOutPayPal = () => {
        console.log(editaddress, editcyti, editdistrict, editward)
        const token = sessionStorage.getItem('token')
        const url = 'https://localhost:7225/api/Invoices';
        const data = {
            "code": "string",
            "applicationUserId": "string",
            "applicationUser": null,
            "issuedDate": "2023-05-20T14:04:06.905Z",
            "shippingAddress": editaddress + "," + editward + "," + editdistrict + "," + editcyti,
            "shippingPhone": phone,
            "total": 0,
            "status": 1
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
    const tong = data.reduce((a, v) => a = a + (v.product.price - (v.product.productPromotion.percent * v.product.price) / 100) * v.quantity, 0);
    const getCyti = () => {
        axios.get('https://provinces.open-api.vn/api/?depth=3')
            .then((result) => {
                setCytis(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getaccountaddress = async () => {
        const token = sessionStorage.getItem('token')
        await axios.get('https://localhost:7225/api/AccountAddresss/GetAccountAddressDefault', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                setUser(result.data.applicationUser)
                setPhone(result.data.applicationUser.phoneNumber)
                setAccountAddress(result.data);
                setEditCyti(result.data.cyti);
                setEditDistrict(result.data.district);
                setEditWard(result.data.ward);
                setEditAddress(result.data.address);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (

        <Fragment>
            <ToastContainer />
            <Jquery />


            {/* Checkout Start */}
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Địa chỉ thanh toán</span>
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
                                        value={phone} onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>Địa chỉ</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Nhập Địa chỉ"
                                        value={editaddress} onChange={(e) => setEditAddress(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-10 mb-auto">
                                    <label>Thành Phố, Tỉnh</label>
                                    <select className="custom-select"
                                        onChange={(e) => {
                                            setEditCyti(e.target.value)
                                            console.log(e.target.selectedIndex)
                                            if (e.target.selectedIndex <= 2) {

                                                const target = Cytis[0].districts
                                                setDistricts(target)
                                            } else {
                                                const target = Cytis[e.target.selectedIndex - 2].districts
                                                setDistricts(target)
                                            }


                                        }}>
                                        <option selected="">{editcyti}</option>
                                        <option selected="">Chọn Tỉnh/Thành Phố(*)</option>
                                        {
                                            Cytis.map((type, i) =>
                                                <option key={i} value={type.id} selected={type.id}>
                                                    <div>{type.name}
                                                    </div>
                                                </option>)
                                        }
                                    </select>
                                </div>
                                <div className="col-md-10 mb-auto mt-3">
                                    <label>Quận, Huyện</label>
                                    <select className="custom-select"
                                        onChange={(e) => {
                                            setEditDistrict(e.target.value)
                                            console.log(e.target.selectedIndex)
                                            if (e.target.selectedIndex <= 2) {

                                                const target = districts[0].wards
                                                setWards(target);
                                            } else {
                                                const target = districts[e.target.selectedIndex - 2].wards
                                                setWards(target);
                                            }


                                        }}>
                                        <option selected="">{editdistrict}</option>
                                        <option selected="">Chọn Quận/Huyện(*)</option>
                                        {
                                            districts.map((type, i) =>
                                                <option key={i} value={type.id} selected={type.id}>
                                                    <div>{type.name}
                                                    </div>
                                                </option>)
                                        }
                                    </select>


                                </div>
                                <div className="col-md-10 mb-auto  mt-3">
                                    <label>Phường, xã</label>
                                    <select className="custom-select"
                                        onChange={(e) => {
                                            setEditWard(e.target.value)
                                        }}>
                                        <option selected="">{editward}</option>
                                        <option selected="">Chọn Phường/Xã(*)</option>
                                        {
                                            wards.map((type, i) =>
                                                <option key={i} value={type.id} selected={type.id}>
                                                    <div>{type.name}
                                                    </div>
                                                </option>)
                                        }
                                    </select>
                                </div>
                                {/* <select className="form-control"
                                                    onChange={(e) => {
                                                        setOptions(e.target.value)

                                                        const targetPromotion = values.filter(i => i.id == e.target.value)

                                                        setOptions(targetPromotion[0])
                                                        setValuesmap(targetPromotion[0])
                                                        console.log("options", valuemap)

                                                    }} >
                                                    <option value="">Nhấn để chọn</option>
                                                    {
                                                        values.map((type, i) =>
                                                            <option key={i} value={type.id}>
                                                                <div>{type.name}
                                                                </div>

                                                            </option>)
                                                    }
                                                </select> */}
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
                                <span className="bg-secondary pr-3">Phương thức thanh toán</span>
                            </h5>
                            <div className="bg-light p-30">
                                {/* <div className="form-group">
                                        <div className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                name="payment"
                                                id="paypal"
                                            />
                                            <label className="custom-control-label" htmlFor="paypal">
                                                Thanh toán khi nhận hàng
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
                                                Vnpay
                                            </label>
                                        </div>
                                    </div> */}
                                <button className="btn btn-block btn-primary font-weight-bold py-3 mb-3" onClick={() => handleCheckOut()}>
                                    Thanh toán khi nhận hàng
                                </button>
                                <PayPalScriptProvider
                                    options={{
                                        "client-id": "ARl5CAahmrncZ_zkVbwJHW6tR8VbMxsUDElhwrMfAtzXQ-bygUPEQ1rYVh9p64g5_hvoxp5fWIpBrpKK",
                                        components: "buttons",
                                        currency: "USD"
                                    }}
                                >
                                    <PayPalButtons

                                        currency="USD"
                                        createOrder={(data, actions) => {
                                            {
                                                setAmount(total)
                                            }
                                            return actions.order.create({

                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: total, // Sử dụng giá trị từ state amount
                                                        },
                                                    },
                                                ],
                                            });
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then((details) => {
                                                if (details.status === "COMPLETED") {
                                                    getCyti();
                                                    getaccountaddress();
                                                    handleCheckOutPayPal();
                                                    console.log(details)
                                                    console.log(data)
                                                } else {
                                                    toast.error("Thanh toán không thành công vui lòng thử lại")
                                                }
                                            });
                                        }}
                                    />
                                </PayPalScriptProvider>

                            </div>
                        </div>
                    </div>
                    <div className="row px-xl-4">
                        <div className="col-lg-8">
                            <h5 className="section-title position-relative text-uppercase mb-3">
                                <span className="bg-secondary pr-3">
                                    Xem lại giỏ hàng
                                </span>
                            </h5>
                            <table className="table table-light table-borderless table-hover text-center mb-0">
                                <thead className="thead-dark">
                                    <tr>
                                        <th></th>
                                        <th>Sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Tổng tiền</th>

                                    </tr>
                                </thead>
                                <tbody className="align-middle">
                                    {

                                        data.map((item, Index) => {
                                            return (

                                                <tr key={Index}>
                                                    <td className="align-middle">
                                                        <img src={item.product.image} alt="" style={{ width: 100 }} />{" "}

                                                    </td>
                                                    <td className="align-middle">{item.product.name}</td>
                                                    <td className="align-middle">{VND.format((item.product.price - (item.product.productPromotion.percent * item.product.price) / 100))}</td>
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
                                                    <td className="align-middle" >{VND.format(item.quantity * (item.product.price - (item.product.productPromotion.percent * item.product.price) / 100))}</td>

                                                </tr>
                                            )
                                        })

                                    }

                                </tbody>

                            </table>
                        </div>
                        <div className="col-lg-4">
                            <h5 className="section-title position-relative text-uppercase mb-3">
                                <span className="bg-secondary pr-3">TÓM TẮT Giỏ hàng</span>
                            </h5>
                            <div className="bg-light p-30 mb-5">
                                <div className="border-bottom pb-2">
                                    <div className="d-flex justify-content-between mb-3">
                                        <h6>Tổng tiền phụ</h6>
                                        <h6>{VND.format(tong)}</h6>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h6 className="font-weight-medium">Phí vận chuyển</h6>
                                        <h6 className="font-weight-medium">{VND.format(0)}</h6>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5>Tổng tiền</h5>
                                        <h5>{VND.format(tong)}</h5>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/* Checkout End */}


        </Fragment>
    )
}
export default Checkout;