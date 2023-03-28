import axios  from 'axios';

export const BASE_URL = import.meta.env.PROD ? 'https://issue-tracker-server-kmux.onrender.com' :'http://localhost:3500'

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json' }
})

export const axiosProtect = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json' }
})

