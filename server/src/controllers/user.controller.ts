import { userModel } from "../models/user.model"
import { Response, Request } from "express"
import { hashService, mailService, jwtService } from '../services'
import ejs from "ejs";
import path from "path";
import useragent from "useragent";
import axios from "axios";
export const userController = {
    findMany: async (req: Request, res: Response) => {
        try {
            let { err, data } = await userModel.findAll()
            if (!err) {
                return res.status(200).json({
                    message: "success",
                    data,
                })
            }
            throw {
                message: "Loi gi do!"
            }
        } catch (err: any) {
            return res.status(500).json({
                message: err.message || "Loi may chu"
            })
        }
    },
    register: async (req: Request, res: Response) => {
        try {
            let ip: string = req.ip ? req.ip : "127.0.0.1"
            const userAgent = useragent.parse(req.headers["user-agent"]);
            const deviceInfo = `${userAgent.device}-${userAgent.os}-${userAgent.family}`;
            let { status, data, message } = await userModel.register({
                ...req.body,
                password: String(await hashService.hashPass(req.body?.password))
            }, ip, deviceInfo)
            if (!status) {
                throw {
                    message: message
                }
            }
            mailService.sendMail(req.body.email, "Email kich hoat tu PHUQUY",
                `<h1>Email kich hoat tu PHUQUY</h1>
                <p>chuc mung ban dang ki thanh cong, vui long nhan vao link phia duoi de dang ki</p>
                <a href="${process.env.HOST}/api/v1/users/confirm-email/${jwtService.createToken(data)}">Kich hoat tai khoan</a>
                `
            )
            return res.status(200).json({
                message,
                data
            })
        } catch (err: any) {
            console.log('check loi:', err);
            return res.status(500).json({ message: err.message || "Loi sever 2" })
        }
    },
    confirmEmail: async (req: Request, res: Response) => {
        try {
            let data = jwtService.decodeToken(req.params.token)
            if (!data) {
                throw {
                    message: "Ma kich hoat da het han roi!"
                }
            }
            let user = await userModel.update(data.id, { emailConfirm: true, updateAt: String(Date.now()) })
            return res.status(200).send(
                await ejs.renderFile(path.join(__dirname, '../views/templates/confirmEmail.ejs'), {
                    link: "http://127.0.0.1:5173"
                }))
        } catch (err: any) {
            console.log('err', err);
            return res.status(500).json({
                message: err.message
                    || "Ma kich hoat het han",
            })

        }
    },
    login: async (req: Request, res: Response) => {
        try {
            let { data, status, message } = await userModel.login(req.body.loginId)

            if (!status || !data) {
                throw {
                    message: "Nguoi dung khong ton tai!"
                }
            }
            if (data) {
                let result = await hashService.verifyPass(data.password, req.body.password)
                console.log('result', result);

                if (!result) {
                    throw {
                        message: "Sai mat khau!"
                    }
                }
                if (!data.status) {
                    throw {
                        message: "Tai khoan cua ban da bi khoa!"
                    }
                }
                if (req.body.loginId.includes('@') && data?.emailConfirm == false) {
                    mailService.sendMail(req.body.email, "Email kich hoat tu PHUQUY",
                        `<h1>Email kich hoat tu PHUQUY</h1>
                <p>chuc mung ban dang ki thanh cong, vui long nhan vao link phia duoi de dang ki</p>
                <a href="${process.env.HOST}/api/v1/users/confirm-email/${jwtService.createToken(data)}">Kich hoat tai khoan</a>
                `
                    )
                    throw {
                        message: "Email cua ban chua xac thuc nen khong the dang nhap bang email, chung toi da gui email xac thuc cho ban!"
                    }
                }
                return res.status(200).json({
                    message: "Ban da dang nhap thanh cong!",
                    token: jwtService.createToken(data, "1d")
                })
            }
        } catch (err: any) {
            console.log('err LOGIN', err);
            return res.status(500).json({
                message: err.message || "Loi he thong dang nhap!"
            })
        }
    },
    decodeToken: async (req: Request, res: Response) => {
        try {
            return res.status(200).json({
                message: "ok!",
                data: req.tokenData
            })
        } catch (err: any) {
            console.log('err', err);

            return res.status(500).json(
                {
                    data: err.data || null
                }
            )
        }
    },

    loginWithGoogle: async (req: Request, res: Response) => {
        try {
            let googleTokenData = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.GOOGLE_FIREBASE_KEY}`,
                {
                    idToken: req.body.googleToken
                })
            if (googleTokenData.data.users[0].email != req.body.user.email) {
                return res.status(500).json({
                    message: "Loi he thong dang nhap!"
                })
            }
            let user = await userModel.find(googleTokenData.data.users[0].email);

            if (!user?.data) {
                let ip: string = req.ip ? req.ip : "127.0.0.1"
                const userAgent = useragent.parse(req.headers["user-agent"]);
                const deviceInfo = `${userAgent.device}-${userAgent.os}-${userAgent.family}`;
                let { status, data, message } = await userModel.register({
                    ...req.body.user,
                    emailConfirm: true,
                    password: String(await hashService.hashPass(req.body?.user?.password))
                }, ip, deviceInfo)
                if (!status) {
                    throw {
                        message: message
                    }
                }
                return res.status(200).json({
                    message: "Đăng nhập thành công!",
                    token: jwtService.createToken(data, "1d")
                })
            } else {
                return res.status(200).json({
                    message: "Đăng nhập thành công!",
                    token: jwtService.createToken(user?.data, "1d")
                })
            }
        } catch (err) {
            console.log(err);

            return res.status(500).json({
                message: err.message || "Loi Server!"
            })

        }
    },
    
    create: async (req: Request, res: Response) => {
        try {
            let password = String(Math.floor(Date.now() * Math.random()))
            let hashPassword = String(await hashService.hashPass(password))
            let { status, data, message } = await userModel.create({ ...req.body, password: hashPassword })
            if (!status) {
                throw {
                    message
                }
            }
            console.log('req.body.email', req.body.email);

            mailService.sendMail(req.body.email, "Cap mat khau lan dau tu PHUQUY",
                `<h1>Cap mat khau lan dau tu PHUQUY</h1>
                <p>Bạn đã đăng kí thành công, đây là mật khẩu được cấp lần đầu, vui lòng không cho bất kỳ ai biết thông tin này!</p>
                <h3>PASSWORD: ${password}</h3>`
            )
            return res.status(200).json({
                data,
                message
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message || "LOI SERVER"
            })
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            let id = req.params.id;
            
            if (req.tokenData.role == "admin" && req.body.role == "admin" || req.tokenData.role == "admin" && req.body.role == "master" || req.tokenData.role == "member") {
                throw {
                    message: "Bạn không đủ quyền!"
                }
            }
            if (req.tokenData.role == "master" && req.tokenData.id != id) {
                throw {
                    message: "Master không thể update Master khác!"
                }
            }
            let { status, data, message } = await userModel.update(Number(id), req.body)
            if (!status) {
                throw {
                    message
                }
            }
            return res.status(200).json({
                data,
                message
            })
        } catch (err) {
            return res.status(500).json({
                message: err.message || "LOI SERVER"
            })
        }
    }
}
