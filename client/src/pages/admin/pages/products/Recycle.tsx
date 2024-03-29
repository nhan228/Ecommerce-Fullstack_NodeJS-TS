import React, { useState } from 'react'
import { Table } from 'react-bootstrap';
import { Modal } from 'antd'
import api from '@services/apis'
import { randomId, convertToVND } from '@mieuteacher/meomeojs';
import { useSelector, useDispatch } from 'react-redux';
import DescribeShow from './components/DescribeShow';
import DetailShow from './components/DetailShow';
import ProductEdit from './components/ProductEdit';
import { productAction } from '@slices/product.slice';

export default function Recycle() {
    const dispatch = useDispatch()
    const productStore = useSelector(store => store.productStore);
    const [showDes, setShowDes] = useState(false);
    const [updateData, setupdateData] = useState({});
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    return (
        <>
            {
                showDes && <DescribeShow showDes={showDes} setShowDes={setShowDes} updateData={updateData} setupdateData={setupdateData} />
            }
            {
                showDetail && <DetailShow showDetail={showDetail} setShowDetail={setShowDetail} updateData={updateData} setupdateData={setupdateData} />
            }
            {
                showEdit && <ProductEdit showEdit={showEdit} setShowEdit={setShowEdit} updateData={updateData} setupdateData={setupdateData} />
            }
            <h4>Product Blocked List</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Des</th>
                        <th>Detail</th>
                        <th>Tools</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productStore.data?.map((product, index) => {
                            if (!product.status) {
                                return (
                                    <tr key={randomId()}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img src={product.avatar} style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                        </td>
                                        <td >{product.name}</td>
                                        <td >{product.category.title}</td>
                                        <td >{product.brand.title}</td>
                                        <td>{convertToVND(product.price)}</td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    setShowDes(!showDes);
                                                    setupdateData({ id: product.id, des: product.des })
                                                }}
                                                className='btn btn-primary'>Edit</button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    setShowDetail(!showDetail);
                                                    setupdateData({ id: product.id, category: product.category.title, detail: JSON.parse(product.detail) })
                                                }}
                                                className='btn btn-primary'>Edit</button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => {
                                                    setShowEdit(!showEdit);
                                                    setupdateData({ product })
                                                }}
                                                className='btn btn-primary' style={{ marginRight: 5 }}>Edit</button>
                                            <button
                                                onClick={() => {
                                                    Modal.warning({
                                                        title: "Warning",
                                                        content: `Are you sure you want to unblock this product?`,
                                                        onOk: async () => {
                                                            try {
                                                                let result = await api.product.updateDes(product.id, { status: true })
                                                                if (result.status == 200) {
                                                                    dispatch(productAction.update(result.data.data))
                                                                }
                                                            } catch (err) {
                                                                console.log('err', err);
                                                            }
                                                        },
                                                        onCancel: () => { }

                                                    })
                                                }}
                                                className="btn btn-success"
                                            >Unblock</button>
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </Table >
        </>
    )
}