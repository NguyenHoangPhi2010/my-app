import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import Jquery from "../components/Jquery";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Cart() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    getData();
    setCount(0)
  }, [params])
  const usenavigate = useNavigate();
  const getData = () => {
    const token = sessionStorage.getItem('token')
    if (token == null) {
      console.log("Cart null")
    } else {
      axios.get('https://localhost:7225/api/Carts', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then((result) => {
          setData(result.data)
          setCount(count + 1);
        })
        .catch((error) => {
          console.log(error)
        })
    }

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
        setCount(count + 1);
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
          setCount(count + 1);
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
          setCount(count + 1);
        })
        .catch((error) => {
          toast.error(error);
        })
    }
  }
  var tong = data.reduce((a, v) => a = a + (v.product.price - (v.product.productPromotion.percent * v.product.price) / 100) * v.quantity, 0)
  const handleCheckOut = () => {
    if (data.length === 0) {
      toast.error("Giỏ hàng lỏng");
    } else {
      usenavigate(`/checkout/${((tong / 23000).toFixed())}`)
    }
  }

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
                <span className="breadcrumb-item active">
                  Giỏ hàng
                </span>
              </nav>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        {/* Cart Start */}
        {


          data && data.length > 0 ?
            <div className="container-fluid">
              <div className="row px-xl-5">
                <div className="col-lg-8 table-responsive mb-5">
                  <table className="table table-light table-borderless table-hover text-center mb-0">
                    <thead className="thead-dark">
                      <tr>
                        <th></th>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng tiền</th>
                        <th>Xóa</th>
                      </tr>
                    </thead>
                    <tbody className="align-middle">
                      {

                        data.map((item, Index) => {
                          return (

                            <tr key={Index}>
                              <td className="align-middle">
                                <img src={item.product.image} style={{ width: 70 }} />{" "}

                              </td>
                              <td>{item.product.name}</td>
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
                              <td className="align-middle">
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelect(item.id)}>
                                  <i className="fa fa-times" />
                                </button>
                              </td>
                            </tr>
                          )
                        })

                      }

                    </tbody>
                  </table>
                </div>
                <div className="col-lg-4">
                  {/* <form className="mb-30" action="">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control border-0 p-4"
                        placeholder="Coupon Code"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary">Apply Coupon</button>
                      </div>
                    </div>
                  </form> */}
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
                      <button className="btn btn-block btn-primary font-weight-bold my-3 py-3" onClick={() => handleCheckOut()}>
                        Tiến hành thanh toán
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className="position-relative"
              style={{ height: 430 }}>
              <img
                className="position-absolute w-100 h-100"
                src="ASSETS/img/3.jpg"
                style={{ objectFit: 'fill' }}
              />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: 700 }}>
                  <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">

                  </h1>
                  <p className="mx-md-5 px-5 animate__animated animate__bounceIn">
                    Giỏ hàng đang trống nhấp vào mua ngay để mua hàng
                  </p>
                  <Link
                    className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                    to={"/shop"}
                  >
                    Mua ngay
                  </Link>
                </div>
              </div>
            </div>
        }

        {/* Cart End */}

      </>

    </Fragment >
  )
}
export default Cart;