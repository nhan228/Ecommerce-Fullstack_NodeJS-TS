import { PrismaClient, ReceiptStatus } from '@prisma/client'
const prisma = new PrismaClient()
export const receiptModel = {
    findMany: async (userId: number) => {
        try {
            const result = await prisma.receipts.findMany({
                where: {
                    userId: userId
                },
                include: {
                    detail: {
                        include: {
                            product: true
                        }
                    }
                }
            })
            return {
                data: result,
                status: true,
                message: "success"
            }
        } catch (err) {
            return {
                data: null,
                status: false,
                message: "fail"
            }
        }
    },
    find: async (id: number) => {
        try {
            const result = await prisma.receipts.findFirst({
                where: {
                    userId: id,
                    status: ReceiptStatus.shopping
                },
                include: {
                    detail: {
                        include: {
                            product: true
                        }
                    }
                }
            })
            return {
                data: result,
                message: "success",
                status: true
            }
        } catch (err) {
            return {
                data: null,
                message: "fail",
                status: false
            }
        }
    }
    ,
    delete: async function (id: number) {
        try {
            let result = await prisma.receipt_details.delete({
                where: {
                    id: id
                },
                include: {
                    product: true
                }
            })
            return {
                data: result,
                message: "success",
                status: true
            }
        } catch (err) {
            return {
                data: null,
                message: err.message || "fail",
                status: false
            }
        }
    }
    ,
    update: async (item: any) => {
        try {
            let result = await prisma.receipt_details.update({
                where: {
                    id: item.id
                },
                data: {
                    quantity: item.quantity
                }
            })
            return {
                data: result,
                message: "success",
                status: true
            }
        } catch (err) {
            return {
                data: null,
                message: "fail",
                status: true
            }
        }
    }
    ,
    addToCart: async (item: any, userId: any) => {
        try {
            let cartExisted = await prisma.receipts.findMany({
                where: {
                    status: ReceiptStatus.shopping,
                    userId: userId
                },
                include: {
                    detail: {
                        include: {
                            product: true
                        }
                    }
                }
            } as any)

            //Khi user chua có receipt
            if (cartExisted.length == 0) {
                let receipt = await prisma.receipts.create({
                    data: {
                        createAt: String(Date.now()),
                        updateAt: String(Date.now()),
                        userId: userId,
                        detail: {
                            create: [
                                {
                                    productId: item.productId,
                                    quantity: item.quantity
                                }
                            ]
                        }
                    },
                    include: {
                        detail: {
                            include: {
                                product: true
                            }
                        }
                    }
                } as any)
                // console.log('receipt', receipt);
                return {
                    status: true,
                    message: "add to cart ok (new cart)",
                    data: receipt
                }
            }
            else {
                // khi co gio hang
                let cart = cartExisted[0];
                let existedItem = (cart as any).detail?.find(findItem => findItem.productId === item.id)

                if (existedItem) {
                    await prisma.receipt_details.update({
                        where: {
                            id: existedItem.id
                        },
                        data: {
                            ...existedItem,
                            quantity: existedItem.quantity + item.quantity
                        }
                    })
                } else {
                    await prisma.receipt_details.create({
                        data: {
                            productId: item.productId,
                            quantity: item.quantity,
                            receiptId: cart.id
                        }
                    })
                }

                let realCart = await prisma.receipts.findUnique({
                    where: {
                        id: cart.id
                    },
                    include: {
                        detail: {
                            include: {
                                product: true
                            }
                        }
                    }
                })
                return {
                    status: true,
                    message: "add to cart ok ( old cart updated)",
                    data: realCart
                }
            }
        } catch (err) {
            console.log('err', err);
            return {
                status: false,
                message: "add to cart failed",
                data: null
            }
        }

    },
    pay: async (newReceipt: any, receiptId: number) => {
        try {
            let receipt = await prisma.receipts.update({
                where: {
                    id: receiptId
                },
                data: {
                    ...newReceipt,
                    updateAt: String(Date.now()),
                    pending: String(Date.now()),
                    status: "pending"
                },
                include:{
                    detail:{
                        include:{
                            product:true
                        }
                    }
                }
            })
            return {
                
                data: receipt,
                message: "pay ok",
                status: true
            }
        } catch (err) {
            console.log('err', err);

            return {
                data: null,
                message: "pay fail",
                status: true
            }
        }
    },
    updateReceipt: async (newReceipt: any, receiptId: number) => {
        try {
            let receipt = await prisma.receipts.update({
                where: {
                    id: receiptId
                },
                data: {
                    ...newReceipt,
                    updateAt: String(Date.now()),
                },
                include:{
                    detail:{
                        include:{
                            product:true
                        }
                    }
                }
            })
            return {
                data: receipt,
                message: "update ok",
                status: true
            }
        } catch (err) {
            console.log('err', err);

            return {
                data: null,
                message: "update fail",
                status: true
            }
        }
    }
}