import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const brandModel = {
    findAll: async () => {
        try {
            let brands = await prisma.brands.findMany()
            return {
                err: null,
                data: brands
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
            let result = await prisma.brands.update({
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
            let result = await prisma.brands.create({
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