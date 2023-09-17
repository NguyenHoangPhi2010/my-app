import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import Jquery from "../../../components/Jquery";
import { Modal } from "react-bootstrap";
import { Rating } from 'react-simple-star-rating'
import ReactStars from 'react-rating-star-with-type'
function AccountAddress() {
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); }
    const handleShow = () => setShow(true);
    const [showAddress, setShowAddress] = useState(false);
    const handleCloseAddress = () => { setShowAddress(false); }
    const handleShowAddress = () => setShowAddress(true);
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => { setShowEdit(false); }
    const handleShowEdit = () => setShowEdit(true);
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [disabledA, setDisabledA] = useState(true);
    const [Cytis, setCytis] = useState([]);
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [cyti, setCyti] = useState([]);
    const [district, setDistrict] = useState([])
    const [ward, setWard] = useState([])
    const [address, setAddress] = useState('')
    const [editID, setEditId] = useState('');
    const [editcyti, setEditCyti] = useState([]);
    const [editdistrict, setEditDistrict] = useState([])
    const [editward, setEditWard] = useState([])
    const [editaddress, setEditAddress] = useState('')
    const [editstatus, setEditStatus] = useState(true)
    useEffect(() => {
        getData();
        getCyti();
    }, [])
    const getData = () => {
        const token = sessionStorage.getItem('token')
        axios.get('https://localhost:7225/api/AccountAddresss', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                setData(result.data)

            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleAddAdderss = () => {

        const token = sessionStorage.getItem('token')
        const url = 'https://localhost:7225/api/AccountAddresss';
        const data1 = {
            "applicationUserId": "string",
            "applicationUser": null,
            "cyti": cyti,
            "district": district,
            "ward": ward,
            "address": address,
            "status": false
        }
        console.log('ok', data1)
        axios.post(url, data1, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(() => {
                toast.success('Thêm địa chỉ mới thành công');
                handleClose();
                getData();
            }).catch((error) => {
                toast.error(error);
            })
    }
    const handleEidt = (id) => {
        //alert(id)
        handleShowAddress();
        axios.get(`https://localhost:7225/api/AccountAddresss/${id}`)
            .then((result) => {
                setEditId(id);
                setUser(result.data.applicationUser)
                setEditCyti(result.data.cyti);
                setEditDistrict(result.data.district);
                setEditWard(result.data.ward);
                setEditAddress(result.data.address);
                setEditStatus(result.data.status);
                console.log(user)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleUpdate = () => {
        //alert(id)
        const token = sessionStorage.getItem('token')
        const url = `https://localhost:7225/api/AccountAddresss/${editID}`;
        const data = {
            "id": editID,
            "applicationUserId": user.id,
            "applicationUser": null,
            "cyti": editcyti,
            "district": editdistrict,
            "ward": editward,
            "address": editaddress,
            "status": editstatus
        }
        console.log(data)
        axios.put(url, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                getData();
                clear();
                toast.success('Đã sửa địa chỉ');
                handleCloseEdit();
            }).catch((error) => {
                toast.error(error);
            })

    }
    const handleUpdateDefalt = () => {
        //alert(id)
        const token = sessionStorage.getItem('token')
        const url = `https://localhost:7225/api/AccountAddresss/${editID}`;
        const data = {
            "id": editID,
            "applicationUserId": user.id,
            "applicationUser": null,
            "cyti": editcyti,
            "district": editdistrict,
            "ward": editward,
            "address": editaddress,
            "status": true
        }
        console.log(data)
        axios.put(url, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                getData();
                clear();
                toast.success('Đã sửa địa chỉ thành địa chỉ mặc định');
                handleCloseAddress();
            }).catch((error) => {
                toast.error(error);
            })

    }
    const handleDelect = () => {
        if (window.confirm("Bạn có chắc muốn xóa địa chỉ") == true) {
            axios.delete(`https://localhost:7225/api/AccountAddresss/${editID}`)
                .then((result) => {
                    toast.success('Đã xóa địa chỉ');
                    getData();
                    handleCloseAddress();
                })
                .catch((error) => {
                    toast.error(error);
                })
        }
    }
    const getCyti = () => {
        axios.get('https://provinces.open-api.vn/api/?depth=3')
            .then((result) => {
                setCytis(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const clear = () => {
        setCyti('');
        setDistrict('');
        setWard('');
        setAddress('');
        setEditCyti('');
        setEditDistrict('');
        setEditWard('');
        setEditAddress('');
        setEditId('');
    }
    const renderStatus = (item) => {
        console.log(item)
        if (item === true) {
            return (
                <b className="text-danger text-sm font-weight-bolder ">Mặc Định</b>
            )
        }
        else {
            return (
                <b b style={{ color: "#F29727" }} className="text-sm font-weight-bolder "></b>
            )
        }

    }
    return (
        <Fragment>
            <ToastContainer />
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

                                    <h5 className="font-weight-semi-bold m-0"> Trở về</h5>

                                </div>
                            </Link>

                        </div>




                    </div>
                    {
                        data.map((item, Index) => {
                            return (
                                <div className="col-md-8 mb-auto mt-3">
                                    <div className="forms-group">
                                        <label
                                            htmlFor="example-text-input"
                                            className="forms-control-label"
                                        >
                                            Đia chỉ {item.Index}: {renderStatus(item.status)}
                                        </label>
                                        <div className="d-flex justify-content-lg-end justify-content-center align-items-center">
                                            <textarea
                                                rows={1}
                                                className="forms-control"
                                                placeholder="Nhập thông tin của màn hình"
                                                disabled
                                                value={item.address + "," + item.ward + "," + item.district + "," + item.cyti}
                                            />
                                            <button className="btn btn-icon" onClick={() => { handleEidt(item.id) }}>
                                                <i className="fa fa-wrench" />
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <button className="btn btn-primary formss-control col-md-9 mb-auto text-center mt-5" onClick={
                        () => { handleShow() }}>Thêm địa chỉ mới
                    </button>



                </div>
                <Modal show={show} onHide={handleClose} >
                    <Modal.Header >
                        <Modal.Title >Thêm địa chỉ mới
                        </Modal.Title>
                        <button className="btn btn-sm btn-danger" onClick={() => handleClose()}>
                            <i className="fa fa-times" />
                        </button>
                    </Modal.Header>
                    <Modal.Body >
                        <div className="col-md-10 mb-auto">
                            <label>Thành Phố, Tỉnh</label>
                            <select className="custom-select"
                                onChange={(e) => {
                                    setCyti(e.target.value)
                                    if (e.target.selectedIndex == 0) {
                                        const target = Cytis[e.target.selectedIndex].districts
                                        setDistricts(target)
                                    } else {
                                        const target = Cytis[e.target.selectedIndex - 1].districts
                                        setDistricts(target)
                                    }


                                }}>
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
                                    setDistrict(e.target.value)
                                    if (e.target.selectedIndex == 0) {
                                        const target = districts[e.target.selectedIndex].wards
                                        setWards(target);
                                    } else {
                                        const target = districts[e.target.selectedIndex - 1].wards
                                        setWards(target);
                                    }


                                }}>
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
                                    setWard(e.target.value)
                                }}>
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
                        <div className="col-md-10 mb-auto mt-3">
                            <div className="forms-group">
                                <label
                                    htmlFor="example-text-input"
                                    className="forms-control-label"
                                >
                                    Số nhà, Tên đường:
                                </label>
                                <div className="d-flex justify-content-lg-end justify-content-center align-items-center">
                                    <textarea
                                        rows={1}
                                        className="form-control"
                                        placeholder="Nhập thông tin số nhà, tên đường"
                                        value={address} onChange={(e) => setAddress(e.target.value)}
                                    />

                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary formss-control col-md-9 mb-auto text-center mt-5" onClick={
                            () => { handleAddAdderss() }}>Xác nhận thêm địa chỉ mới
                        </button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showEdit} onHide={handleCloseEdit} >
                    <Modal.Header >
                        <Modal.Title >Chỉnh sửa địa chỉ
                        </Modal.Title>
                        <button className="btn btn-sm btn-danger" onClick={() => handleCloseEdit()}>
                            <i className="fa fa-times" />
                        </button>
                    </Modal.Header>
                    <Modal.Body >
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
                        <div className="col-md-10 mb-auto mt-3">
                            <div className="forms-group">
                                <label
                                    htmlFor="example-text-input"
                                    className="forms-control-label"
                                >
                                    Số nhà, Tên đường:
                                </label>
                                <div className="d-flex justify-content-lg-end justify-content-center align-items-center">
                                    <textarea
                                        rows={1}
                                        className="form-control"
                                        placeholder="Nhập thông tin số nhà, tên đường"
                                        value={editaddress} onChange={(e) => setEditAddress(e.target.value)}
                                    />

                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary formss-control col-md-9 mb-auto text-center mt-5" onClick={
                            () => { handleUpdate() }}>Xác nhận chỉnh sữa
                        </button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showAddress} onHide={handleCloseAddress} className="col-sm-12 mx-50 mt-5">
                    <Modal.Header className="col-sm-12">
                        <Modal.Title>Chức năng
                        </Modal.Title>
                        <button className="btn btn-sm btn-danger" onClick={() => handleCloseAddress()}>
                            <i className="fa fa-times" />
                        </button>
                    </Modal.Header>
                    <Modal.Body className="col-sm-12">
                        <button className="btn btn-primary formss-control col-md-12 mb-auto text-center mt-1" onClick={
                            () => { handleDelect() }}>Xóa địa chỉ
                        </button>
                        <button className="btn btn-primary formss-control col-md-12 mb-auto text-center mt-1" onClick={
                            () => { handleShowEdit(); handleCloseAddress() }}>Chỉnh sửa địa chỉ
                        </button>
                        <button className="btn btn-primary formss-control col-md-12 mb-auto text-center mt-1" onClick={
                            () => { handleUpdateDefalt() }}>Đặt làm địa chỉ mặc định
                        </button>
                    </Modal.Body>

                </Modal>

            </>

        </Fragment >
    )
}
export default AccountAddress;