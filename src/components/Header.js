import React, { Fragment, useEffect, useState } from "react";
import { Link, NavLink, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Index from "../pages";
function Header() {
    const params = useParams();
    const [data, setData] = useState([]);
    const [datalike, setDataLike] = useState([]);
    const [countcart, setCountCart] = useState(0)
    const [countLike, setCountLike] = useState(0)
    const [searchQuery, setSearchQuery] = useState(null);
    const [search, setSearch] = useState([]);
    const [producttype, setProductType] = useState([]);

    useEffect(() => {
        getSearch();
    }, [searchQuery])

    useEffect(() => {
        getData();
        getDataLike();
        getProductType();
    }, [params])
    useEffect(() => {
        getProductType();
    }, [])

    const usenavigate = useNavigate();
    const token = sessionStorage.getItem('token')
    const getData = () => {
        const token = sessionStorage.getItem('token')
        axios.get('https://localhost:7225/api/Carts', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                setData(result.data);
                setCountCart(result.data.length)
            })
            .catch((error) => {
                console.log(error);
            })

    }
    const getDataLike = () => {
        const token = sessionStorage.getItem('token')
        axios.get('https://localhost:7225/api/productlikes', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                setDataLike(result.data)
                setCountLike(result.data.length)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    var tong = data.reduce((a, v) => a = a + (v.product.price - (v.product.productPromotion.percent * v.product.price) / 100) * v.quantity, 0)
    const getProductType = () => {
        axios.get('https://localhost:7225/api/ProductTypes')
            .then((result) => {
                setProductType(result.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }
    const getSearch = () => {
        if (!searchQuery) {
            setSearch(null);
        } else {
            axios
                .get(`https://localhost:7225/api/Home/GetProductHome?search=${searchQuery}`)
                .then((result) => {
                    setSearch(result.data);
                    if (result.data.length == 0) {
                    } else {
                        if (result.status === 200) {
                            //toast.success("Có " + result.data.length + " sản phẩm");
                        }
                    }
                    // const currentURL = new URL(window.location.href);
                    // const newURL = new URL(currentURL);
                    // newURL.searchParams.delete('poscats');
                    // window.history.pushState(newURL.toString());
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const handleAddtoCart = (item) => {
        const token = sessionStorage.getItem('token')

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
                "quantity": 1
            }

            //console.log('ok', token)
            //JSON.parse(sessionStorage.getItem('data')).data1.id;
            axios.post(url, data1, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(() => {
                    toast.success('Đã thêm một sản phẩm vào giỏ hàng');
                }).catch((error) => {
                    toast.error(error);
                })
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const result = getSearch(searchQuery);
        if (result) {
            search.map((item) => {
                return (
                    <div className="hot-deal-active col-lg-4 col-md-4 col-sm-6 col-6">
                        <div className="single-product">
                            <div className="pro-img">
                                <a href="product.html">
                                    <img
                                        className="primary-img"
                                        src={item.image.path1}
                                        alt="single-product"
                                    />
                                    <img
                                        className="secondary-img"
                                        src={item.image.path5}
                                        alt="single-product"
                                    />
                                </a>
                                <div className="countdown" data-countdown="2030/03/01" />
                                <a
                                    href="/#"
                                    className="quick_view"
                                    data-toggle="modal"
                                    data-target="/#myModal"
                                    title="Quick View"
                                >
                                    <i className="lnr lnr-magnifier" />
                                </a>
                            </div>

                            <div className="pro-content">
                                <div className="pro-info">
                                    <h4>
                                        <a href="product.html">{item.name}</a>
                                    </h4>
                                    <p>
                                        <span className="price">{VND.format(item.price)}</span>
                                        <del className="prev-price">
                                            {item.price - item.price * 0.2}
                                        </del>
                                    </p>
                                    <div className="label-product l_sale">
                                        20<span className="symbol-percent">%</span>
                                    </div>
                                    {/* <Rating value={item.rating} /> */}
                                </div>
                                <div className="pro-actions">
                                    <div className="actions-primary">
                                        <Link to={`/shop/${item.id}`}>
                                            + Clik to view {item.id}
                                        </Link>
                                    </div>
                                    <div className="actions-primary">
                                        <a onClick={() => handleAddtoCart(item)} title="Add to Cart">
                                            + Add To Cart
                                        </a>
                                    </div>
                                    <div className="actions-secondary">
                                        <a href="compare.html" title="Compare">
                                            <i className="lnr lnr-sync" />
                                            <span>Add To Compare</span>
                                        </a>
                                        <a href="wishlist.html" title="WishList">
                                            <i className="lnr lnr-heart" />
                                            <span>Add to WishList</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            });
        }
    };
    const VND = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    });
    const handleDelect = (item) => {
        if (
            window.confirm(
                "Bạn có chắc chắn muốn xóa " + "'" + item.product.name + "'"
            ) == true
        ) {
            axios.delete(`https://localhost:7225/api/Carts/${item.id}`).then((result) => {
                console.log(result.status);
                if (result.status === 204) {
                    toast.success(
                        "Xóa thành công sản phẩm " + item.product.name + " ra khỏi giỏ hàng"
                    );
                    getData();
                }
            });
        }
    };
    const handleSighOut = () => {
        if (window.confirm("Bạn có chắc muốn đăng xuát") === true) {
            sessionStorage.clear();
            usenavigate('/')
        }
    }
    const handlechecklogin = () => {
        var name = sessionStorage.getItem('username');
        if (name === null) {
            return (<div className="dropdown-menu dropdown-menu-right">
                <Link className="dropdown-item" to={"/login"} type="button">
                    <h6 className="fa fa-sign-in text-black-50 mr-2 " />
                    Đăng nhập
                </Link>
                <Link className="dropdown-item" to={"/signup"} type="button">
                    <h6 className="fa fa-user-plus text-black-50 mr-2 " />
                    Đăng ký
                </Link>
            </div>)
        } else {
            return (<div className="dropdown-menu dropdown-menu-right">
                <div className="dropdown-item" >
                    Xin chào {name}
                </div>
                <Link className="dropdown-item" to={"/myaccount"} type="button">
                    <h6 className="fa fa-user-circle text-black-50 mr-2 " />
                    Profile
                </Link>

                <button className="dropdown-item" type="button" onClick={() => handleSighOut()}>
                    <h6 className="fa fa-sign-out text-black-50 mr-2 " />
                    Đăng xuât
                </button>
            </div>)
        }
    }
    return (
        <Fragment>
            {/* Topbar Start */}
            <div className="container-fluid">
                {/* <div className="row bg-secondary py-1 px-xl-5">
                    <div className="col-lg-6 d-none d-lg-block">
                        <div className="d-inline-flex align-items-center h-100">
                            <Link className="text-body mr-2" to="/">About</Link>
                            <Link className="text-body mr-3" to="/">Contact</Link>
                            <Link className="text-body mr-3" to="/">Help</Link>
                            <Link className="text-body mr-3" to="/">FAQs</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 text-center text-lg-right">
                        <div className="d-inline-flex align-items-center">

                            <div className="btn-group mx-2">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-light dropdown-toggle"
                                    data-toggle="dropdown"
                                >
                                    USD
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button">
                                        EUR
                                    </button>
                                    <button className="dropdown-item" type="button">
                                        GBP
                                    </button>
                                    <button className="dropdown-item" type="button">
                                        CAD
                                    </button>
                                </div>
                            </div>
                            <div className="btn-group">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-light dropdown-toggle"
                                    data-toggle="dropdown"
                                >
                                    EN
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item" type="button">
                                        FR
                                    </button>
                                    <button className="dropdown-item" type="button">
                                        AR
                                    </button>
                                    <button className="dropdown-item" type="button">
                                        RU
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="d-inline-flex align-items-center d-block d-lg-none">
                            <a href="" className="btn px-0 ml-2">
                                <i className="fas fa-heart text-dark" />
                                <span
                                    className="badge text-dark border border-dark rounded-circle"
                                    style={{ paddingBottom: 2 }}
                                >
                                    0
                                </span>
                            </a>
                            <Link className="btn px-0 ml-2" to="/cart">
                                <i className="fas fa-shopping-cart text-dark" />
                                <span
                                    className="badge text-dark border border-dark rounded-circle"
                                    style={{ paddingBottom: 2 }}
                                >
                                    {countcart}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div> */}
                <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
                    <div className="col-lg-4">
                        <Link className="text-decoration-none" to="/">
                            <span className="h1 text-uppercase text-primary bg-dark px-2">
                                Laptoptp
                            </span>
                            <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                                Shop
                            </span>
                        </Link>
                    </div>

                    <div className="col-lg-4 col-6 text-left">
                        <div className="categorie-search-box">
                            <div className="cart-box mt-all-30">
                                <ul className="d-flex justify-content-lg-end justify-content-center align-items-center">
                                    <li>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type="text"
                                                name="search"
                                                placeholder="Nhập từ khóa cần tìm"
                                                value={searchQuery}
                                                onChange={(e) => {
                                                    setSearchQuery(e.target.value);
                                                }}
                                                className="my-search"
                                                autoComplete="off"
                                            />
                                            <button className="bg-transparent text-primary" >
                                                <Link className="fa fa-search " to={`../shop/${searchQuery}`}></Link>
                                            </button>
                                        </form>
                                        <ul className="ht-dropdown search-box-width">
                                            <li>
                                                {search && search.length > 0
                                                    ? search.map((item) => {
                                                        return (

                                                            <div className="single-search-box">
                                                                <Link to={`detail/${item.id}`}>
                                                                    <div className="cart-img">
                                                                        <a href="/#">
                                                                            <img
                                                                                src={item.image}
                                                                                alt="cart-image"
                                                                            />
                                                                        </a>
                                                                    </div>
                                                                    <div className="cart-content">
                                                                        <h6>
                                                                            <Link to={`../detail/${item.id}`}>
                                                                                {item.name}{" "}
                                                                            </Link>
                                                                        </h6>
                                                                        <h6 className="text-red">{VND.format((item.price - (item.productPromotion.percent * item.price) / 100))}</h6>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        );
                                                    })
                                                    : ""}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-6 text-right">
                        <p className="m-0 mr-6">Liên hệ</p>
                        <h5 className="m-0">+012 345 6789</h5>
                    </div>
                </div>
            </div>
            {/* Topbar End */}
            {/* Navbar Start */}
            <div className="container-fluid bg-dark mb-30">
                <div className="row px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <a
                            className="btn d-flex align-items-center justify-content-between bg-primary w-100"
                            data-toggle="collapse"
                            href="#navbar-vertical"
                            style={{ height: 65, padding: "0 30px" }}
                        >
                            <h6 className="text-dark m-0">
                                <i className="fa fa-bars mr-2" />
                                Loại sản phẩm
                            </h6>
                            <i className="fa fa-angle-down text-dark" />
                        </a>
                        <nav
                            className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
                            id="navbar-vertical"
                            style={{ width: "calc(100% - 30px)", zIndex: 999 }}
                        >
                            <div className="navbar-nav w-100">
                                {
                                    producttype.map((item, index) => {
                                        return (
                                            <Link href="" className="nav-item nav-link" to={'../shop'}>
                                                {item.name}
                                            </Link>
                                        )
                                    })
                                }

                            </div>
                        </nav>
                    </div>
                    <div className="col-lg-9">
                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
                            <a href="" className="text-decoration-none d-block d-lg-none">
                                <span className="h1 text-uppercase text-dark bg-light px-2">
                                    Multi
                                </span>
                                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                                    Shop
                                </span>
                            </a>
                            <button
                                type="button"
                                className="navbar-toggler"
                                data-toggle="collapse"
                                data-target="#navbarCollapse"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div
                                className="collapse navbar-collapse justify-content-between"
                                id="navbarCollapse"
                            >
                                <div className="navbar-nav mr-auto py-0">
                                    <Link className="nav-item nav-link" to="/">Trang chủ</Link>
                                    <Link className="nav-item nav-link" to="/shop">Sản phẩm</Link>
                                    <Link className="nav-item nav-link" to="/cart">Giỏ hàng</Link>
                                    <Link className="nav-item nav-link" to="/contact">Hỗ trợ</Link>


                                </div>
                                <div className="cart-box mx-5 my-n1 py-0 d-none d-lg-block">
                                    <ul className="my-n1">
                                        <li >
                                            <div className="navbar-nav  ml-0 my-2 py-0 d-none d-lg-block">
                                                <Link href="" className="btn px-0 ml-0 " to={"/cart"}>
                                                    <i className="fas fa-shopping-cart text-primary " />
                                                    <span
                                                        className="badge text-secondary border border-secondary rounded-circle"
                                                        style={{ paddingBottom: 2 }}
                                                    >
                                                        {countcart}
                                                    </span>
                                                </Link>
                                            </div>
                                            <ul className="ht-dropdown cart-box-width">
                                                <li>
                                                    {data && data.length > 0
                                                        ? data.map((item, index) => {
                                                            return (
                                                                <div className="single-cart-box">
                                                                    <row>
                                                                        <div className="cart-img">
                                                                            <a href="/#">
                                                                                <img
                                                                                    src={item.product.image}
                                                                                    alt="cart-image"
                                                                                />
                                                                            </a>
                                                                            <span className="pro-quantity">
                                                                                {item.quantity}
                                                                            </span>
                                                                        </div>
                                                                        <div className="cart-content">
                                                                            <h6>
                                                                                <Link to={`/shop/${item.id}`}>
                                                                                    {item.product.name}{" "}
                                                                                </Link>
                                                                            </h6>
                                                                            <row>
                                                                                <span className="cart-price">
                                                                                    {VND.format(item.product.price)}
                                                                                </span>
                                                                                <a className="btn btn-sm btn-danger" onClick={() => handleDelect(item)}>
                                                                                    <i className="fa fa-times" />
                                                                                </a>
                                                                            </row>
                                                                        </div>

                                                                    </row>

                                                                </div>
                                                            );
                                                        })
                                                        : "Không có sản phẩm nào"}
                                                    <div className="cart-footer">
                                                        <ul className="price-content">
                                                            <li>
                                                                Total <span>{VND.format(tong)}</span>
                                                            </li>
                                                        </ul>
                                                        <div className="cart-actions text-center">
                                                            <Link to="/cart" className="cart-checkout">
                                                                Xem giỏ hàng
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>

                                        </li>

                                    </ul>
                                </div>

                                <div className="navbar-nav ml-0 mb-2 py-0 my-n1 d-none d-lg-block">
                                    <Link href="" className="btn px-0" to={'../productlike'}>
                                        <i className="fas fa-heart text-primary" />
                                        <span
                                            className="badge text-secondary border border-secondary rounded-circle"
                                            style={{ paddingBottom: 2 }}
                                        >
                                            {countLike}
                                        </span>
                                    </Link>

                                    {/* <Link href="" className="btn px-0 ml-3" to={"/cart"}>
                                        <i className="fas fa-shopping-cart text-primary" />
                                        <span
                                            className="badge text-secondary border border-secondary rounded-circle"
                                            style={{ paddingBottom: 2 }}
                                        >
                                            {countcart}
                                        </span>
                                    </Link>
                                    <ul className="ht-dropdown cart-box-width">
                                        <li>
                                            {data && data.length > 0
                                                ? data.map((item, index) => {
                                                    return (
                                                        <div className="single-cart-box">
                                                            <row>
                                                                <div className="cart-img">
                                                                    <a href="/#">
                                                                        <img
                                                                            src={
                                                                                process.env.PUBLIC_URL +
                                                                                "/" +
                                                                                item.product.image.path1
                                                                            }
                                                                            alt="cart-image"
                                                                        />
                                                                    </a>
                                                                    <span className="pro-quantity">
                                                                        {item.quantity}
                                                                    </span>
                                                                </div>
                                                                <div className="cart-content">
                                                                    <h6>
                                                                        <Link to={`/shop/${item.id}`}>
                                                                            {item.product.name}{" "}
                                                                        </Link>
                                                                    </h6>
                                                                    <span className="cart-price">
                                                                        {VND.format(item.product.price)}
                                                                    </span>
                                                                </div>
                                                                <a className="del-icone">
                                                                    <i
                                                                        className="ion-close"
                                                                        onClick={() => handleDelete(item)}
                                                                    />
                                                                </a>
                                                            </row>
                                                        </div>
                                                    );
                                                })
                                                : "Không có sản phẩm nào"}
                                            <div className="cart-footer">
                                                <ul className="price-content">
                                                    <li>
                                                        Total <span>{VND.format(total)}</span>
                                                    </li>
                                                </ul>
                                                <div className="cart-actions text-center">
                                                    <Link to="/cart" className="cart-checkout">
                                                        Xem giỏ hàng
                                                    </Link>
                                                </div>
                                            </div>
                                        </li>
                                    </ul> */}

                                </div>
                                <div className="navbar-nav ml-5 py-0 d-none d-lg-block">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light dropdown-toggle"
                                        data-toggle="dropdown"
                                    >
                                        Tài khoản
                                    </button>
                                    {handlechecklogin()}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Navbar End */}

        </Fragment>
    )

}
export default Header
