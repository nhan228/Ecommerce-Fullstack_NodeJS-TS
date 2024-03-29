import { productControlller } from "../../../controllers/product.controller";
import express from "express";

const Router = express.Router();

Router.delete('/delete-pictures/:id',productControlller.deletePic)
Router.delete('/delete/:id',productControlller.delete)
Router.get('/',productControlller.findMany)
Router.post('/',productControlller.create)
Router.patch('/des/:id',productControlller.updateDes)
Router.patch('/:id',productControlller.update)
export default Router;