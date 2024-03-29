import axios from "axios";
const prefix = "receipts"

export default {
    findMany: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/${prefix}`)
    },
    addToCart: async (item: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/add-to-cart`, item)
    },
    delete: async (itemId: number) => {
        return await axios.delete(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/${itemId}`)
    },
    update: async (data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/${prefix}`, data)
    }
    ,
    updateReceipt: async (ReceiptId: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/${ReceiptId}`, data)
    },
    pay: async (receiptId: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/pay/${receiptId}`, data)
    },
    zaloReceipt: async (data: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/pay/zalo/`, data)
    },
    zaloCheck: async (zaloPayReceiptId: number) => {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/pay/zalo-check/${zaloPayReceiptId}`)
    }
}