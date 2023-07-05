import React, { Fragment, useEffect, useState } from "react";
import Jquery from "../../components/Jquery";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Menu from "./menu";
import Invoice from "./Invoice/invoice";
import Account from "./Account/account";
function ProductLike() {
    const [data, setData] = useState([]);
    const usenavigate = useNavigate();
    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        const token = sessionStorage.getItem('token')
        axios.get('https://localhost:7225/api/productlikes', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
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
    }
    const handledelecttoLike = (item) => {
        axios.delete(`https://localhost:7225/api/productlikes/${item.id}`)
            .then((result) => {
                toast.success('Đã xóa sản phẩm khỏi danh sách yêu thích');
                getData();
            })
            .catch((error) => {
                toast.error(error);
            })
        // const token = sessionStorage.getItem('token')

        // if (token === null) {
        //     toast.error('Please Login');
        //     usenavigate('/Login')
        // }
        // else {
        //     const url = 'https://localhost:7225/api/productlikes';
        //     const data1 = {
        //         "accountId": 1,
        //         "productId": item.id,
        //         "product": null,
        //         "status": false
        //     }
        //     //console.log('ok', token)
        //     //JSON.parse(sessionStorage.getItem('data')).data1.id;
        //     axios.put(url, data1, {
        //         headers: { 'Authorization': `Bearer ${token}` }
        //     })
        //         .then(() => {
        //             toast.success('Đã thêm sản phẩm vào danh sách yêu thích');

        //         }).catch((error) => {
        //             toast.error(error);
        //         })
        // }
    }
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    return (
        <Fragment>
            <Jquery />
            <ToastContainer />
            <Tab.Container id="left-tabs-example" defaultActiveKey="two">
                <Row>
                    <div className="col-lg-3 col-md-4">
                        <Menu />
                    </div>
                    <div className="col-lg-9 col-md-8">
                        <Col >
                            <Tab.Content>

                                <Tab.Pane eventKey="first">
                                    <Invoice />
                                </Tab.Pane>
                                <Tab.Pane eventKey="three">
                                    <Account />
                                </Tab.Pane>
                                <Tab.Pane eventKey="two">
                                    <div className="container-fluid ">
                                        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4">
                                            <span className="bg-secondary pr-3">Danh sách sản phẩm yêu thích</span>
                                        </h2>
                                        <div className="row px-xl-5">
                                            {

                                                data.map((item) => {
                                                    return (
                                                        <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={item.id}>
                                                            <div className="product-item bg-light mb-4">
                                                                <div className="product-img position-relative overflow-hidden">
                                                                    <img className="img-fluid w-100" src={`ASSETS/image/${item.product.image}`} alt="" />
                                                                    <div className="product-action">
                                                                        <Link className="btn btn-outline-dark btn-square" onClick={() => handleAddtoCart(item)} href="">
                                                                            <i className="fa fa-shopping-cart" />
                                                                        </Link>
                                                                        <Link className="btn btn-outline-dark btn-square" onClick={() => handledelecttoLike(item)} href="">
                                                                            <i className="fa fa-times" />
                                                                        </Link>
                                                                        <a className="btn btn-outline-dark btn-square" href="">
                                                                            <i className="fa fa-sync-alt" />
                                                                        </a>
                                                                        <Link className="btn btn-outline-dark btn-square" to={`../detail/${item.product.id}`} href="">
                                                                            <i className="fa fa-search" />
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                <div className="text-center py-4">
                                                                    <Link className="h6 text-uppercase" to={`detail/${item.product.id}`}> {item.product.name}</Link>
                                                                    <div className="d-flex align-items-center justify-content-center mt-2">
                                                                        <h5>{VND.format((item.product.price - (item.product.productPromotion.percent * item.product.price) / 100))}</h5>
                                                                        <h6 className="text-muted ml-2">
                                                                            <del>{VND.format(item.product.price)}</del>
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
                                                    );

                                                })
                                            }
                                        </div>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </div>
                </Row>
            </Tab.Container>


        </Fragment>
    )

}
export default ProductLike;