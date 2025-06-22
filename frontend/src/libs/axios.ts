import axios from 'axios'

export const BASE_URL = process.env.API_URL || 'http://localhost:3056/api'

const axiosServices = axios.create({
    baseURL: BASE_URL
})

// axiosServices.interceptors.response.use(
//     (res) => res,
//     (err) => {
//         const status = err.response?.status;
//         const data = err.response?.data;

//         if (status === 400) {
//             toast.error(data.message || "Bad Request");
//         } else {
//             toast.error(data?.message || "Server error. Please try again later.");
//         }

//         return Promise.reject(err);
//     }
// );

export default axiosServices
