import { brandController } from "../../../controllers/brand.controller";
import express from "express";

const Router = express.Router();

Router.get('/', brandController.findMany)
Router.post('/', brandController.create)
Router.patch('/:id', brandController.update)
export default Router;