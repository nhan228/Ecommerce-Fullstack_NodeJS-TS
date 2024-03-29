import axios from "axios"
const prefix = "categories"

export default {
    findMany: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/${prefix}`)
    },
    update: async (id: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/${id}`, data)
    },
    create: async (data: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/${prefix}`, data)
    }
}