import React, { Fragment, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductTypead = () => {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);


    const [name, setName] = useState('')
    const [status, setStatus] = useState(true)

    const [editID, setEditId] = useState('');
    const [editname, setEditName] = useState('')
    const [editstatus, setEditStatus] = useState(true)

    const empdata = [
        {
            id: 1,
            name: 'Gaming',
            status: 1,
        },
        {
            id: 2,
            name: 'Apple',
            status: 1,
        },
        {
            id: 3,
            name: 'HP',
            status: 1,
        },
    ]

    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        axios.get('https://localhost:7225/api/ProductTypes')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleEidt = (id) => {
        //alert(id)
        handleShow2();
        axios.get(`https://localhost:7225/api/ProductTypes/${id}`)
            .then((result) => {
                setEditName(result.data.name);
                setEditStatus(result.data.status);
                setEditId(id);
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleDelect = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm") == true) {
            axios.delete(`https://localhost:7225/api/ProductTypes/${id}`)
                .then((result) => {
                    toast.success('Đã xóa Loại sản phẩm');
                    getData();
                })
                .catch((error) => {
                    toast.error(error);
                })
        }
    }
    const handleUpdate = () => {
        const url = `https://localhost:7225/api/ProductTypes/${editID}`;
        const data = {
            "id": editID,
            "name": editname,
            "status": editstatus,
            "products": null
        }
        axios.put(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Đã sửa Loại sản phẩm');
            }).catch((error) => {
                toast.error(error);
            })
    }
    const handleSave = () => {
        const url = 'https://localhost:7225/api/ProductTypes';
        const data = {
            "name": name,
            "status": status,
            "products": null
        }
        axios.post(url, data)
            .then((result) => {
                getData();
                clear();
                toast.success('Đã thêm Loại sản phẩm');
            }).catch((error) => {
                toast.error(error);
            })
    }
    const clear = () => {
        setName('');
        setStatus(0);
        setEditName('');
        setEditStatus(0);
        setEditId('');
    }
    const handleStatusChange = (e) => {
        if (e.target.checked) {
            setStatus(true);
        }
        else {
            setStatus(false);
        }
    }
    const handleEditStatusChange = (e) => {
        if (e.target.checked) {
            setEditStatus(true);
        }
        else {
            setEditStatus(false);
        }
    }
    return (
        <Fragment>
            <ToastContainer />
            <Container>
                <Row>
                    <Col>
                        <input type="text" className="from-control" placeholder="Enter Name"
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <input type="checkbox"
                            checked={status === true ? true : false}
                            onChange={(e) => handleStatusChange(e)} value={status}
                        />
                        <label>Status</label>
                    </Col>
                    <Col>
                        <button className="btn btn-primary" onClick={() => handleSave()}>Submit</button>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <button className="btn btn-primary" onClick={() => handleShow()}>Add</button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <input type="checkbox" checked={item.status} onChange={(e) => handleEditStatusChange(e)} value={item.status}></input>
                                        </td>
                                        <td colSpan={2}>
                                            <button className="btn btn-primary" onClick={() => handleEidt(item.id)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => handleDelect(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            'Loading...'
                    }


                </tbody>
            </Table>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify / Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" className="from-control" placeholder="Enter Name"
                                value={editname} onChange={(e) => setEditName(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="checkbox"
                                checked={editstatus === true ? true : false}
                                onChange={(e) => handleEditStatusChange(e)} value={editstatus}
                            />
                            <label>Status</label>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" className="from-control" placeholder="Enter Name"
                                value={name} onChange={(e) => setName(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="checkbox"
                                checked={status === true ? true : false}
                                onChange={(e) => handleStatusChange(e)} value={status}
                            />
                            <label>Status</label>
                        </Col>
                        <Col>
                            <button className="btn btn-primary" onClick={() => handleSave()}>Submit</button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}
export default ProductTypead