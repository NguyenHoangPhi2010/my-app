
import React, { Fragment } from "react";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { Link, useNavigate } from "react-router-dom";

function Menu() {
    const usenavigate = useNavigate();
    const handleSighOut = () => {
        if (window.confirm("Bạn có chắc muốn đăng xuát") === true) {
            sessionStorage.clear();
            usenavigate('/')
        }
    }
    return (
        <Col >
            <Nav variant="pills" className="flex-column">
                <Nav.Item>
                    <Nav.Link eventKey="first">
                        <div
                            className="d-flex align-items-center "
                            style={{ padding: 5 }}
                        >
                            <h2 className="fa fa-history text-black-50 mr-2 " />
                            <h5 className="font-weight-semi-bold m-0">Lịch sử mua hàng</h5>
                        </div>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="three">
                        <div
                            className="d-flex align-items-center "
                            style={{ padding: 5 }}
                        >
                            <h2 className="fa fa-user-circle text-black-50 mr-2 " />
                            <h5 className="font-weight-semi-bold m-0">Thông tin tài khoản</h5>
                        </div>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="two">
                        <div
                            className="d-flex align-items-center "
                            style={{ padding: 5 }}
                        >
                            <h2 className="fa fa-heart text-black-50 mr-2 " />
                            <h5 className="font-weight-semi-bold m-0">Danh sách sản phẩm yêu thích</h5>
                        </div>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="four">
                        <div
                            className="d-flex align-items-center "
                            style={{ padding: 5 }}
                            onClick={() => handleSighOut()}
                        >
                            <h2 className="fa fa-sign-out text-black-50 mr-2 " />
                            <h5 className="font-weight-semi-bold m-0">Thoát tài khoản</h5>
                        </div>
                    </Nav.Link>
                </Nav.Item>
            </Nav>

        </Col>
    )
}
export default Menu;