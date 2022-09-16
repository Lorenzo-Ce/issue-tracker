import axios  from 'axios';

const BASE_URL = 'http://localhost:3500'

axios.defaults.withCredentials = true;
export default axios.create({
    baseURL: BASE_URL,
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json' }
})

export const axiosProtect = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json' }
})

