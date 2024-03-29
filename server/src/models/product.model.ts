import { readFileSync, writeFileSync } from "fs";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const productModel = {
    findAll: async () => {
        try {
            let products = await prisma.products.findMany({
                include: {
                    category: true,
                    pictures: true,
                    brand: true
                }
            })
            return {
                err: null,
                data: products
            }
        } catch (err) {
            console.log('err', err);

            return {
                err,
                data: null
            }
        }

    },

    delete: (id: number) => {
        try {
            let result = 3
            return {
                err: null,
                data: result
            }
        } catch (err) {
            return {
                err,
                data: null
            }
        }
    },

    create: async (newProduct: any, picture: any) => {
        try {
            let newItem = await prisma.products.create({
                data: {
                    ...newProduct,
                    detail: "{}",
                    pictures: {
                        create: [
                            ...picture
                        ]
                    }
                },
                include: {
                    category: true,
                    brand: true,
                    pictures: true
                }

            })
            return {
                err: null,
                data: newItem
            }
        } catch (err) {
            console.log('err', err);

            return {
                err,
                data: null
            }
        }
    },
    updateDes: async (id: number, data: any) => {
        try {
            let result = await prisma.products.update({
                where: {
                    id: id
                },
                data: {
                    ...data
                },
                include: {
                    category: true,
                    brand: true,
                    pictures: true
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
    },
    deletePic: async (productId: number) => {
        try {
            let result = await prisma.pictures.deleteMany({
                where: {
                    productId: productId
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
    ,
    update: async (id: number, data: any) => {
        try {
            let result = await prisma.products.update({
                where: {
                    id: id
                },
                data: {
                    ...data,
                    pictures: {
                        create: [...data.pictures]
                    }
                },
                include: {
                    category: true,
                    brand: true,
                    pictures: true
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