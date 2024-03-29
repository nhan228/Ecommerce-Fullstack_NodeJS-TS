import express from 'express';
import { receiptController } from '../../../controllers/receipt.controller';
import { userMiddleWares } from "../../../middlewares";
const Route = express()

Route.patch('/:receiptId', userMiddleWares.tokenValidate, receiptController.updateReceipt)
Route.post('/pay/zalo', userMiddleWares.tokenValidate, receiptController.payZalo)
Route.post('/pay/zalo-check/:zaloReceiptId', userMiddleWares.tokenValidate, receiptController.payZaloCheck)
Route.patch('/pay/:receiptId', userMiddleWares.tokenValidate, receiptController.pay)
Route.delete('/:id', userMiddleWares.tokenValidate, receiptController.delete)
Route.post('/add-to-cart', userMiddleWares.tokenValidate, receiptController.addToCart)
Route.get('/', userMiddleWares.tokenValidate, receiptController.findMany)
Route.patch('/', userMiddleWares.tokenValidate, receiptController.update)
export default Route; 