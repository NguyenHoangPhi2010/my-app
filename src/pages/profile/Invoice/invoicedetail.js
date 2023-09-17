import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import Jquery from "../../../components/Jquery";
import { Modal } from "react-bootstrap";
import { Rating } from 'react-simple-star-rating'
import ReactStars from 'react-rating-star-with-type'
function InvoiceDetails() {
    const params = useParams();
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); }
    const [dataproductPromotion, setDataPoductPromotion] = useState([]);
    const [datadetail, setDataDetail] = useState([]);
    const [data, setData] = useState([]);
    const [datainvoice, setInvoice] = useState([]);
    const [dataproduct, setDataProduct] = useState([]);
    const [user, setUser] = useState([]);
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const usenavigate = useNavigate();
    const handleRating = (rate) => {
        setRating(rate)
        // Some logic
    }
    useEffect(() => {
        getData();
        getDataDetail();
    }, [])
    const handleShow = (id, quanti) => {
        getProductDetail(id);
        setQuantity(quanti)
        if (data.status === 4) {
            setShow(true);
        } else (toast.error("Đơn hàng của bạn phải được hoàn thành bạn mới có thể đánh giá"))
    }
    const getProductDetail = (id) => {
        axios.get(`https://localhost:7225/api/Products/${id}`)
            .then((result) => {
                setDataProduct(result.data)
                setDataPoductPromotion(result.data.productPromotion)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    const getDataDetail = () => {
        let id = params.id;
        axios.get(`https://localhost:7225/api/InvoiceDetails/${id}`)
            .then((result) => {
                setDataDetail(result.data)
                setInvoice(result.data.invoice)
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
    const editinvoid = () => {
<<<<<<< HEAD
        if (window.confirm("Bạn có chắc muốn hủy đơn hàng") === true) {
            if (data.status === 5) {
                toast.error("Đơn hàng của bạn đã bị hủy trước đó");
=======
        if (window.confirm("Bạn có chắc muốn hũy đơn hàng") === true) {
            if (data.status === 5) {
                toast.error("Đơn hàng của bạn đã bị hũy trước đó");
>>>>>>> f125f77413c46b346417db359020eb1a320fca1c
            } else if (data.status === 4) {
                toast.error("Đơn hàng đã giao không được hủy");
            } else if (data.status === 2) {
                toast.error("Đơn hàng đã xác nhận không được hủy");
            } else if (data.status === 3) {
                toast.error("Đơn hàng đang giao không được hủy");
            } else {
                let id = params.id;
                const url = `https://localhost:7225/api/Invoices/${id}`;
                const data1 = {
                    "id": id,
                    "code": data.code,
                    "applicationUserId": user.id,
                    "applicationUser": null,
                    "issuedDate": data.issuedDate,
                    "shippingAddress": data.shippingAddress,
                    "shippingPhone": data.shippingPhone,
                    "total": data.total,
                    "status": 5
                }
                axios.put(url, data1)
                    .then((result) => {
                        getData();
                        clear();
                        toast.success('Đã hủy đơn hàng thành công');
                    }).catch((error) => {
                        toast.error(error);
                    })
            }
        }


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
                <b b style={{ color: "#F29727" }} className="text-sm font-weight-bolder ">Đã xác nhận</b>
            )
        }
        else if (item == 3) {
            return (
                <b style={{ color: "#F2BE22" }} className="text-sm font-weight-bolder ">Đang giao</b>
            )
        }
        else if (item == 4) {
            return (
                <b style={{ color: "#22A699" }} className="text-sm font-weight-bolder ">Đã giao</b>
            )
        }
        else {
            return (
                <b style={{ color: "red" }} className="text-sm font-weight-bolder ">Đã hủy</b>
            )

        }
    }

    const clear = () => {
        setRating(0);
        setReview('');
    }
    const handleReview = (item) => {

        const token = sessionStorage.getItem('token');

        const url = 'https://localhost:7225/api/ProductReviews';
        const data1 = {
            "accountId": 1,
            "productId": item.id,
            "product": null,
            "rating": rating,
            "comment": review,
            "issuedDate": "2023-07-01T16:57:31.054Z",
            "status": true
        }
        axios.post(url, data1, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                toast.success(result.data.message);
<<<<<<< HEAD
                handleClose();

=======
                setCount(count + 1);
                handleClose();
                clear();
>>>>>>> f125f77413c46b346417db359020eb1a320fca1c
                console.log(result)
            }).catch((error) => {
                toast.error(error);
            })
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
                                                    <img src={item.product.image} alt="" style={{ width: 180 }} />

                                                </td>
                                                <td>
                                                    <Link className="h6 text-uppercase" to={`../detail/${item.product.id}`}> {item.product.name}</Link>
                                                    <p className="mb-5">Số lượng: {item.quantity}</p>
                                                    <div className="d-flex align-items-center">
                                                        <h6 className="text-red">{VND.format((item.product.price - (item.product.productPromotion.percent * item.product.price) / 100))}</h6>
                                                        <small className="text-muted ml-2">
                                                            <del>{VND.format(item.product.price)}</del>
                                                        </small>
                                                    </div>

                                                </td>

                                                <td className="text-lg-right">
                                                    <button className="btn btn-sm btn-danger" onClick={
                                                        () => { handleShow(item.product.id, item.quantity) }}>
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
                                <h3 className="far fa-map-marker bg-grey m-0 mx-4" />

                                <div className=" align-middle flex-fill pl-1">

                                    <p className="font-weight-semi-bold m-1">{data.shippingAddress}</p>

                                </div>
                            </div>

                        </div>




                    </div>
                    <div className="px-xl-4 pb-5 text-center">
                        <button className="btn btn-danger formsss-control" onClick={
                            () => { editinvoid() }}>Hủy đơn hàng
                        </button>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose} className=" mt-5">
                    <Modal.Header className="bg-grey  rounded-sm  ">
                        <Modal.Title >Đánh giá sản phẩm
                        </Modal.Title>
                        <button className="btn btn-sm btn-danger" onClick={() => handleClose()}>
                            <i className="fa fa-times" />
                        </button>
                    </Modal.Header>
                    <Modal.Body >
                        <div className="bg-grey rounded-sm p-2 mb-2" style={{ width: 550 }}>
                            <tr >
                                <td className="align-middle">
                                    <img src={dataproduct.image} alt="" style={{ width: 180 }} />

                                </td>
                                <td>
                                    <Link className="h6 text-uppercase" to={`../detail/${dataproduct.id}`} > {dataproduct.name}</Link>
                                    <p className="mb-4">Số lượng: {quantity}</p>
                                    <div className="d-flex align-items-center  mt-2">
                                        <h6 className="text-red">{VND.format((dataproduct.price - (dataproductPromotion.percent * dataproduct.price) / 100))}</h6>
                                        <small className="text-muted ml-2">
                                            <del>{VND.format(dataproduct.price)}</del>
                                        </small>
                                    </div>

                                </td>


                            </tr>
                        </div>
                        <div className="rounded-sm ">
                            <h4 className="section-title position-relative font-weight-bold text-center  mb-3  ">
                                <span className="bg-secondary pr-3">Sản phẩm của bạn như thế nào?</span>
                            </h4>
                            <p className="mb-0 text-center mr-2">Hãy để lại đánh giá và nhận xét của bạn</p>
                            <div className="text-center my-3">

                                <div className="text-primary ">
                                    <Rating

                                        onClick={handleRating}
                                        ratingValue={rating}
                                        size={20}
                                        label
                                        transition
                                        fillColor='orange'
                                        emptyColor='gray'
                                        className='foo ' // Will remove the inline style if applied
                                    />
                                    {/* Use rating value */}

                                </div>
                            </div>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="message"></label>
                                    <textarea
                                        id="message"
                                        placeholder="Chia sẻ cảm nhận của bạn về sản phẩm"
                                        cols={30}
                                        rows={5}
                                        className="form-control"
                                        defaultValue={""}
                                        value={review} onChange={(e) => setReview(e.target.value)}
                                    />
                                </div>
                                {/* <div className="form-group">
                                                        <label htmlFor="name">Your Name *</label>
                                                        <input type="text" className="form-control" id="name" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="email">Your Email *</label>
                                                        <input type="email" className="form-control" id="email" />
                                                    </div> */}
                                <div className=" text-center align-middle mb-0">

<<<<<<< HEAD
                                    <a className="btn btn-secondary mr-2 " onClick={() => handleClose()}>
                                        <p className="text-center pr-4 pl-4" > Hũy bỏ</p>
                                    </a>
                                    <a className="btn btn-primary mr-2" onClick={() => { handleReview(dataproduct) }}>
                                        <p className="text-center pr-4 pl-4" > Đánh giá</p>
                                    </a>
=======
                                        defaultValue="Hũy bỏ"
                                        className="btn btn-secondary mr-2 px-3"
                                        onClick={() => handleClose()}
                                    />

                                    <button className="btn btn-primary px-3" onClick={() => { handleReview(dataproduct) }}>
                                        <p className="text-center pr-4 pl-4" > Đánh giá</p>
                                    </button>
>>>>>>> f125f77413c46b346417db359020eb1a320fca1c
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>

            </>

        </Fragment >
    )
}
export default InvoiceDetails;