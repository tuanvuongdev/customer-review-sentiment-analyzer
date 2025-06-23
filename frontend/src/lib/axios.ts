import axios from 'axios'

export const BASE_URL = typeof window !== 'undefined' ?
    process.env.API_ENDPOINT_CLIENT :
    process.env.API_ENDPOINT_SERVER

const axiosServices = axios.create({
    baseURL: BASE_URL
})

export default axiosServices
