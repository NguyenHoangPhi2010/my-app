import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Jquery from "../components/Jquery";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import ReactStars from 'react-rating-star-with-type'
import { data } from "jquery";

function Index() {
    const [datahot, setDataHot] = useState([]);
    const [datanew, setDataNew] = useState([]);
    const [datalike, setDataLike] = useState([]);
    const [databanner, setDataBanner] = useState([]);
    const [count, setCount] = useState(0);
    const [image1, setImage1] = useState([]);
    const [image2, setImage2] = useState([]);
    const [image3, setImage3] = useState([]);
    const [image4, setImage4] = useState([]);
    const [image5, setImage5] = useState([]);
    useEffect(() => {
        getDataHot();
        getDataNew();
        getDataLike();
        getDataBanner();
        setCount(0)
    }, [count])
    const usenavigate = useNavigate();
    const getDataHot = () => {
        axios.get('https://localhost:7225/api/Home/GetProductHot')
            .then((result) => {
                setDataHot(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getDataBanner = () => {
        axios.get('https://localhost:7225/api/Banners')
            .then((result) => {
                setDataBanner(result.data)
                setImage1(result.data[0].image)
                setImage2(result.data[1].image)
                setImage3(result.data[2].image)
                setImage4(result.data[3].image)
                setImage5(result.data[4].image)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getDataNew = () => {
        axios.get('https://localhost:7225/api/Home/GetProductHot')
            .then((result) => {
                setDataNew(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const getDataLike = () => {
        const token = sessionStorage.getItem('token')
        axios.get('https://localhost:7225/api/productlikes', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                setDataLike(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleLike = (id) => {
        return (datalike.map((item) => {
            if (item.productId === id) {
                return (<i className="fa fa-heart" />)
            }

        }))
    }
    const handleProductPrice = (item, item1) => {
        if (item === item1) {
            return (
                <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>{VND.format((item))}</h5>
                </div>
            )
        } else {
            return (
                <div className="d-flex align-items-center justify-content-center mt-2">
                    <h5>{VND.format((item1))}</h5>
                    <h6 className="text-muted ml-2">
                        <del>{VND.format(item)}</del>
                    </h6>
                </div>
            )
        }
    }
    const handleAddtoCart = (item) => {
        const token = sessionStorage.getItem('token')

        if (token === null) {
            toast.error('Vui lòng đăng nhập để sử dụng');
            usenavigate('/Login')
        }
        else {
            const url = 'https://localhost:7225/api/Carts';
            const data1 = {
                "accountId": 1,
                "productId": item.id,
                "product": null,
                "quantity": 1
            }

            //console.log('ok', token)
            //JSON.parse(sessionStorage.getItem('data')).data1.id;
            axios.post(url, data1, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(() => {
                    toast.success('Đã thêm một sản phẩm vào giỏ hàng');
                    setCount(count + 1);
                }).catch((error) => {
                    toast.error(error);
                })
        }
    }
    const handleAddtoLike = (item) => {
        const token = sessionStorage.getItem('token')

        if (token === null) {
            toast.error('Vui lòng đăng nhập để sử dụng');
            usenavigate('/Login')
        }
        else {
            const url = 'https://localhost:7225/api/productlikes';
            const data1 = {
                "accountId": 1,
                "productId": item.id,
                "product": null,
                "status": true
            }
            //console.log('ok', token)
            //JSON.parse(sessionStorage.getItem('data')).data1.id;
            axios.post(url, data1, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then((result) => {
                    toast.success(result.data.message)
                    setCount(count + 1);
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


            {/* Breadcrumb Start */}
            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-12">
                        <nav className="breadcrumb bg-light mb-30">
                            {/* <a className="breadcrumb-item text-dark" href="#">
                                Home
                            </a>
                            <a className="breadcrumb-item text-dark" href="#">
                                Shop
                            </a> */}
                            <span className="breadcrumb-item active">Trang chủ</span>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Breadcrumb End */}
            {/* Carousel Start */}


            <div className="container-fluid mb-3">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        <div
                            id="header-carousel"
                            className="carousel slide carousel-fade mb-30 mb-lg-0"
                            data-ride="carousel"
                        >
                            <ol className="carousel-indicators">
                                <li
                                    data-target="#header-carousel"
                                    data-slide-to={0}
                                    className="active"
                                />
                                <li data-target="#header-carousel" data-slide-to={1} />
                                <li data-target="#header-carousel" data-slide-to={2} />
                            </ol>
                            <div className="carousel-inner">
                                <div
                                    className="carousel-item position-relative active"
                                    style={{ height: 430 }}
                                >
                                    <img
                                        className="position-absolute w-100 h-100"
                                        src={image1}
                                        style={{ objectFit: "fill" }}
                                    />

                                </div>
                                <div
                                    className="carousel-item position-relative"
                                    style={{ height: 430 }}
                                >
                                    <img
                                        className="position-absolute w-100 h-100"
                                        src={image2}
                                        style={{ objectFit: 'fill' }}
                                    />

                                </div>
                                <div
                                    className="carousel-item position-relative"
                                    style={{ height: 430 }}
                                >
                                    <img
                                        className="position-absolute  w-100 h-100"
                                        src={image3}
                                        style={{ objectFit: 'fill' }}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="product-offer mb-30" style={{ height: 200 }}>
                            <img className="img-fluid" src={image4} alt="" />
                            {/* <div className="offer-text">
                                    <h6 className="text-white text-uppercase">Save 20%</h4>
                                    <h3 className="text-white mb-3">Special Offer</h3>
                                    <a href="" className="btn btn-primary">
                                        Shop Now
                                    </a>
                                </div> */}
                        </div>
                        <div className="product-offer mb-30" style={{ height: 200 }}>
                            <img className="img-fluid" src={image5} alt="" />
                            {/* <div className="offer-text">
                                    <h6 className="text-white text-uppercase">Save 20%</h4>
                                    <h3 className="text-white mb-3">Special Offer</h3>
                                    <a href="" className="btn btn-primary">
                                        Shop Now
                                    </a>
                                </div> */}
                        </div>
                    </div>
                </div>
            </div>



            {/* Carousel End */}
            {/* Featured Start */}
            <div className="container-fluid pt-5">
                <div className="row px-xl-5 pb-3">
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div
                            className="d-flex align-items-center bg-light mb-4"
                            style={{ padding: 30 }}
                        >
                            <h1 className="fa fa-check text-primary m-0 mr-3" />
                            <h5 className="font-weight-semi-bold m-0">Sản phẩm chất lượng</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div
                            className="d-flex align-items-center bg-light mb-4"
                            style={{ padding: 30 }}
                        >
                            <h1 className="fa fa-shipping-fast text-primary m-0 mr-2" />
                            <h5 className="font-weight-semi-bold m-0">Giao hàng miễn phí</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div
                            className="d-flex align-items-center bg-light mb-4"
                            style={{ padding: 30 }}
                        >
                            <h1 className="fas fa-exchange-alt text-primary m-0 mr-3" />
                            <h5 className="font-weight-semi-bold m-0">Trả hàng trong-14 ngày</h5>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div
                            className="d-flex align-items-center bg-light mb-4"
                            style={{ padding: 30 }}
                        >
                            <h1 className="fa fa-phone-volume text-primary m-0 mr-3" />
                            <h5 className="font-weight-semi-bold m-0">24/7 Hỗ trợ</h5>
                        </div>
                    </div>
                </div>
            </div>
            {/* Featured End */}

            {/* Products Start */}
            <div className="container-fluid pt-5 pb-3">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                    <span className="bg-secondary pr-3">Sản phẩm Hot</span>
                </h2>
                <div className="row px-xl-5">
                    {

                        datahot.map((item) => {
                            return (
                                <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={item.id}>
                                    <div className="product-item bg-light mb-4">
                                        <div className="product-img position-relative overflow-hidden">
                                            <img className="img-fluid w-100" src={item.image} alt="" />
                                            <div className="product-action">
                                                <Link className="btn btn-outline-dark btn-square" onClick={() => handleAddtoCart(item)} href="">
                                                    <i className="fa fa-shopping-cart" />
                                                </Link>
                                                <Link className="btn btn-outline-dark btn-square" onClick={() => handleAddtoLike(item)}>
                                                    {handleLike(item.id)}
                                                </Link>

                                                <Link className="btn btn-outline-dark btn-square" to={`../detail/${item.id}`} href="">
                                                    <i className="fa fa-search" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="text-center py-4">
                                            <Link className="h6 text-uppercase" to={`detail/${item.id}`}> {item.name}</Link>
                                            {
                                                handleProductPrice(item.price, item.pricePromotion)
                                            }
                                            <div className="d-flex align-items-center justify-content-center mb-1">
                                                <ReactStars
                                                    value={item.rating}
                                                    edit={true}
                                                    activeColors={["orange", "orange", "orange", "orange", "orange",]}
                                                /><small className="pt-1">({item.rating})</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );

                        })
                    }
                </div>
            </div>
            {/* Products End */}
            {/* Offer Start */}
            <div className="container-fluid pt-5 pb-3">
                <div className="row px-xl-5">
                    <div className="col-md-6">
                        <div className="product-offer mb-30" style={{ height: 300 }}>
                            <img className="img-fluid" src="ASSETS/img/4.jpg" alt="" />
                            <div className="offer-text">
                                <h6 className="text-white text-uppercase">Save 10%</h6>
                                <h3 className="text-white mb-3">Ưu đãi đặc biệt</h3>
                                <Link to={'../shop'} className="btn btn-primary">
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="product-offer mb-30" style={{ height: 300 }}>
                            <img className="img-fluid" src="ASSETS/img/5.jpg" alt="" />
                            <div className="offer-text">
                                <h6 className="text-white text-uppercase">Save 20%</h6>
                                <h3 className="text-white mb-3">Ưu đãi đặc biệt</h3>
                                <Link to={'../shop'} className="btn btn-primary">
                                    Shop Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Offer End */}
            {/* Products Start */}
            <div className="container-fluid pt-5 pb-3">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                    <span className="bg-secondary pr-3">Sản Phảm mới</span>
                </h2>
                <div className="row px-xl-5">
                    {

                        datanew.map((item) => {
                            return (
                                <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={item.id}>
                                    <div className="product-item bg-light mb-4">
                                        <div className="product-img position-relative overflow-hidden">
                                            <img className="img-fluid w-100" src={item.image} />
                                            <div className="product-action">
                                                <Link className="btn btn-outline-dark btn-square" onClick={() => handleAddtoCart(item)} href="">
                                                    <i className="fa fa-shopping-cart" />
                                                </Link>
                                                <Link className="btn btn-outline-dark btn-square" onClick={() => handleAddtoLike(item)}>

                                                    {handleLike(item.id)}
                                                </Link>

                                                <Link className="btn btn-outline-dark btn-square" to={`../detail/${item.id}`} href="">
                                                    <i className="fa fa-search" />
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="text-center py-4">
                                            <Link className="h6 text-uppercase" to={`detail/${item.id}`}> {item.name}</Link>
                                            {
                                                handleProductPrice(item.price, item.pricePromotion)
                                            }
                                            <div className="d-flex align-items-center justify-content-center mb-1">
                                                <ReactStars
                                                    value={item.rating}
                                                    edit={true}
                                                    activeColors={["orange", "orange", "orange", "orange", "orange",]}
                                                /><small className="pt-1">({item.rating})</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );

                        })
                    }

                </div>
            </div>
            {/* Products End */}
            {/* Categories Start */}
            <div className="container-fluid pt-5">
                <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                    <span className="bg-secondary pr-3">Hảng sản xuất</span>
                </h2>
                <div className="row px-xl-5 pb-3">

                    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <a className="text-decoration-none" href="">
                            <div className="cat-item d-flex align-items-center mb-4">
                                <div
                                    className="overflow-hidden"
                                    style={{ width: 100, height: 100 }}
                                >
                                    <img className="img-fluid" src="ASSETS/img/acer.jpg" alt="" style={{ width: 100, height: 100 }} />
                                </div>
                                <div className="flex-fill pl-3">
                                    <h4>ACER</h4>

                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <a className="text-decoration-none" href="">
                            <div className="cat-item img-zoom d-flex align-items-center mb-4">
                                <div
                                    className="overflow-hidden"
                                    style={{ width: 100, height: 100 }}
                                >
                                    <img className="img-fluid" src="ASSETS/img/asus.jpg" alt="" style={{ width: 100, height: 100 }} />
                                </div>
                                <div className="flex-fill pl-3">
                                    <h4>ASUS</h4>

                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <a className="text-decoration-none" href="">
                            <div className="cat-item img-zoom d-flex align-items-center mb-4">
                                <div
                                    className="overflow-hidden"
                                    style={{ width: 100, height: 100 }}
                                >
                                    <img className="img-fluid" src="ASSETS/img/apple.png" alt="" style={{ width: 100, height: 100 }} />
                                </div>
                                <div className="flex-fill pl-3">
                                    <h4>APPLE</h4>

                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <a className="text-decoration-none" href="">
                            <div className="cat-item img-zoom d-flex align-items-center mb-4">
                                <div
                                    className="overflow-hidden"
                                    style={{ width: 100, height: 100 }}
                                >
                                    <img className="img-fluid" src="ASSETS/img/dell.jpg" alt="" style={{ width: 100, height: 100 }} />
                                </div>
                                <div className="flex-fill pl-3">
                                    <h4>DELL</h4>

                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <a className="text-decoration-none" href="">
                            <div className="cat-item img-zoom d-flex align-items-center mb-4">
                                <div
                                    className="overflow-hidden"
                                    style={{ width: 100, height: 100 }}
                                >
                                    <img className="img-fluid" src="ASSETS/img/hp.jpeg" alt="" style={{ width: 100, height: 100 }} />
                                </div>
                                <div className="flex-fill pl-3">
                                    <h4>HP</h4>

                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <a className="text-decoration-none" href="">
                            <div className="cat-item img-zoom d-flex align-items-center mb-4">
                                <div
                                    className="overflow-hidden"
                                    style={{ width: 100, height: 100 }}
                                >
                                    <img className="img-fluid" src="ASSETS/img/lenovo.jpg" alt="" style={{ width: 100, height: 100 }} />
                                </div>
                                <div className="flex-fill pl-3">
                                    <h4>LENOVO</h4>

                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <a className="text-decoration-none" href="">
                            <div className="cat-item img-zoom d-flex align-items-center mb-4">
                                <div
                                    className="overflow-hidden"
                                    style={{ width: 100, height: 100 }}
                                >
                                    <img className="img-fluid" src="ASSETS/img/msi.jpg" alt="" style={{ width: 100, height: 100 }} />
                                </div>
                                <div className="flex-fill pl-3">
                                    <h4>MSI</h4>

                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
                        <a className="text-decoration-none" href="">
                            <div className="cat-item img-zoom d-flex align-items-center mb-4">
                                <div
                                    className="overflow-hidden"
                                    style={{ width: 100, height: 100 }}
                                >
                                    <img className="img-fluid" src="ASSETS/img/rog.jpg" alt="" style={{ width: 100, height: 100 }} />
                                </div>
                                <div className="flex-fill pl-3">
                                    <h4>ROG</h4>

                                </div>
                            </div>
                        </a>
                    </div>

                </div>
            </div>
            {/* Categories End */}
            {/* Vendor Start */}
            {/* <div className="container-fluid py-5">
                    <div className="row px-xl-5">
                        <div className="col">
                            <div className="owl-carousel vendor-carousel">
                                <div className="bg-light p-4">
                                    <img src="ASSETS/img/vendor-1.jpg" alt="" />
                                </div>
                                <div className="bg-light p-4">
                                    <img src="ASSETS/img/vendor-2.jpg" alt="" />
                                </div>
                                <div className="bg-light p-4">
                                    <img src="ASSETS/img/vendor-3.jpg" alt="" />
                                </div>
                                <div className="bg-light p-4">
                                    <img src="ASSETS/img/vendor-4.jpg" alt="" />
                                </div>
                                <div className="bg-light p-4">
                                    <img src="ASSETS/img/vendor-5.jpg" alt="" />
                                </div>
                                <div className="bg-light p-4">
                                    <img src="ASSETS/img/vendor-6.jpg" alt="" />
                                </div>
                                <div className="bg-light p-4">
                                    <img src="ASSETS/img/vendor-7.jpg" alt="" />
                                </div>
                                <div className="bg-light p-4">
                                    <img src="ASSETS/img/vendor-8.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            {/* Vendor End */}


        </Fragment>
    )

}


export default Index;