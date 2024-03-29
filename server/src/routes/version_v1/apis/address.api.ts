import { addressController } from './../../../controllers/address.controller';
import express from "express";

const Router = express.Router();

Router.get('/', addressController.findMany)
Router.post('/', addressController.create)
Router.patch('/:id', addressController.update)
export default Router;