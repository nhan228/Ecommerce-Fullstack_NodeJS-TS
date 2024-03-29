import { userController } from "../../../controllers/user.controller";
import express from "express";
import { userMiddleWares } from "../../../middlewares";
const Router = express.Router();


Router.post("/login/login-with-google", userController.loginWithGoogle)
Router.post("/login", userController.login)
Router.post("/create", userMiddleWares.tokenValidate, userController.create)
Router.patch("/update/:id", userMiddleWares.tokenValidate, userController.update)
Router.get('/confirm-email/:token', userController.confirmEmail)
Router.post('/token-decode/:token', userMiddleWares.tokenValidate, userController.decodeToken)
Router.get("/", userController.findMany)
Router.post('/', userController.register)

export default Router;