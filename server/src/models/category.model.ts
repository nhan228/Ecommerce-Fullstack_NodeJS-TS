import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const categoryModel = {
    findAll: async () => {
        try {
            let categories = await prisma.categories.findMany()
            return {
                err: null,
                data: categories
            }
        } catch (err) {
            console.log('err', err);
            return {
                err,
                data: null
            }
        }

    },
    update: async (id: number, data: any) => {
        try {
            let result = await prisma.categories.update({
                where: {
                    id: id
                },
                data: {
                    ...data
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
    create: async (data: any) => {
        try {
            let result = await prisma.categories.create({
                data: {
                    ...data
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