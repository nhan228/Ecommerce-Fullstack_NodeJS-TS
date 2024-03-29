import React, { useState } from "react";
import Carousel from 'better-react-carousel'
import { convertToVND, randomId, createBuyAnimation } from '@mieuteacher/meomeojs'
import { useNavigate } from "react-router-dom"

import "./product.scss"

export default function Product({ productStore }) {
    const navigate = useNavigate();
    return (
        <>

            {/* LAPTOP */}
            <div className='container'>
                <div className='product'>
                    <div className='product_info'>
                        <div className="top">
                            <h2>LAPTOP</h2>
                            <h5>Xem tất cả</h5>
                        </div>
                        <div className="bottom">
                            <Carousel cols={5} rows={1} gap={20} loop>
                                {productStore.data?.map(i => {
                                    if (i.categoryId == 1 && i?.status) {
                                        return (<Carousel.Item>
                                            <div className="container_item" onClick={() => {
                                                navigate(`/product-info/${i.id}`)
                                            }}>
                                                <div className="img_container">
                                                    <img width="100%" src={i.avatar} />
                                                </div>
                                                <div className="content_container">
                                                    <p>Laptop</p>
                                                    <h6>{i.name}</h6>
                                                    <h5>{convertToVND(i.price)}</h5>
                                                </div>
                                            </div>
                                        </Carousel.Item>)
                                    }
                                })}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>

            {/* PC */}
            <div className='container'>
                <div className='product'>
                    <div className='product_info'>
                        <div className="top">
                            <h2>PC</h2>
                            <h5>Xem tất cả </h5>
                        </div>
                        <div className="bottom">
                            <Carousel cols={5} rows={1} gap={20} loop>
                                {productStore.data?.map(i => {
                                    if (i.categoryId == 2 && i?.status) {
                                        return (<Carousel.Item>
                                            <div className="container_item" onClick={() => {
                                                navigate(`/product-info/${i.id}`)
                                            }}>
                                                <div className="img_container">
                                                    <img width="100%" src={i.avatar} />
                                                </div>
                                                <div className="content_container">
                                                    <p>PC</p>
                                                    <h6>{i.name}</h6>
                                                    <h5>{convertToVND(i.price)}</h5>
                                                </div>
                                            </div>
                                        </Carousel.Item>)
                                    }
                                })}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
            <div className="advertising">
                <div className="advertising_content">
                    <div className="left">
                        <img src="https://lh3.googleusercontent.com/NPKiOOhPD1gK1EMeggU-fv7qJzEjb6eCwBXA7gur-4AxKAb7TDPcJ95aKKow1Jcs5wp6hUIiSXTPArfPOd79lZE19fBVvow=w616-rw" />
                    </div>
                    <div className="right">
                        <img src="https://lh3.googleusercontent.com/p6yyd_uVRxEXYOVj1J8roBPV3Cso9BUXYP1gZDJ1nXyg2HJK3iNxV_Bmo4-ZLbUsney2CtCvUt-9WhTo5M58nuaAoX2wtfzW=w616-rw" alt="" />
                    </div>
                </div>
            </div>

            {/* PHONE */}
            <div className='container'>
                <div className='product'>
                    <div className='product_info'>
                        <div className="top">
                            <h2>ĐIỆN THOẠI</h2>
                            <h5>Xem tất cả </h5>
                        </div>
                        <div className="bottom">
                            <Carousel cols={5} rows={1} gap={20} loop>
                                {productStore.data?.map(i => {
                                    if (i.categoryId == 3 && i?.status) {
                                        return (<Carousel.Item>
                                            <div className="container_item" onClick={() => {
                                                navigate(`/product-info/${i.id}`)
                                            }}>
                                                <div className="img_container">
                                                    <img width="100%" src={i.avatar} />
                                                </div>
                                                <div className="content_container">
                                                    <p>Phone</p>
                                                    <h6>{i.name}</h6>
                                                    <h5>{convertToVND(i.price)}</h5>
                                                </div>
                                            </div>
                                        </Carousel.Item>)
                                    }
                                })}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>

            {/* SPEAKER */}
            <div className='container'>
                <div className='product'>
                    <div className='product_info'>
                        <div className="top">
                            <h2>THIẾT BỊ ÂM THANH</h2>
                            <h5>Xem tất cả </h5>
                        </div>
                        <div className="bottom">
                            <Carousel cols={5} rows={1} gap={20} loop>
                                {productStore.data?.map(i => {
                                    if (i.categoryId == 4 && i?.status) {
                                        return (<Carousel.Item>
                                            <div className="container_item" onClick={() => {
                                                navigate(`/product-info/${i.id}`)
                                            }}>
                                                <div className="img_container">
                                                    <img width="100%" src={i.avatar} />
                                                </div>
                                                <div className="content_container">
                                                    <p>Speaker</p>
                                                    <h6>{i.name}</h6>
                                                    <h5>{convertToVND(i.price)}</h5>
                                                </div>
                                            </div>
                                        </Carousel.Item>)
                                    }
                                })}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
            <div className="advertising">
                <div className="advertising_content">
                    <div className="left">
                        <img src="https://lh3.googleusercontent.com/0XMyTTi61mF36Dui7tOqZtKJzrjXpn5eco8OwVpijFExkTEJKyRpYmP9H3fbEDhi3sOZ5YA6BecKgWbTRTkbG8dPD88u5SMVeQ=w616-rw" />
                    </div>

                </div>
            </div>
            {/* ASSO */}
            <div className='container'>
                <div className='product'>
                    <div className='product_info'>
                        <div className="top">
                            <h2>PHỤ KIỆN</h2>
                            <h5>Xem tất cả </h5>
                        </div>
                        <div className="bottom">
                            <Carousel cols={5} rows={1} gap={20} loop>
                                {productStore.data?.map(i => {
                                    if (i.categoryId == 5 && i?.status) {
                                        return (<Carousel.Item>
                                            <div className="container_item" onClick={() => {
                                                navigate(`/product-info/${i.id}`)
                                            }} style={{ cursor: 'pointer' }}>
                                                <div className="img_container">
                                                    <img width="100%" src={i.avatar} />
                                                </div>
                                                <div className="content_container">
                                                    <p>Accessory</p>
                                                    <h6>{i.name}</h6>
                                                    <h5>{convertToVND(i.price)}</h5>
                                                </div>
                                            </div>
                                        </Carousel.Item>)
                                    }
                                })}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
