import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Col, Row, Card } from 'antd'
const { Meta } = Card
import { useSelector, useDispatch } from 'react-redux'
import { convertToVND, randomId, createBuyAnimation } from '@mieuteacher/meomeojs'
import { Store } from "@/store"

import './category.scss' 

export default function Category() {
    const dispatch = useDispatch()
    const { categoryName, brandName } = useParams()
    const navigate = useNavigate()
    const productStore = useSelector((store: Store) => store.productStore)
    useEffect(() => {

    }, [categoryName])
    return (
        <div className='category_page'>
            {/* <div className='tool_box'>
                <img src='https://lh3.googleusercontent.com/WZeof0n-INyjrokIKxIxc87nM80FJm-GPfq2ql_z2y5B_G6vYrKWO3brVx40bSJ-g0BMFh78qj93OBucFRtoV0rSxyEiBAHg=w1920-rw'></img>
            </div> */}
            <div className='title'>
                <div>
                    <p>{categoryName}</p>
                </div>
            </div>
            <div className='product_list'>
                <Row gutter={16}>
                    {
                        productStore.data?.map(product => {
                            if (product?.category?.title == categoryName && product?.status && (product?.brand?.title == brandName || brandName == 'all')) {
                                return (
                                    <Col key={randomId()} className="gutter-row" xs={24} sm={12} md={8} lg={6}>
                                        <Card
                                            className='productCart'
                                            hoverable
                                            style={{
                                                width: "250px",
                                                minHeight: "200px",
                                                marginBottom: "10px"
                                            }}
                                            cover={<img alt="example" src={product.avatar} />}
                                        >
                                            <p>{categoryName}</p>
                                            <Meta title={product.name} description={convertToVND(product.price)} />
                                            <div style={{ display: 'flex', justifyContent: "flex-end" }}>
                                                <button onClick={(e) => {
                                                    navigate(`/product-info/${product.id}`)

                                                }} className='my-button'>Mua</button>
                                            </div>
                                        </Card>
                                    </Col>)
                            }

                        })
                    }
                </Row>
            </div>
        </div>
    )
}
