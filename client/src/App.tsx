import RouteSetup from '@/router'
import api from '@services/apis'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { userAction } from '@slices/user.slice'
import { receiptAction } from '@slices/receipt.slice'
import { productAction } from './store/slices/product.slice'
import { categoryAction } from '@slices/category.slice'
import { brandAction } from '@slices/brand.slice'
import { addressAction } from '@/store/slices/address.slice'

import '../product.json'
import './main.scss'

export default function App() {
  const dispatch = useDispatch()

  // authen
  useEffect(() => {
    if (!localStorage.getItem("token")) return
    try {
      api.authen.decodeToken(localStorage.getItem("token"))
        .then(res => {
          dispatch(userAction.setData(res.data.data))
        })
        .catch(err => {
          console.log(err)
          localStorage.removeItem("token")
          dispatch(userAction.setData(null))
        })
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token")
      dispatch(userAction.setData(null))
    }
  }, [])

  // product
  useEffect(() => {
    try {
      api.product.findMany()
        .then(async (res) => {
          dispatch(productAction.setProduct(res.data.data))
          console.log("products", res.data.data)
        })
        .catch(err => {
          console.log(err);
        })
    } catch (err) {
      console.log(err);
    }
  }, [])

  // category
  useEffect(() => {
    try {
      api.category.findMany()
        .then(res => {
          dispatch(categoryAction.setData(res.data.data))
        })
        .catch(err => {
          console.log(err);
        })
    } catch (err) {
      console.log(err);
    }
  }, [])

  // brand
  useEffect(() => {
    try {
      api.brand.findMany()
        .then(res => {
          dispatch(brandAction.setData(res.data.data))
        })
        .catch(err => {
          console.log(err);
        })
    } catch (err) {
      console.log(err);
    }
  }, [])

  // address
  useEffect(() => {
    try {
      api.address.findMany()
        .then(res => {
          dispatch(addressAction.setData(res.data.data))
        })
        .catch(err => {
          console.log(err);
        })
    } catch (err) {
      console.log(err);
    }
  }, [])

  // receipt
  useEffect(() => {
    if (!localStorage.getItem('token')) return
    try {
      api.receipt.findMany()
        .then(res => {
          let cart = null;
          let receipt = [];
          for (let i in res.data.data) {
            if (res.data.data[i].status == "shopping") {
              cart = res.data.data[i]
            } else {
              receipt.push(res.data.data[i])
            }
          }
          dispatch(receiptAction.setCart(cart))
          dispatch(receiptAction.setReceipt(receipt))
        })
        .catch(err => { })
    } catch (err) { }
  }, [])
  return (
    <RouteSetup />
  )
}
