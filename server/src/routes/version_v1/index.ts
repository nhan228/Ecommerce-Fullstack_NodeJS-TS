
import express from "express";
import usersApi from "./apis/user.api";
import productApi from './apis/product.api'
import categoryApi from './apis/category.api'
import receiptApi from './apis/receipt.api'
import brandApi from './apis/brand.api'
import addressApi from "./apis/address.api";

const Router = express.Router()

Router.use('/users', usersApi)
Router.use('/products', productApi)
Router.use('/categories', categoryApi)
Router.use('/receipts', receiptApi)
Router.use('/brands', brandApi)
Router.use('/address', addressApi)

export default Router