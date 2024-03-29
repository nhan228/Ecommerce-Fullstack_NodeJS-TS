import axios from "axios";
const prefix = "products"

export default {
    create: async (data: any) => {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/${prefix}`, data)
    },
    findMany: async () => {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/${prefix}`)
    },
    updateDes: async (id: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/des/${id}`, data)
    },
    update: async (id: number, data: any) => {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/${id}`, data)
    },
    delete: async (id: number) => {
        return await axios.delete(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/${id}`)
    }
    ,
    deletePic: async (id: number) => {
        return await axios.delete(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/delete-pictures/${id}`)
    }
}