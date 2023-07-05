import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Jquery from "../components/Jquery";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Rating } from 'react-simple-star-rating'
import ReactStars from 'react-rating-star-with-type'
function Detail() {
    const [quantity, setQuantity] = useState('1');
    const params = useParams();
    const [data, setData] = useState(['']);
    const [dataproductPromotion, setDataPoductPromotion] = useState([]);
    const [datareview, setDataReview] = useState([]);
    const [count, setCount] = useState(0);
    const [typeName, setTypeName] = useState('')
    const quantityAsNumber = Number(quantity);
    const usenavigate = useNavigate();
    const [showInformation, setShowInformation] = useState(false);
    const handleCloseInformation = () => setShowInformation(false);
    const handleShowInformation = () => setShowInformation(true);
    const [rating, setRating] = useState(0) // initial rating value
    const [ratingdetail, setRatingDetail] = useState(0) // initial rating value
    const [review, setReview] = useState('')
    // Catch Rating value
    useEffect(() => {
        getData();
        getDataReview();
    }, [count, params])
    const handleRating = (rate) => {
        setRating(rate)
        // Some logic
    }
    const handquantitydecrease = () => {
        setQuantity(quantityAsNumber - 1)
        if (quantity <= 1) {
            setQuantity(1)
        }

    }
    const getData = () => {
        let id = params.id;
        axios.get(`https://localhost:7225/api/Products/${id}`)
            .then((result) => {
                setData(result.data)
                setDataPoductPromotion(result.data.productPromotion)
                setTypeName(result.data.productType.name)
                setRatingDetail(result.data.rating)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    console.log(data);
    const getDataReview = () => {
        let id = params.id;
        axios.get(`https://localhost:7225/api/ProductReviews/${id}`)
            .then((result) => {
                setDataReview(result.data)
            })
            .catch((error) => {
                console.log(error)
            })

    }
    const style = {
        whiteSpace: 'pre-line'
    };
    const handleAddtoCart = (item) => {
        const token = sessionStorage.getItem('token');
        if (token === null) {
            toast.error('Please Login');
            usenavigate('/Login')
        }
        else {
            const url = 'https://localhost:7225/api/Carts';
            const data1 = {
                "accountId": 1,
                "productId": item.id,
                "product": null,
                "quantity": quantity
            }

            if (data.stock < data1.quantity) {
                toast.error('Số lượng sản phảm không đủ');
                setQuantity(data.stock);
            }
            else {
                axios.post(url, data1, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                    .then(() => {
                        toast.success('Đã thêm sản phẩm vào giỏ hàng');

                    }).catch((error) => {
                        toast.error(error);
                    })
            }
        }

    }
    const clear = () => {
        setRating(0);
        setReview('');
    }
    const handleReview = (item) => {
        const token = sessionStorage.getItem('token');
        if (token === null) {
            toast.error('Vui lòng đăng nhập');
            usenavigate('/Login')
        }
        else {
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
                    toast.warning(result.data.message);
                    setCount(count + 1);
                    clear();
                }).catch((error) => {
                    toast.error(error);
                })

        }
    }
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <Fragment>
            <ToastContainer />
            <Jquery />
            <>

                {/* Breadcrumb Start */}
                <div className="container-fluid">
                    <div className="row px-xl-5">
                        <div className="col-12">
                            <nav className="breadcrumb bg-light mb-30">
                                <Link className="breadcrumb-item text-dark" to={"/"}>
                                    Trang chủ
                                </Link>
                                <Link className="breadcrumb-item text-dark" to={"/shop"}>
                                    Sản phẩm
                                </Link>
                                <span className="breadcrumb-item active">{data.sku}</span>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* Breadcrumb End */}
                {/* Shop Detail Start */}

                <div className="container-fluid pb-5">

                    <div className="row px-xl-5">
                        <div className="col-lg-5 mb-30">
                            <div
                                id="product-carousel"
                                className="carousel slide"
                                data-ride="carousel"
                            >
                                <div className="carousel-inner bg-light">
                                    <div className="carousel-item active">
                                        <img
                                            className="w-100 h-100"
                                            src={`../ASSETS/image/${data.image}`}
                                            alt="Image"
                                        />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            className="w-100 h-100"
                                            src={`../ASSETS/image/${data.image}`}
                                            alt="Image"
                                        />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            className="w-100 h-100"
                                            src={`../ASSETS/image/${data.image}`}
                                            alt="Image"
                                        />
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            className="w-100 h-100"
                                            src={`../ASSETS/image/${data.image}`}
                                            alt="Image"
                                        />
                                    </div>
                                </div>
                                <a
                                    className="carousel-control-prev"
                                    href="#product-carousel"
                                    data-slide="prev"
                                >
                                    <i className="fa fa-2x fa-angle-left text-dark" />
                                </a>
                                <a
                                    className="carousel-control-next"
                                    href="#product-carousel"
                                    data-slide="next"
                                >
                                    <i className="fa fa-2x fa-angle-right text-dark" />
                                </a>
                            </div>
                        </div>

                        <div className="col-lg-7 h-auto mb-30">

                            <div className="h-100 bg-light p-30">
                                <h3>{data.name}</h3>
                                <div className="d-flex mb-3">

                                    <ReactStars
                                        value={ratingdetail}
                                        edit={true}
                                        activeColors={["orange", "orange", "orange", "orange", "orange",]}
                                    />


                                    <small className="pt-1">({datareview.length} Reviews)</small>
                                </div>
                                <h3 className="font-weight-semi-bold mb-4">{VND.format((data.price - (dataproductPromotion.percent * data.price) / 100))}</h3>


                                <div className="d-flex align-items-center mb-4 pt-2">
                                    <div className="input-group quantity mr-3" style={{ width: 130 }}>
                                        <div className="input-group-btn">
                                            <button className="btn btn-primary btn-minus" onClick={() => handquantitydecrease()}>
                                                <i className="fa fa-minus" />
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control bg-secondary border-0 text-center"
                                            onChange={e => setQuantity(e.target.value)}
                                            value={quantity}
                                        />
                                        <div className="input-group-btn">
                                            <button className="btn btn-primary btn-plus" onClick={() => setQuantity(quantityAsNumber + 1)}>
                                                <i className="fa fa-plus" />
                                            </button>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary px-3" onClick={() => handleAddtoCart(data)}>
                                        <i className="fa fa-shopping-cart mr-1" /> Add To Cart
                                    </button>
                                </div>
                                <div className="d-flex pt-2">
                                    <strong className="text-dark mr-2">Share on:</strong>
                                    <div className="d-inline-flex">
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-facebook-f" />
                                        </a>
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-twitter" />
                                        </a>
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-linkedin-in" />
                                        </a>
                                        <a className="text-dark px-2" href="">
                                            <i className="fab fa-pinterest" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="row px-xl-5">
                        <div className="col">
                            <div className="bg-light p-30">
                                <div className="nav nav-tabs mb-4">
                                    <a
                                        className="nav-item nav-link text-dark active"
                                        data-toggle="tab"
                                        href="#tab-pane-1"
                                    >
                                        Mô tả sản phẩm
                                    </a>
                                    <a
                                        className="nav-item nav-link text-dark"
                                        data-toggle="tab"
                                        href="#tab-pane-2"
                                    >
                                        Thông tin chi tiết
                                    </a>
                                    <a
                                        className="nav-item nav-link text-dark"
                                        data-toggle="tab"
                                        href="#tab-pane-3"
                                    >
                                        Dánh giá ({datareview.length})
                                    </a>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="tab-pane-1">
                                        <h4 className="mb-3">Mô tả sản phẩm</h4>
                                        <div style={style}>{data.description}</div>
                                    </div>
                                    <div className="tab-pane fade" id="tab-pane-2">
                                        <div className="teko-col teko-col-4 ">
                                            <div className="css-ftpi71">
                                                <div
                                                    type="title"
                                                    color="textTitle"
                                                    className="title css-1x5ixzd h2"
                                                >
                                                    Thông tin chi tiết
                                                </div>
                                            </div>
                                            <div className="css-1h28ttq">
                                                <div className="css-1i3ajxp">
                                                    <div type="body" className="css-7v0pfb">
                                                        Thương hiệu
                                                    </div>
                                                    <div type="body" className="css-7v0pfb">
                                                        <div style={style}>{typeName}</div>
                                                    </div>
                                                </div>
                                                <div type="body" color="textSecondary" className="css-10afzby h3">
                                                    Thông tin chung
                                                </div>
                                                <div className="css-1i3ajxp">
                                                    <div type="body" className="css-7v0pfb">
                                                        Tên
                                                    </div>
                                                    <div type="body" className="css-7v0pfb">
                                                        <div style={style}>{data.name}</div>
                                                    </div>
                                                </div>
                                                <div className="css-1i3ajxp">
                                                    <div type="body" className="css-7v0pfb">
                                                        Giá
                                                    </div>
                                                    <div type="body" className="css-7v0pfb">
                                                        {VND.format(data.price)}
                                                    </div>
                                                </div>
                                                <div type="body" color="textSecondary" className="css-10afzby">
                                                    Cấu hình chi tiết
                                                </div>
                                                <div className="css-1i3ajxp">
                                                    <div type="body" className="css-7v0pfb">
                                                        CPU
                                                    </div>
                                                    <div type="body" className="css-7v0pfb">
                                                        <div style={style}>{data.cpu}</div>
                                                    </div>
                                                </div>
                                                <div className="css-1i3ajxp">
                                                    <div type="body" className="css-7v0pfb">
                                                        Chip đồ họa
                                                    </div>
                                                    <div type="body" className="css-7v0pfb">
                                                        <div style={style}>{data.gpu}</div>
                                                    </div>
                                                </div>
                                                <div className="css-1i3ajxp">
                                                    <div type="body" className="css-7v0pfb">
                                                        RAM
                                                    </div>
                                                    <div type="body" className="css-7v0pfb">
                                                        <div style={style}>{data.ram}</div>
                                                    </div>
                                                </div>
                                                <div className="css-1i3ajxp">
                                                    <div type="body" className="css-7v0pfb">
                                                        Lưu trữ
                                                    </div>
                                                    <div type="body" className="css-7v0pfb">
                                                        <div style={style}>{data.hardDrive}</div>
                                                    </div>
                                                </div>
                                                <div className="css-1i3ajxp">
                                                    <div type="body" className="css-7v0pfb">
                                                        Màn hình
                                                    </div>
                                                    <div type="body" className="css-7v0pfb">
                                                        <div style={style}>{data.screens}</div>
                                                    </div>
                                                </div>

                                                <div className="css-1i3ajxp">
                                                    <div type="body" className="css-7v0pfb">
                                                        Cổng kết nối
                                                    </div>
                                                    <div type="body" className="css-7v0pfb">
                                                        <div style={style}>{data.connector}</div>
                                                    </div>
                                                </div>
                                                <div className="css-1i3ajxp">
                                                    <div type="body" className="css-7v0pfb">
                                                        Kết nối không dây
                                                    </div>
                                                    <div type="body" className="css-7v0pfb">
                                                        <div style={style}>{data.otherUtilities}</div>
                                                    </div>
                                                </div>
                                                <div className="css-1i3ajxp">
                                                    <div type="body" className="css-7v0pfb">
                                                        Kích thước
                                                    </div>
                                                    <div type="body" className="css-7v0pfb">
                                                        <div style={style}>{data.size}</div>
                                                    </div>
                                                </div>
                                                <div className="css-1i3ajxp">
                                                    <div type="body" className="css-7v0pfb">
                                                        Pin
                                                    </div>
                                                    <div type="body" className="css-7v0pfb">
                                                        <div style={style}>{data.battery}</div>
                                                    </div>
                                                </div>
                                                <div className="css-1i3ajxp">
                                                    <div type="body" className="css-7v0pfb">
                                                        Khối lượng
                                                    </div>
                                                    <div type="body" className="css-7v0pfb">
                                                        <div style={style}>{data.weight}</div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div >

                                        </div>
                                    </div>
                                    <div className="tab-pane fade " id="tab-pane-3">
                                        <div className="bg-grey rounded-sm p-3 mb-5 ">
                                            <h5 className="section-title position-relative text-uppercase  mb-3  ">
                                                <span className="bg-secondary  pr-3">Để lại đánh giá</span>
                                            </h5>
                                            <div className="d-flex my-3">
                                                <p className="mb-0 mr-2">Số sao của bạn của bạn * :</p>
                                                <div className="text-primary">
                                                    <Rating
                                                        onClick={handleRating}
                                                        ratingValue={rating}
                                                        size={20}
                                                        label
                                                        transition
                                                        fillColor='orange'
                                                        emptyColor='gray'
                                                        className='foo' // Will remove the inline style if applied
                                                    />
                                                    {/* Use rating value */}

                                                </div>
                                            </div>
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="message">Đánh giá của bạn *</label>
                                                    <textarea
                                                        id="message"
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
                                                <div className="form-group  mb-0">
                                                    <input

                                                        defaultValue="Đánh giá"
                                                        className="btn btn-primary px-3"
                                                        onClick={() => handleReview(data)}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                        {
                                            datareview && datareview.length > 0 ?
                                                datareview.map((item, index) => {

                                                    return (
                                                        <div className="">

                                                            <div className="">

                                                                <div className="media mb-4">
                                                                    <img
                                                                        src={item.applicationUser.avatar}
                                                                        alt="Image"
                                                                        className="img-fluid mr-3 mt-1"
                                                                        style={{ width: 45 }}
                                                                    />
                                                                    <div className="media-body">
                                                                        <h6>
                                                                            {item.applicationUser.userName}
                                                                            <small>
                                                                                {" "}
                                                                                - <i>{item.issuedDate}</i>
                                                                            </small>
                                                                        </h6>
                                                                        <div className="bg-grey rounded p-2 m-2">
                                                                            <div className="text-primary mb-2">
                                                                                <ReactStars
                                                                                    value={item.rating}
                                                                                    edit={true}
                                                                                    activeColors={["orange", "orange", "orange", "orange", "orange",]}
                                                                                />
                                                                            </div>
                                                                            <p>
                                                                                {item.comment}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    )
                                                })
                                                : <div className="row">
                                                    <h4 className="col-lg-4 ">{datareview.length} đánh giá cho Sản phẩm</h4>

                                                </div>

                                        }



                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Shop Detail End */}

            </>
        </Fragment>
    )

}
export default Detail;
