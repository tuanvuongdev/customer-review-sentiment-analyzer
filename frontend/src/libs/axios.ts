import axios from 'axios'

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3056'

const axiosServices = axios.create({
    baseURL: BASE_URL
})

export default axiosServices
