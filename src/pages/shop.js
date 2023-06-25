import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import Jquery from "../components/Jquery";
import Footer from "../components/Footer";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "../components/pagination";
import ReactPaginate from "react-paginate";
function Shop() {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(250000000);
  const [proCount, setProCount] = useState(0);
  const [loadFromFirstPage, setLoadFromFirstPage] = useState(false);
  const [checkedBrands, setCheckedBrands] = useState([]);
  const brands = ['ACER', 'ASUS', 'HP', 'LENOVO', 'ROG', 'DELL', 'MSI', 'APPLE'];
  const selectedBrands = checkedBrands.length > 0 ? checkedBrands.join(',') : undefined;
  useEffect(() => {

    async function fetchData() {
      try {
        await axios
          .get("https://localhost:7225/api/Products/FilteredProducts", {
            params: {
              brands: selectedBrands,
              // cpus: selectedCPUs,
              // rams: selectedRams,
              minPrice: minPrice,
              maxPrice: maxPrice,
              page: page,
              pageSize: pageSize
            },
          })
          .then((res) => {
            setData(res.data.paginatedProducts);
            setPageCount(res.data.totalPages);
            setProCount(res.data.totalCount);
            console.log(res.data);
            // console.log(selectedBrands);
            if (loadFromFirstPage) {
              setPage(1);
            }
            if (selectedBrands == null) {
              window.history.pushState(null, null, `?page=${page}`);
            }
            else {
              window.history.pushState(null, null, `?brand=${selectedBrands}` + `/` + `?page=${page}`);
            }
            // const urlParams = new URLSearchParams(window.location.search);
            // urlParams.set("brand", selectedBrands);
            // urlParams.set("page", selectedPage);
            // window.history.pushState(null, null, "?" + urlParams.toString());
          });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [selectedBrands, minPrice, maxPrice, page, pageSize], [loadFromFirstPage]);
  const usenavigate = useNavigate();
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
      // Thêm thương hiệu mới vào mảng đã chọn:
      setCheckedBrands([...checkedBrands, value]);
    } else {
      // Loại bỏ thương hiệu khỏi mảng đã chọn:
      const updatedBrands = checkedBrands.filter((item) => item !== value);
      setCheckedBrands(updatedBrands);
    }
  };
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
        }).catch((error) => {
          toast.error(error);
        })
    }
  }
  const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  function handlePageClick(data) {
    // Khi chuyển sang trang mới, ta chỉ cập nhật currentPage mà không tải lại dữ liệu
    setPage(data.selected + 1);
  }
  const displayProducts = data.map((item) => {
    return (
      <div className="col-lg-3 col-md-4 col-sm-6 pb-1" key={item.id}>
        <div className="product-item bg-light mb-4">
          <div className="product-img position-relative overflow-hidden">
            <img className="img-fluid w-100" src={`ASSETS/image/${item.image}`} alt="" />
            <div className="product-action">
              <Link className="btn btn-outline-dark btn-square" onClick={() => handleAddtoCart(item.id)} href="">
                <i className="fa fa-shopping-cart" />
              </Link>
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
            <Link className="h6 text-uppercase" to={`../detail/${item.id}`}> {item.name}</Link>
            <div className="d-flex align-items-center justify-content-center mt-2">
              <h7 className="text-muted ml-2">{VND.format(item.price)}</h7>
              {/* <h9 className="text-muted ml-2">
                <del>{item.price}VNĐ</del>
              </h9> */}
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

  });
  return (
    <Fragment>
      <ToastContainer />
      <Jquery />
      <>

        {/* Shop Start */}
        <div className="container-fluid">
          <div className="row px-xl-5">
            {/* Shop Sidebar Start */}
            <div className="col-lg-3 col-md-4">
              {/* Price Start */}
              <h5 className="section-title position-relative text-uppercase mb-3">
                <span className="bg-secondary pr-3">Filter by ProductType</span>
              </h5>
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
                  {brands.map((brand) => (
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">

                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id={brand}
                        value={brand}
                        checked={checkedBrands.includes(brand)}
                        onChange={handleBrandCheckboxChange}
                      />
                      <label key={brand} className="custom-control-label" htmlFor={brand}>
                        {brand}
                      </label>



                    </div>
                  ))}
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
                      <button className="btn btn-sm btn-light ml-2">
                        <i className="fa fa-bars" />
                      </button>
                    </div>
                    <div className="ml-2">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-light dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          Sorting
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">
                            Latest
                          </a>
                          <a className="dropdown-item" href="#">
                            Popularity
                          </a>
                          <a className="dropdown-item" href="#">
                            Best Rating
                          </a>
                        </div>
                      </div>
                      <div className="btn-group ml-2">
                        <button
                          type="button"
                          className="btn btn-sm btn-light dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          Showing
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <a className="dropdown-item" href="#">
                            10
                          </a>
                          <a className="dropdown-item" href="#">
                            20
                          </a>
                          <a className="dropdown-item" href="#">
                            30
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {displayProducts}
                <div className="col-12">
                  <nav>
                    <ul className="pagination justify-content-center">
                      <ReactPaginate
                        previousLabel={<li className="page-item">
                          <a className="page-link" href="#">
                            Previous
                          </a>


                        </li>}
                        nextLabel={<li className="page-item">
                          <a className="page-link" href="#">
                            Next
                          </a>
                        </li>}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        previousLinkClassName={"previous_page"}
                        nextLinkClassName={"next_page"}
                        disabledClassName={"disabled"}
                        activeClassName={"active"}
                        forcePage={page - 1}
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