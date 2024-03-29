import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const addressModel = {
    findAll: async () => {
        try {
            let address = await prisma.address.findMany()
            return {
                err: null,
                data: address
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
            let result = await prisma.address.update({
                where: {
                    id,
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
            let result = await prisma.address.create({
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