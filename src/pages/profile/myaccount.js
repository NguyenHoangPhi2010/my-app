import React, { Fragment } from "react";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Header from "../../components/Header";

import Menu from "./menu";
import Invoice from "./Invoice/invoice";


function MyAccount() {
    return (
        <Fragment>
            <>
                <Header />
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
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
                                    <Tab.Pane eventKey="detail">
                                        klajsjas
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </div>
                    </Row>
                </Tab.Container>
            </>

        </Fragment>
    )
}
export default MyAccount;