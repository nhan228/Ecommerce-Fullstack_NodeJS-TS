import axios from "axios";
const prefix = "users"

export default {
    register: async function (newUser: any) {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/${prefix}`, newUser);
    },
    login: async function (data: any) {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/login`, data);
    },
    loginWithGoogle: async function (data: any) {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/login/login-with-google`, data);
    },
    decodeToken: async function (token: string) {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/token-decode/${token}`);
    },
    findMany: async function () {
        return await axios.get(`${import.meta.env.VITE_SERVER_HOST}/${prefix}`);
    },
    create: async function (data: any) {
        return await axios.post(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/create`, data);
    },
    update: async function (userId: number, data: any) {
        return await axios.patch(`${import.meta.env.VITE_SERVER_HOST}/${prefix}/update/${userId}`, data);
    }
}