import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import Jquery from "../components/Jquery";
import Footer from "../components/Footer";
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReactPaginate from 'react-paginate';
import ReactStars from 'react-rating-star-with-type'
function Shop() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [values, setValues] = useState([])
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(250000000);
  const [proCount, setProCount] = useState(0);
  const [loadFromFirstPage, setLoadFromFirstPage] = useState(false);
  const [checkedBrands, setCheckedBrands] = useState([]);
  const [name1, setName] = useState('');
  const [datalike, setDataLike] = useState([]);
  const [count, setCount] = useState(0);
  const [selectedRanges, setSelectedRanges] = useState([]);

  const selectedBrands = checkedBrands.length > 0 ? checkedBrands.join(',') : undefined;
  useEffect(() => {
    fetchData()
    getDataLike();
    setCount(0)
  }, [params, count])
  useEffect(() => {

    fetch("https://localhost:7225/api/ProductTypes").then((data) => data.json()).then((val) => setValues(val))
    setName(params.encodednames)
    fetchData();
  }, [selectedBrands, name1, minPrice, maxPrice, page, pageSize]);
  const usenavigate = useNavigate();

  const fetchData = () => {

    axios
      .get("https://localhost:7225/api/Products/FilteredProducts", {
        params: {
          brands: selectedBrands,
          minPrice: minPrice,
          maxPrice: maxPrice,
          encodednames: name1,
          page: page,
          pageSize: pageSize
        },
      })
      .then((res) => {
        setData(res.data.paginatedProducts);
        setPageCount(res.data.totalPages);
        setProCount(res.data.totalCount);
        // console.log(selectedBrands);
        if (selectedBrands == null) {
          window.history.pushState(null, null, `?page=${page}`);
          setName(params.encodednames)
        }
        else {
          window.history.pushState(null, null, `?brand=${selectedBrands}` + `/` + `?encodednames=${name1}` + `/` + `?page=${page}`);
          setName(params.encodednames)
        }
      });

  }
  const getData = () => {
    axios.get('https://localhost:7225/api/Products')
      .then((result) => {
        setData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleBrandCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedBrands([...checkedBrands, value]);
    } else {
      const updatedBrands = checkedBrands.filter((item) => item !== value);
      setCheckedBrands(updatedBrands);
    }
  };
  const handlePriceCheckboxChange = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {

      setMinPrice(0);
      setMaxPrice(10000000)
    } else {

      setMaxPrice(200000000)
    }
  };
  const handlePriceCheckboxChange1 = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {

      setMinPrice(10000000);
      setMaxPrice(20000000)
    } else {
      setMinPrice(0);

      setMaxPrice(200000000)
    }
  };
  const handlePriceCheckboxChange2 = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {

      setMinPrice(20000000);
      setMaxPrice(30000000)
    } else {
      setMinPrice(0);

      setMaxPrice(200000000)
    }
  };
  const handlePriceCheckboxChange3 = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      // Thêm thương hiệu mới vào mảng đã chọn:
      setMinPrice(30000000);
      setMaxPrice(200000000)
    } else {
      setMinPrice(0);
      // Loại bỏ thương hiệu khỏi mảng đã chọn:
      setMaxPrice(200000000)
    }
  };

  const handlePase = () => {
    setPage(1)
  }
  const handleAddtoCart = (id) => {
    const token = sessionStorage.getItem('token')
    console.log('token', token)
    if (token === null) {
      toast.error('Please Login');
      usenavigate('/Login')
    }
    else {
      const url = 'https://localhost:7225/api/Carts';
      const data1 = {
        "accountId": 1,
        "productId": id,
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
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
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
  function handlePageClick(data) {
    // Khi chuyển sang trang mới, ta chỉ cập nhật currentPage mà không tải lại dữ liệu
    setPage(data.selected + 1);
  }
  const displayProducts = data.map((item) => {
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 pb-1" >
        <div className="product-item bg-light mb-4">
          <div className="product-img position-relative overflow-hidden">
            <img className="img-fluid w-100" src={item.image} alt="" />
            <div className="product-action">
              <Link className="btn btn-outline-dark btn-square" onClick={() => handleAddtoCart(item.id)} href="">
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
            <Link className="h6 text-uppercase" to={`../detail/${item.id}`}> {item.name}</Link>
            <div className="d-flex align-items-center justify-content-center mt-2">
              {
                handleProductPrice(item.price, item.pricePromotion)
              }
            </div>
            <div className="d-flex align-items-center justify-content-center mb-1">
              <ReactStars
                value={item.rating}
                edit={true}
                activeColors={["orange", "orange", "orange", "orange", "orange",]}
              /><small className="pt-2">({item.rating})</small>

            </div>
          </div>
        </div>
      </div>


    );

  });
  return (
    <Fragment>
      <ToastContainer />
      <Jquery />
      <>

        {/* Shop Start */}
        {/* Breadcrumb Start */}
        <div className="container-fluid">
          <div className="row px-xl-5">
            <div className="col-12">
              <nav className="breadcrumb bg-light mb-30">
                <Link className="breadcrumb-item text-dark" to={"/"}>
                  Trang chủ
                </Link>
                <span className="breadcrumb-item span" >
                  Sản phẩm
                </span>
              </nav>
            </div>
          </div>
        </div>
        {/* Breadcrumb End */}
        <div className="container-fluid">
          <div className="row px-xl-5">
            {/* Shop Sidebar Start */}
            <div className="col-lg-3 col-md-4">
              {/* Price Start */}
              <h6 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Lọc sản phẩm theo hãng sản xuất</span>
              </h6>
              <div className="bg-light p-4 mb-30">
                <form>
                  {/* <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      defaultChecked=""
                      id="price-all"
                    />
                    <label className="custom-control-label" htmlFor="price-all">
                      All Price
                    </label>
                    <span className="badge border font-weight-normal">1000</span>
                  </div> */}
                  {values.map((brand) => (
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">

                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={brand.name}
                        value={brand.name}
                        checked={checkedBrands.includes(brand.name)}
                        onChange={handleBrandCheckboxChange}
                        onClick={() => handlePase()}
                      />
                      <label className="custom-control-label" htmlFor={brand.name}>
                        {brand.name}
                      </label>



                    </div>
                  ))}

                </form>
              </div>
              <h6 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Lọc sản phẩm theo Giá </span>
              </h6>
              <div className="bg-light p-4 mb-30">
                <form>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">

                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={"0-10000000"}

                      onChange={handlePriceCheckboxChange}
                      onClick={() => handlePase()}
                    />
                    <label className="custom-control-label" htmlFor={"0-10000000"}>
                      {VND.format(0)} -- {VND.format(10000000)}
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">

                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={"10000000-20000000"}

                      onChange={handlePriceCheckboxChange1}
                      onClick={() => handlePase()}
                    />
                    <label className="custom-control-label" htmlFor={"10000000-20000000"}>
                      {VND.format(10000000)} -- {VND.format(20000000)}
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">

                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={"20000000-30000000"}

                      onChange={handlePriceCheckboxChange2}
                      onClick={() => handlePase()}
                    />
                    <label className="custom-control-label" htmlFor={"20000000-30000000"}>
                      {VND.format(20000000)} -- {VND.format(30000000)}
                    </label>
                  </div>
                  <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">

                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id={"30000000tl"}

                      onChange={handlePriceCheckboxChange3}
                      onClick={() => handlePase()}
                    />
                    <label className="custom-control-label" htmlFor={"30000000tl"}>
                      {VND.format(30000000)} Trở lên
                    </label>
                  </div>
                </form>
              </div>
              {/* Price End */}


            </div>
            {/* Shop Sidebar End */}
            {/* Shop Product Start */}
            <div className="col-lg-9 col-md-8">
              <div className="row pb-3">
                <div className="col-12 pb-1">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                      <button className="btn btn-sm btn-light">
                        <i className="fa fa-th-large" />
                      </button>

                    </div>
                    <div className="ml-2">

                      <div className="btn-group ml-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-light dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          Hiển thị(số lượng)
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <button className="dropdown-item" onClick={() => setPageSize(10)}>
                            10
                          </button>
                          <button className="dropdown-item" onClick={() => setPageSize(20)}>
                            20
                          </button>
                          <button className="dropdown-item" onClick={() => setPageSize(30)}>
                            30
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {displayProducts}
                <div className="col-12">
                  <nav>
                    <ul className="paginations justify-content-center">

                      <ReactPaginate
                        previousLabel={
                          <li className="page-item">
                            <a className="page-link" >
                              Previous
                            </a>
                          </li>
                        }
                        nextLabel={
                          <li className="page-item">
                            <a className="page-link" >
                              Next
                            </a>
                          </li>
                        }
                        breakLabel="..."
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName={"paginations"}
                        previousLinkClassName={"previous_page"}
                        nextLinkClassName={"next_page"}
                        disabledClassName={"disableds"}
                        activeClassName={"actives"}
                        pageClassName={"page-link"}
                      />
                    </ul>
                  </nav>
                  {/* <nav>
                    <ul className="pagination justify-content-center">
                      <li className="page-item disabled">
                        <a className="page-link" href="#">
                          Previous
                        </a>


                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav> */}
                </div>
              </div>
            </div>
            {/* Shop Product End */}
          </div>
        </div>
        {/* Shop End */}

      </>
    </Fragment>
  )
}
export default Shop;