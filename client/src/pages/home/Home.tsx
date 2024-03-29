import React, { useEffect, useState } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import Product from './components/product'
import { useLocation } from 'react-router-dom'
import Carousel from './components/carousel'
import { Store } from "@/store"
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { productAction } from '@/store/slices/product.slice'

import './home.scss'

export default function Home() {
  const productStore = useSelector((store: Store) => store.productStore)
  const location = useLocation()
  const isHomePage = location.pathname == '/'
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productAction.addData({
      id: Date.now() * Math.random(),
      name: "Iphone 16 pro max",
      price: "100000",
      des: "Mo ta san pham",
      avatar: "https://lh3.googleusercontent.com/6JWskyUenAsPyM4cWvfaUX9EIr5TScGuQY-zpamAVtsz5Bh096R_YfwpViednIEO4qC06y8Dl7blytLpxddzwLitouOdAnSS4g=w230-rw",
      pictures: ["https://lh3.googleusercontent.com/6JWskyUenAsPyM4cWvfaUX9EIr5TScGuQY-zpamAVtsz5Bh096R_YfwpViednIEO4qC06y8Dl7blytLpxddzwLitouOdAnSS4g=w230-rw"]
    }))
  }, [])

  return (
    <div className='home_page'>
      <Header/>
      <div className='home_page_body'>
        {isHomePage && <Carousel />}
        {isHomePage && <Product productStore={productStore} />}
        <div className='body_content'>
          <Outlet />
        </div>
      </div>

      {/* <button className="button-to-top">
        <svg className="svgIcon" viewBox="0 0 384 512">
          <path
            d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
          ></path>
        </svg>
      </button> */}
      
      <Footer/>
    </div>
  )
}
