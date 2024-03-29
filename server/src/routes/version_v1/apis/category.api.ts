import { categoryController } from "../../../controllers/category.controller"
import express from "express"

const Router = express.Router();

Router.get('/', categoryController.findMany)
Router.post('/', categoryController.create)
Router.patch('/:id', categoryController.update)

export default Router;