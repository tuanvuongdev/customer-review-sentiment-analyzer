import axios from 'axios'

const objectEndpoint = {
    client: process.env.API_ENDPOINT_CLIENT,
    server: process.env.API_ENDPOINT_SERVER
}

function getBaseURL(type: keyof typeof objectEndpoint) {
    return objectEndpoint[type]
}

export const axiosClient = axios.create({
    baseURL: getBaseURL('client')
})

export const axiosServer = axios.create({
    baseURL: getBaseURL('server')
})


