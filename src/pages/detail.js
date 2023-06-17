import React, { Component, Fragment, useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import Jquery from "../components/Jquery";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Detail() {
    const [quantity, setQuantity] = useState('1');
    const params = useParams();
    const [data, setData] = useState([]);
    const quantityAsNumber = Number(quantity);
    const usenavigate = useNavigate();
    useEffect(() => {
        getData();
    }, [])
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
            })
            .catch((error) => {
                console.log(error)
            })

    }
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
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <Fragment>
            <ToastContainer />
            <Jquery />
            <>


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
                                    <div className="text-primary mr-2">
                                        <small className="fas fa-star" />
                                        <small className="fas fa-star" />
                                        <small className="fas fa-star" />
                                        <small className="fas fa-star-half-alt" />
                                        <small className="far fa-star" />
                                    </div>
                                    <small className="pt-1">(99 Reviews)</small>
                                </div>
                                <h3 className="font-weight-semi-bold mb-4">{VND.format(data.price)}</h3>


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
                                        Description
                                    </a>
                                    <a
                                        className="nav-item nav-link text-dark"
                                        data-toggle="tab"
                                        href="#tab-pane-2"
                                    >
                                        Information
                                    </a>
                                    <a
                                        className="nav-item nav-link text-dark"
                                        data-toggle="tab"
                                        href="#tab-pane-3"
                                    >
                                        Reviews (0)
                                    </a>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="tab-pane-1">
                                        <h4 className="mb-3">Product Description</h4>
                                        {data.description}
                                    </div>
                                    <div className="tab-pane fade" id="tab-pane-2">
                                        <h4 className="mb-3">Additional Information</h4>
                                        <p>
                                            Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea.
                                            Consetetur vero aliquyam invidunt duo dolores et duo sit. Vero
                                            diam ea vero et dolore rebum, dolor rebum eirmod consetetur
                                            invidunt sed sed et, lorem duo et eos elitr, sadipscing kasd
                                            ipsum rebum diam. Dolore diam stet rebum sed tempor kasd eirmod.
                                            Takimata kasd ipsum accusam sadipscing, eos dolores sit no ut
                                            diam consetetur duo justo est, sit sanctus diam tempor aliquyam
                                            eirmod nonumy rebum dolor accusam, ipsum kasd eos consetetur at
                                            sit rebum, diam kasd invidunt tempor lorem, ipsum lorem elitr
                                            sanctus eirmod takimata dolor ea invidunt.
                                        </p>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item px-0">
                                                        Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Amet kasd gubergren sit sanctus et lorem eos sadipscing
                                                        at.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Takimata ea clita labore amet ipsum erat justo voluptua.
                                                        Nonumy.
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-6">
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item px-0">
                                                        Sit erat duo lorem duo ea consetetur, et eirmod takimata.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Amet kasd gubergren sit sanctus et lorem eos sadipscing
                                                        at.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Duo amet accusam eirmod nonumy stet et et stet eirmod.
                                                    </li>
                                                    <li className="list-group-item px-0">
                                                        Takimata ea clita labore amet ipsum erat justo voluptua.
                                                        Nonumy.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="tab-pane-3">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h4 className="mb-4">1 review for "Product Name"</h4>
                                                <div className="media mb-4">
                                                    <img
                                                        src="ASSETS/img/user.jpg"
                                                        alt="Image"
                                                        className="img-fluid mr-3 mt-1"
                                                        style={{ width: 45 }}
                                                    />
                                                    <div className="media-body">
                                                        <h6>
                                                            John Doe
                                                            <small>
                                                                {" "}
                                                                - <i>01 Jan 2045</i>
                                                            </small>
                                                        </h6>
                                                        <div className="text-primary mb-2">
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star-half-alt" />
                                                            <i className="far fa-star" />
                                                        </div>
                                                        <p>
                                                            Diam amet duo labore stet elitr ea clita ipsum, tempor
                                                            labore accusam ipsum et no at. Kasd diam tempor rebum
                                                            magna dolores sed sed eirmod ipsum.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <h4 className="mb-4">Leave a review</h4>
                                                <small>
                                                    Your email address will not be published. Required fields
                                                    are marked *
                                                </small>
                                                <div className="d-flex my-3">
                                                    <p className="mb-0 mr-2">Your Rating * :</p>
                                                    <div className="text-primary">
                                                        <i className="far fa-star" />
                                                        <i className="far fa-star" />
                                                        <i className="far fa-star" />
                                                        <i className="far fa-star" />
                                                        <i className="far fa-star" />
                                                    </div>
                                                </div>
                                                <form>
                                                    <div className="form-group">
                                                        <label htmlFor="message">Your Review *</label>
                                                        <textarea
                                                            id="message"
                                                            cols={30}
                                                            rows={5}
                                                            className="form-control"
                                                            defaultValue={""}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="name">Your Name *</label>
                                                        <input type="text" className="form-control" id="name" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="email">Your Email *</label>
                                                        <input type="email" className="form-control" id="email" />
                                                    </div>
                                                    <div className="form-group mb-0">
                                                        <input
                                                            type="submit"
                                                            defaultValue="Leave Your Review"
                                                            className="btn btn-primary px-3"
                                                        />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Shop Detail End */}
                {/* Products Start */}
                <div className="container-fluid py-5">
                    <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                        <span className="bg-secondary pr-3">You May Also Like</span>
                    </h2>
                    <div className="row px-xl-5">
                        <div className="col">
                            <div className="owl-carousel related-carousel">
                                <div className="product-item bg-light">
                                    <div className="product-img position-relative overflow-hidden">
                                        <img className="img-fluid w-100" src="ASSETS/img/product-1.jpg" alt="" />
                                        <div className="product-action">
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="fa fa-shopping-cart" />
                                            </a>
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="far fa-heart" />
                                            </a>
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="fa fa-sync-alt" />
                                            </a>
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="fa fa-search" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text-center py-4">
                                        <a className="h6 text-decoration-none text-truncate" href="">
                                            Product Name Goes Here
                                        </a>
                                        <div className="d-flex align-items-center justify-content-center mt-2">
                                            <h5>$123.00</h5>
                                            <h6 className="text-muted ml-2">
                                                <del>$123.00</del>
                                            </h6>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center mb-1">
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small>(99)</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-item bg-light">
                                    <div className="product-img position-relative overflow-hidden">
                                        <img className="img-fluid w-100" src="ASSETS/img/product-2.jpg" alt="" />
                                        <div className="product-action">
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="fa fa-shopping-cart" />
                                            </a>
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="far fa-heart" />
                                            </a>
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="fa fa-sync-alt" />
                                            </a>
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="fa fa-search" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text-center py-4">
                                        <a className="h6 text-decoration-none text-truncate" href="">
                                            Product Name Goes Here
                                        </a>
                                        <div className="d-flex align-items-center justify-content-center mt-2">
                                            <h5>$123.00</h5>
                                            <h6 className="text-muted ml-2">
                                                <del>$123.00</del>
                                            </h6>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center mb-1">
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small>(99)</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-item bg-light">
                                    <div className="product-img position-relative overflow-hidden">
                                        <img className="img-fluid w-100" src="ASSETS/img/product-3.jpg" alt="" />
                                        <div className="product-action">
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="fa fa-shopping-cart" />
                                            </a>
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="far fa-heart" />
                                            </a>
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="fa fa-sync-alt" />
                                            </a>
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="fa fa-search" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text-center py-4">
                                        <a className="h6 text-decoration-none text-truncate" href="">
                                            Product Name Goes Here
                                        </a>
                                        <div className="d-flex align-items-center justify-content-center mt-2">
                                            <h5>$123.00</h5>
                                            <h6 className="text-muted ml-2">
                                                <del>$123.00</del>
                                            </h6>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center mb-1">
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small>(99)</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-item bg-light">
                                    <div className="product-img position-relative overflow-hidden">
                                        <img className="img-fluid w-100" src="ASSETS/img/product-4.jpg" alt="" />
                                        <div className="product-action">
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="fa fa-shopping-cart" />
                                            </a>
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="far fa-heart" />
                                            </a>
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="fa fa-sync-alt" />
                                            </a>
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="fa fa-search" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text-center py-4">
                                        <a className="h6 text-decoration-none text-truncate" href="">
                                            Product Name Goes Here
                                        </a>
                                        <div className="d-flex align-items-center justify-content-center mt-2">
                                            <h5>$123.00</h5>
                                            <h6 className="text-muted ml-2">
                                                <del>$123.00</del>
                                            </h6>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center mb-1">
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small>(99)</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-item bg-light">
                                    <div className="product-img position-relative overflow-hidden">
                                        <img className="img-fluid w-100" src="ASSETS/img/product-5.jpg" alt="" />
                                        <div className="product-action">
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="fa fa-shopping-cart" />
                                            </a>
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="far fa-heart" />
                                            </a>
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="fa fa-sync-alt" />
                                            </a>
                                            <a className="btn btn-outline-dark btn-square" href="">
                                                <i className="fa fa-search" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text-center py-4">
                                        <a className="h6 text-decoration-none text-truncate" href="">
                                            Product Name Goes Here
                                        </a>
                                        <div className="d-flex align-items-center justify-content-center mt-2">
                                            <h5>$123.00</h5>
                                            <h6 className="text-muted ml-2">
                                                <del>$123.00</del>
                                            </h6>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-center mb-1">
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small className="fa fa-star text-primary mr-1" />
                                            <small>(99)</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Products End */}

            </>
        </Fragment>
    )

}
export default Detail;
