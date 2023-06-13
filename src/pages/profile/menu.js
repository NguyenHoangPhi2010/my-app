
import React, { Fragment } from "react";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
function Menu() {
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
                            <h2 className="fa fa-user text-black-50 mr-2 " />
                            <h5 className="font-weight-semi-bold m-0">Thông tin tài khoảng</h5>
                        </div>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="four">
                        <div
                            className="d-flex align-items-center "
                            style={{ padding: 5 }}
                        >
                            <h2 className="fa fa-sign-in text-black-50 mr-2 " />
                            <h5 className="font-weight-semi-bold m-0">Thoát tài khoản</h5>
                        </div>
                    </Nav.Link>
                </Nav.Item>
            </Nav>

        </Col>
    )
}
export default Menu;