import React, { useState, useEffect } from 'react'
import { Table, Modal, Button } from 'react-bootstrap';
import { Modal as AntdModal } from 'antd'
import api from '@services/apis'
import { randomId, convertToVND } from '@mieuteacher/meomeojs';
import { useSelector, useDispatch } from 'react-redux';
import UserCreateForm from './components/UserCreateForm';
import { userAction } from '@slices/user.slice';
import { receiptAction } from '@/store/slices/receipt.slice';
import UserEditForm from './components/UserEditForm';

export default function List() {
    const dispatch = useDispatch()
    const userStore = useSelector(store => store.userStore);
    const [showAddress, setShowAddress] = useState(false);
    const [updateData, setupdateData] = useState({});
    const [showIp, setShowIp] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [display, setDisplay] = useState(false)
    const [currentRecreipt, setCurrentRecreipt] = useState(null)
    const [show, setShow] = useState(false);
    const [showShipping, setShowShipping] = useState(false);
    const [showDone, setShowDone] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showRecycle, setShowRecycle] = useState(false);
    const [showAccept, setShowAccept] = useState(false);
    const [getUser, setGetUser] = useState(false);
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Ho_Chi_Minh'
    };

    console.log('data',updateData);
    
    const handleConfirm = async () => {
        try {
            let result = await api.authen.update(updateData.id, { role: updateData.role, status: false });
            if (result.status == 200) {
                dispatch(userAction.update(result.data.data));
            }
        } catch (err) {
            console.log('err', err);
            window.alert(`${err.response.data.message}`)
        }
        setShow(false);
    };
    console.log('data2',updateData);

    const handleCancel = () => {
        setShow(false);
    };

    let users = []
    
    useEffect(() => {
        try {
            api.authen.findMany()
                .then(async (res) => {
                    dispatch(userAction.setList(res.data.data))
                })
                .catch(err => {
                    console.log(err);
                })
        } catch (err) {
            console.log(err);
        }
        if (userStore.data.role == "master") {
            users = userStore.list
        } else {
            users = userStore.list.filter(item => item.role != "master")
        }
        console.log("da vao effect");
    }, [getUser])

    if (userStore.data.role == "master") {
        users = userStore.list
    } else {
        users = userStore.list.filter(item => item.role != "master")
    }
    console.log('thử ',users);

    return (
        <>
            {
                userStore.addModal && <UserCreateForm dispatch={dispatch} />
            }
            {
                showEdit && <UserEditForm showEdit={showEdit} setShowEdit={setShowEdit} updateData={updateData} />
            }
            <h4>User List</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Create At</th>
                        <th>Update At</th>
                        <th>Role</th>
                        <th>Address</th>
                        <th>Ip list</th>
                        <th>Receipts</th>
                        <th>Tools</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userStore.list.map((item, index) => {
                            if (item.status) {
                                return (
                                    <tr key={Date.now() * Math.random()}>
                                        <td>{index + 1}</td>
                                        <td >{item.userName}</td>
                                        <td >{item.email}</td>
                                        <td >{item.createAt ? (new Date(Number(item.createAt))).toLocaleString('en-GB', options) : "none"}</td>
                                        <td >{item.updateAt ? (new Date(Number(item.updateAt))).toLocaleString('en-GB', options) : "none"}</td>
                                        <td >{item.role}</td>
                                        <td ><button
                                            onClick={() => {
                                                setShowAddress(!showAddress)
                                                setupdateData(item)
                                            }}
                                            className="btn btn-primary">Show</button></td>
                                        <td ><button
                                            onClick={() => {
                                                setShowIp(!showIp)
                                                setupdateData(item)
                                            }}
                                            className="btn btn-primary">View</button></td>
                                        <td ><button
                                            onClick={() => {
                                                setShowReceipt(!showReceipt)
                                                setupdateData(item)
                                            }}
                                            className="btn btn-primary">View</button></td>

                                        <td>
                                            <button
                                                onClick={() => {
                                                    setShowEdit(!showEdit)
                                                    setupdateData(item)
                                                }}
                                                className="btn btn-primary" style={{ marginRight: 5 }}>Edit</button>
                                            {
                                                !(item.role == "master") && <button
                                                    onClick={() => {
                                                        setShow(true)
                                                        setupdateData(item)
                                                    }}
                                                    className="btn btn-danger"
                                                >Block</button>
                                            }
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
                <Modal show={show} onHide={handleCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title><i style={{ color: '#ffce08', fill: "#000" }} className="fa-solid fa-triangle-exclamation"></i> Cảnh báo!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Bạn có thật sự muốn chặn người này?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCancel} style={{ color: '#000', backgroundColor: '#ccc', outline: 'none', border: 'none', fontWeight: '600' }}>Hủy</Button>
                        <Button variant="primary" onClick={handleConfirm} style={{ backgroundColor: 'red', outline: 'none', border: 'none', fontWeight: '600' }}>Chặn</Button>
                    </Modal.Footer>
                </Modal>
            </Table >
            {
                showAddress && <div className='table_container'>
                    <div className='table_content'>
                        <div className='btn_box'>
                            <span>Địa chỉ giao hàng</span>
                            <button onClick={() => {
                                setShowAddress(!showAddress)
                            }} type='button' className='btn btn-danger'>X</button>
                        </div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Address</th>
                                    <th>Provine ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    updateData.address?.map((item, index) => {
                                        return (
                                            <tr key={Date.now() * Math.random()}>
                                                <td>{index + 1}</td>
                                                <td >{item.title}</td>
                                                <td >{item.provineId}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table >
                    </div>
                </div>
            }

            {
                showIp && <div className='table_container'>
                    <div className='table_content'>
                        <div className='btn_box'>
                            <span>IP list</span>
                            <button onClick={() => {
                                setShowIp(!showIp)
                            }} type='button' className='btn btn-danger'>X</button>
                        </div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>IP</th>
                                    <th>Device Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    updateData.user_ip_list?.map((item: any, index: number) => {
                                        console.log('item',item)
                                        return (
                                            <tr key={Date.now() * Math.random()}>
                                                <td>{index + 1}</td>
                                                <td >{item.ip}</td>
                                                <td >{item.deviceName}</td>
                                                <td style={{ color: item.status ? "green" : "red" }}>{item.status ? "Active" : "Block"}</td>
                                            </tr>
                                        )

                                    })
                                }
                            </tbody>
                        </Table >
                    </div>
                </div>
            }

            {
                showReceipt && <div className='table_container '>
                    <div className='table_content table_receipt'>
                        <div className='btn_box'>
                            <h4>Receipts List</h4>
                            <button onClick={() => {
                                setShowReceipt(!showReceipt)
                            }} type='button' className='btn btn-danger'>X</button>
                        </div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Pay Status</th>
                                    <th>Pay At</th>
                                    <th>Pay Method</th>
                                    <th>Status</th>
                                    <th>Pending At</th>
                                    <th>Accept At</th>
                                    <th>Shipping At</th>
                                    <th>Done At</th>
                                    <th>Total Price</th>
                                    <th>Tools</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    updateData.receipts?.map((item, index) => {
                                        if (item.status != "delete") {
                                            return (
                                                <tr key={Date.now() * Math.random()}>
                                                    <td>{item.id || "none"}</td>

                                                    <td>{item.paid ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                                                    <td>{item.paidAt ? (new Date(Number(item.paidAt))).toLocaleString('en-GB', options) : "none"}</td>
                                                    <td>{item.payMode || "none"}</td>
                                                    <td>{item.status || "none"}</td>
                                                    <td>{item.pending ? (new Date(Number(item.pending))).toLocaleString('en-GB', options) : "none"}</td>
                                                    <td>{item.acceptAt ? (new Date(Number(item.acceptAt))).toLocaleString('en-GB', options) : "none"}</td>
                                                    <td>{item.shippingAt ? (new Date(Number(item.shippingAt))).toLocaleString('en-GB', options) : "none"}</td>
                                                    <td>{item.doneAt ? (new Date(Number(item.doneAt))).toLocaleString('en-GB', options) : "none"}</td>
                                                    <td>{convertToVND(item.total) || "none"}</td>
                                                    <td>
                                                        <button style={{ marginRight: "10px" }}
                                                            onClick={() => {
                                                                setDisplay(true);
                                                                setCurrentRecreipt(item)
                                                            }}
                                                            className="btn btn-primary">View
                                                        </button>

                                                        {
                                                            item.status == "pending" &&
                                                            <button style={{ marginRight: "10px" }}
                                                                onClick={() => {
                                                                    setCurrentRecreipt(item)
                                                                    setShowAccept(!showAccept)
                                                                }}
                                                                className="btn btn-success">Accept
                                                            </button>
                                                        }

                                                        {
                                                            item.status == "accepted" &&
                                                            <button style={{ marginRight: "10px" }}
                                                                onClick={() => {
                                                                    setCurrentRecreipt(item)
                                                                    setShowShipping(!showAccept)
                                                                }}
                                                                className="btn btn-success">Update
                                                            </button>
                                                        }

                                                        {
                                                            item.status == "shipping" &&
                                                            <button style={{ marginRight: "10px" }}
                                                                onClick={() => {
                                                                    setCurrentRecreipt(item)
                                                                    setShowDone(!showAccept)
                                                                }}
                                                                className="btn btn-success">Done
                                                            </button>
                                                        }

                                                        {
                                                            (item.status == 'pending' || item.status == 'done') &&
                                                            <button
                                                                onClick={() => {
                                                                    setCurrentRecreipt(item)
                                                                    setShowDelete(!showDelete)
                                                                }}
                                                                className="btn btn-danger">Delete
                                                            </button>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        }


                                    })
                                }
                            </tbody>
                        </Table >
                        <h5 style={{ color: "#fff", backgroundColor: 'red', padding: '10px', textAlign: 'center' }}>Deleted Receipts</h5>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Total Price</th>
                                    <th>Pay Status</th>
                                    <th>Pay At</th>
                                    <th>Pay Method</th>
                                    <th>Status</th>
                                    <th>Pending At</th>
                                    <th>Accept At</th>
                                    <th>Shipping At</th>
                                    <th>Delete At</th>
                                    <th>Tools</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    updateData.receipts?.map((item, index) => {
                                        if (item.status == "delete") {
                                            return (
                                                <tr key={Date.now() * Math.random()}>
                                                    <td>{item.id || "none"}</td>
                                                    <td>{convertToVND(item.total) || "none"}</td>
                                                    <td>{item.paid ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                                                    <td>{item.paidAt ? (new Date(Number(item.paidAt))).toLocaleString('en-GB', options) : "none"}</td>
                                                    <td>{item.payMode || "none"}</td>
                                                    <td style={{ color: 'red', fontWeight: '600', textTransform: 'uppercase' }}>{item.status + 'd' || "none"}</td>
                                                    <td>{item.pending ? (new Date(Number(item.pending))).toLocaleString('en-GB', options) : "none"}</td>
                                                    <td>{item.acceptAt ? (new Date(Number(item.acceptAt))).toLocaleString('en-GB', options) : "none"}</td>
                                                    <td>{item.shippingAt ? (new Date(Number(item.shippingAt))).toLocaleString('en-GB', options) : "none"}</td>
                                                    <td>{item.updateAt ? (new Date(Number(item.updateAt))).toLocaleString('en-GB', options) : "none"}</td>
                                                    <td>
                                                        <button onClick={() => {
                                                            setDisplay(true);
                                                            setCurrentRecreipt(item)
                                                        }}
                                                            className="btn btn-primary" style={{ fontWeight: '600' }}><i className="fa-regular fa-eye"></i> View
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                setCurrentRecreipt(item)
                                                                setShowRecycle(!showRecycle)
                                                            }}
                                                            className="btn btn-warning" style={{ fontWeight: '600', marginLeft: '10px' }}><i className="fa-solid fa-rotate-left"></i> Recycle
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }


                                    })
                                }
                            </tbody>
                        </Table >
                    </div>
                    {/* display */}
                    <Modal
                        show={display}
                        onHide={() => setDisplay(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Thông tin hóa đơn</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='item_container_title'>
                                <p>Hình ảnh</p>
                                <p>Tên sản phẩm</p>
                                <p>Giá tiền</p>
                                <p>Số lượng</p>
                            </div>
                            {
                                currentRecreipt?.detail?.map(item => {

                                    return (
                                        <div className='item_container'>
                                            <img src={item?.product.avatar} />
                                            <p>{item.product.name}</p>
                                            <p>{convertToVND(item.product.price)}</p>
                                            <p>{item.quantity}</p>
                                        </div>
                                    )

                                }
                                )
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => setDisplay(false)}>OK</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Accept */}
                    <Modal
                        show={showAccept}
                        onHide={() => setShowAccept(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Duyệt đơn hàng này?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='item_container_title'>
                                <p>Hình ảnh</p>
                                <p>Tên sản phẩm</p>
                                <p>Giá tiền</p>
                                <p>Số lượng</p>
                            </div>
                            {
                                currentRecreipt?.detail?.map(item => {
                                    return (
                                        <div className='item_container'>
                                            <img src={item?.product.avatar} />
                                            <p>{item.product.name}</p>
                                            <p>{convertToVND(item.product.price)}</p>
                                            <p>{item.quantity}</p>
                                        </div>
                                    )

                                }
                                )
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={async () => {
                                try {
                                    let result = await api.receipt.updateReceipt(currentRecreipt.id, {
                                        acceptAt: String(Date.now()),
                                        status: "accepted"
                                    })

                                    if (result.status == 200) {
                                        dispatch(receiptAction.update(result.data.data))
                                        let newReceipt = updateData.receipts.map(item => {
                                            if (item.id == result.data.data.id) {
                                                return result.data.data
                                            } else {
                                                return item
                                            }
                                        })
                                        setupdateData({ ...updateData, receipts: newReceipt })
                                        setGetUser(!getUser)
                                        AntdModal.success({
                                            title: 'Thông báo',
                                            content: 'Đơn hàng này đã được chấp nhận!',
                                            onOk: () => setShowAccept(false)
                                        })
                                    }
                                } catch (err) {
                                    console.log('err', err);
                                    window.alert("Lỗi he thong, vui long thu lai sau!")
                                }
                                setShowDelete(false)
                            }}>OK</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Shipping */}
                    <Modal
                        show={showShipping}
                        onHide={() => setShowShipping(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Cập nhật trạng thái Shipping cho đơn hàng này?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='item_container_title'>
                                <p>Hình ảnh</p>
                                <p>Tên sản phẩm</p>
                                <p>Giá tiền</p>
                                <p>Số lượng</p>
                            </div>
                            {
                                currentRecreipt?.detail?.map(item => {
                                    return (
                                        <div className='item_container'>
                                            <img src={item?.product.avatar} />
                                            <p>{item.product.name}</p>
                                            <p>{convertToVND(item.product.price)}</p>
                                            <p>{item.quantity}</p>
                                        </div>
                                    )
                                }
                                )
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={async () => {
                                try {
                                    let result = await api.receipt.updateReceipt(currentRecreipt.id, {
                                        shippingAt: String(Date.now()),
                                        status: "shipping"
                                    })

                                    if (result.status == 200) {
                                        dispatch(receiptAction.update(result.data.data))
                                        let newReceipt = updateData.receipts.map(item => {
                                            if (item.id == result.data.data.id) {
                                                return result.data.data
                                            } else {
                                                return item
                                            }
                                        })
                                        setupdateData({ ...updateData, receipts: newReceipt })
                                        setGetUser(!getUser)
                                        AntdModal.success({
                                            title: 'Thông báo',
                                            content: 'Đơn hàng này đang được vận chuyển!',
                                            onOk: () => setShowAccept(false)
                                        })
                                    }
                                } catch (err) {
                                    console.log('err', err);
                                    window.alert("Lỗi he thong, vui long thu lai sau!")
                                }
                                setShowShipping(false)
                            }}>OK</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Done */}
                    <Modal
                        show={showDone}
                        onHide={() => setShowDone(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Hoàn thành đơn hàng này?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='item_container_title'>
                                <p>Hình ảnh</p>
                                <p>Tên sản phẩm</p>
                                <p>Giá tiền</p>
                                <p>Số lượng</p>
                            </div>
                            {
                                currentRecreipt?.detail?.map(item => {
                                    return (
                                        <div className='item_container'>
                                            <img src={item?.product.avatar} />
                                            <p>{item.product.name}</p>
                                            <p>{convertToVND(item.product.price)}</p>
                                            <p>{item.quantity}</p>
                                        </div>
                                    )
                                }
                                )
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={async () => {
                                try {
                                    let result = await api.receipt.updateReceipt(currentRecreipt.id, {
                                        paid: true,
                                        paidAt: String(Date.now()),
                                        status: "done",
                                        doneAt: String(Date.now())
                                    })

                                    if (result.status == 200) {
                                        dispatch(receiptAction.update(result.data.data))
                                        let newReceipt = updateData.receipts.map(item => {
                                            if (item.id == result.data.data.id) {
                                                return result.data.data
                                            } else {
                                                return item
                                            }
                                        })
                                        setupdateData({ ...updateData, receipts: newReceipt })
                                        setGetUser(!getUser)
                                        AntdModal.success({
                                            title: 'Thông báo',
                                            content: 'Đơn hàng này đang được vận chuyển!',
                                            onOk: () => setShowDone(false)
                                        })
                                    }
                                } catch (err) {
                                    console.log('err', err);
                                    window.alert("Lỗi he thong, vui long thu lai sau!")
                                }
                                setShowDelete(false)
                            }}>OK</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* delete */}
                    <Modal
                        show={showDelete}
                        onHide={() => setShowDelete(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Bạn có chắc muốn hủy đơn hàng này không?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='item_container_title'>
                                <p>Hình ảnh</p>
                                <p>Tên sản phẩm</p>
                                <p>Giá tiền</p>
                                <p>Số lượng</p>
                            </div>
                            {
                                currentRecreipt?.detail?.map(item => {

                                    return (
                                        <div className='item_container'>
                                            <img src={item?.product.avatar} />
                                            <p>{item.product.name}</p>
                                            <p>{convertToVND(item.product.price)}</p>
                                            <p>{item.quantity}</p>
                                        </div>
                                    )

                                }
                                )
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={async () => {
                                try {
                                    let result = await api.receipt.updateReceipt(currentRecreipt.id, { status: "delete" })
                                    if (result.status == 200) {
                                        dispatch(receiptAction.update(result.data.data))
                                        let newReceipt = updateData.receipts.map(item => {
                                            if (item.id == result.data.data.id) {
                                                return result.data.data
                                            } else {
                                                return item
                                            }
                                        })
                                        setupdateData({ ...updateData, receipts: newReceipt })
                                        setGetUser(!getUser)
                                        AntdModal.success({
                                            title: 'Thông báo',
                                            content: 'Hủy đơn hàng thành công!'
                                        })
                                    }
                                } catch (err) {
                                    console.log('err', err);
                                    window.alert("Lỗi he thong, vui long thu lai sau!")
                                }
                                setShowDelete(false)
                            }}>OK</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* recycle */}
                    <Modal
                        show={showRecycle}
                        onHide={() => setShowRecycle(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Bạn có chắc muốn hoàn lại đơn hàng này không?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className='item_container_title'>
                                <p>Hình ảnh</p>
                                <p>Tên sản phẩm</p>
                                <p>Giá tiền</p>
                                <p>Số lượng</p>
                            </div>
                            {
                                currentRecreipt?.detail?.map(item => {

                                    return (
                                        <div className='item_container'>
                                            <img src={item?.product.avatar} />
                                            <p>{item.product.name}</p>
                                            <p>{convertToVND(item.product.price)}</p>
                                            <p>{item.quantity}</p>
                                        </div>
                                    )

                                }
                                )
                            }
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={async () => {
                                try {
                                    let result = await api.receipt.updateReceipt(currentRecreipt.id, { status: "pending" })
                                    if (result.status == 200) {
                                        dispatch(receiptAction.update(result.data.data))
                                        let newReceipt = updateData.receipts.map(item => {
                                            if (item.id == result.data.data.id) {
                                                return result.data.data
                                            } else {
                                                return item
                                            }
                                        })
                                        setupdateData({ ...updateData, receipts: newReceipt })
                                        setGetUser(!getUser)
                                        AntdModal.success({
                                            title: 'Thông báo',
                                            content: 'Hoàn đơn hàng thành công!',
                                            onOk: () => setShowRecycle(false)
                                        })
                                    }
                                } catch (err) {
                                    console.log('err', err);
                                    window.alert("Lỗi he thong, vui long thu lai sau!")
                                }
                                setShowDelete(false)
                            }}>OK</Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            }
        </>
    )
}