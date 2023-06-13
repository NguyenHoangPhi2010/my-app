import React, { Fragment, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

const Productad = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [sku, setSKU] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [rating, setRating] = useState('')
    const [productTypeId, setProductTypeId] = useState('')
    const [productPromotionId, setProductPromotionId] = useState('')
    const [image, setImage] = useState('')
    const [status, setStatus] = useState(0)
    const [productHot, setProductHot] = useState(0)
    const [productNew, setProductNew] = useState(0)

    const [editID, setEditId] = useState('');
    const [editsku, setEditSKU] = useState('')
    const [editname, setEditName] = useState('')
    const [editdescription, setEditDescription] = useState('')
    const [editprice, setEditPrice] = useState('')
    const [editstock, setEditStock] = useState('')
    const [editrating, setEditRating] = useState('')
    const [editproductTypeId, setEditProductTypeId] = useState('')
    const [editproductPromotionId, setEditProductPromotion] = useState('')
    const [editimage, setEditImage] = useState('')
    const [editstatus, setEditStatus] = useState(0)
    const [editproductHot, setEditProductHot] = useState(0)
    const [editproductNew, setEditProductNew] = useState(0)


    const empdata = [
        {
            id: 1,
            sku: 'WT3WPGZ9BTWB',
            name: 'Laptop Acer Aspire 7 Gaming A715 42G R05G R5 5500U/8GB/512GB/4GB GTX1650/144Hz/Win11 (NH.QAYSV.007)',
            description: 'Laptop Acer Aspire 7 Gaming A715 42G R05G (NH.QAYSV.007)',
            price: 20490000,
            stock: 10,
            rating: 5,
            productTypeId: 1,
            productPromotionId: 1,
            image: '1.jpg',
            status: 1,
            productHot: 1,
            productNew: 1,
        },
        {
            id: 2,
            sku: '98IOWWXWYVQ4',
            name: 'Laptop Asus TUF Gaming F15 FX506LHB i5 10300H/8GB/512GB/4GB GTX1650/144Hz/Win11 (HN188W)',
            description: 'Laptop Acer Aspire 7 Gaming A715 42G R05G (NH.QAYSV.007)',
            price: 20790000,
            stock: 10,
            Rating: 5,
            productTypeId: 1,
            productPromotionId: 1,
            image: '1.jpg',
            status: 1,
            productHot: 1,
            productNew: 1,
        },
        {
            id: 3,
            sku: 'WT3WPGZ9BTWB',
            name: 'Laptop Lenovo Ideapad Gaming 3 15IHU6 i5 11320H/8GB/512GB/4GB GTX1650/120Hz/Win11 (82K101F3VN)',
            description: 'Laptop Acer Aspire 7 Gaming A715 42G R05G (NH.QAYSV.007)',
            price: 20990000,
            stock: 10,
            Rating: 5,
            productTypeId: 1,
            productPromotionId: 1,
            image: '1.jpg',
            status: 1,
            productHot: 1,
            productNew: 1,
        },
    ]

    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    const getData = () => {
        axios.get('https://localhost:7225/api/Products')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleEidt = (id) => {
        //alert(id)
        handleShow();
    }
    const handleDelect = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm") == true) {

        }
        alert(id)
    }
    const handleUpdate = () => {

    }
    const handleSave = () => {

    }
    return (
        <Fragment>
            <Container>
                <Row>
                    <Col>
                        <input type="text" className="from-control" placeholder="Enter SKU"
                            value={sku} onChange={(e) => setSKU(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <input type="text" className="from-control" placeholder="Enter Name"
                            value={name} onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <input type="text" className="from-control" placeholder="Enter Description"
                            value={description} onChange={(e) => setDescription(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <input type="text" className="from-control" placeholder="Enter Price"
                            value={price} onChange={(e) => setPrice(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <input type="text" className="from-control" placeholder="Enter Stock"
                            value={stock} onChange={(e) => setStock(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <input type="text" className="from-control" placeholder="Enter Rating"
                            value={rating} onChange={(e) => setRating(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <input type="text" className="from-control" placeholder="Enter ProductTypeId"
                            value={productTypeId} onChange={(e) => setProductTypeId(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <input type="text" className="from-control" placeholder="Enter ProductPromotionId"
                            value={productPromotionId} onChange={(e) => setProductPromotionId(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <input type="text" className="from-control" placeholder="Enter Image"
                            value={image} onChange={(e) => setImage(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <input type="checkbox"
                            checked={status == 1 ? true : false}
                            onChange={(e) => setStatus(e)} value={status}
                        />
                        <label>Status</label>
                    </Col>
                    <Col>
                        <input type="checkbox"
                            checked={productHot == 1 ? true : false}
                            onChange={(e) => setProductHot(e)} value={productHot}
                        />
                        <label>ProductHot</label>
                    </Col>
                    <Col>
                        <input type="checkbox"
                            checked={productNew == 1 ? true : false}
                            onChange={(e) => setProductNew(e)} value={productNew}
                        />
                        <label>ProductNew</label>
                    </Col>
                    <Col>
                        <button className="btn btn-primary" onClick={() => handleSave()}>Submit</button>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Rating</th>
                        <th>ProductTypeId</th>
                        <th>ProductPromotionId</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>ProductHot</th>
                        <th>ProductNew</th>
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
                                        <td>{item.sku}</td>
                                        <td>{item.name}</td>
                                        <td>{item.description}</td>
                                        <td>{item.price}</td>
                                        <td>{item.stock}</td>
                                        <td>{item.rating}</td>
                                        <td>{item.productTypeId}</td>
                                        <td>{item.productPromotionId}</td>
                                        <td>{item.image}</td>
                                        <td>{item.status}</td>
                                        <td>{item.productHot}</td>
                                        <td>{item.productNew}</td>
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
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modify / Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" className="from-control" placeholder="Enter SKU"
                                value={editsku} onChange={(e) => setEditSKU(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className="from-control" placeholder="Enter Name"
                                value={editname} onChange={(e) => setEditName(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className="from-control" placeholder="Enter Description"
                                value={editdescription} onChange={(e) => setEditDescription(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className="from-control" placeholder="Enter Price"
                                value={editprice} onChange={(e) => setEditPrice(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className="from-control" placeholder="Enter Stock"
                                value={editstock} onChange={(e) => setEditStock(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className="from-control" placeholder="Enter Rating"
                                value={editrating} onChange={(e) => setEditRating(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className="from-control" placeholder="Enter ProductTypeId"
                                value={editproductTypeId} onChange={(e) => setEditProductTypeId(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className="from-control" placeholder="Enter ProductPromotionId"
                                value={editproductPromotionId} onChange={(e) => setEditProductPromotion(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="text" className="from-control" placeholder="Enter Image"
                                value={editimage} onChange={(e) => setEditImage(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <input type="checkbox"
                                checked={editstatus === 1 ? true : false}
                                onChange={(e) => setEditStatus(e)} value={editstatus}
                            />
                            <label>Status</label>
                        </Col>
                        <Col>
                            <input type="checkbox"
                                checked={editproductHot === 1 ? true : false}
                                onChange={(e) => setEditProductHot(e)} value={editproductHot}
                            />
                            <label>ProductHot</label>
                        </Col>
                        <Col>
                            <input type="checkbox"
                                checked={editproductNew === 1 ? true : false}
                                onChange={(e) => setEditProductNew(e)} value={editproductNew}
                            />
                            <label>ProductNew</label>
                        </Col>
                        <Col>
                            <button className="btn btn-primary">Submit</button>
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
export default Productad