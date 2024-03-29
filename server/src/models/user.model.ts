import { readFileSync } from "fs";
import { jwtService } from "../services";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const userModel = {
    findAll: async () => {
        try {
            let users = await prisma.users.findMany({
                include: {
                    user_ip_list: true,
                    address: true,
                    receipts: {
                        include: {
                            detail: {
                                include: {
                                    product: true
                                }
                            }
                        }
                    }
                }
            })
            return {
                err: null,
                data: users
            }
        } catch (err) {
            console.log('err', err);
            return {
                err,
                data: null
            }
        }

    },

    register: async (newUser: any, ip: string, device: string) => {
        try {
            let user = await prisma.users.create({
                data: {
                    ...newUser,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                    avatar: newUser.avatar ? newUser.avatar : "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
                    user_ip_list: {
                        create: [
                            {
                                ip: ip,
                                createAt: String(Date.now()),
                                deviceName: device
                            }
                        ]
                    }
                }
            })
            return {
                message: "success",
                data: user,
                status: true
            }
        } catch (err: any) {
            let message: string = "Loi he thong 1"
            if (err?.meta?.target == "email") {
                message = "Email đã tồn tại"
            }
            if (err?.meta?.target == "users_userName_key") {
                message = "Tên đăng nhập đã tồn tại"
            }
            console.log('loi he thong', message);
            console.log('err', err);
            return {
                message,
                data: null,
                status: false
            }
        }
    },

    update: async ( userId: number,updateData: any) => {
        try {
            const user = await prisma.users.update({
                where: {
                    id: Number(userId)
                },
                data: {
                    ...updateData
                },
                include: {
                    address: true,
                    user_ip_list: true,
                    receipts: {
                        include: {
                            detail: {
                                include: {
                                    product: true
                                }
                            }
                        }
                    }
                }
            })
            return {
                status: true,
                data: user,
                message: "update Ok"
            }
        } catch (err: any) {
            console.log('err',err);
            return {
                status: false,
                data: null,
                message: "update falt"
            }
        }
    },

    login: async (loginId: string) => {
        try {
            let user = await prisma.users.findFirst({
                where: {
                    OR: [{ email: loginId }, { userName: loginId }],
                },
                include: {
                    user_ip_list: true,
                },
            } as any)
            return {
                status: true,
                data: user,
                message: "login ok"
            }
        } catch (err: any) {
            console.log('err', err);
            return {
                status: false,
                data: null,
                message: "login that bai"
            }
        }

    },

    decodeToken: async (data: any) => {
        try {
            let user = await jwtService.decodeToken(data);

            return {
                data: user
            }
        } catch (err) {
            console.log('err', err);
            return {
                data: null
            }
        }
    },

    find: async (userNameOrEmail: string) => {
        try {
            let user = await prisma.users.findFirst({
                where: {
                    OR: [{ email: userNameOrEmail }, { userName: userNameOrEmail }]
                },
                include: {
                    user_ip_list: true
                }
            })
            return {
                data: user
            }
        } catch (err: any) {
            console.log('err', err);
            return {
                data: null
            }

        }
    },
    
    create: async (data: any) => {
        try {
            let result = await prisma.users.create({
                data: {
                    ...data,
                    createAt: String(Date.now()),
                    updateAt: String(Date.now()),
                }
            })
            return {
                data: result,
                message: "success",
                status: true
            }
        } catch (err) {
            console.log('err', err);

            return {
                data: null,
                message: "fail",
                status: true
            }
        }
    }
}