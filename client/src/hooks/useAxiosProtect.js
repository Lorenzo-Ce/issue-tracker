import { axiosProtect } from "../utils/axios"
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"
import useAuthorization from "./useAuthorization"

const useAxiosProtect = () => {
    const {refreshAccessToken} = useRefreshToken()
    const { authorization } = useAuthorization()
    
    useEffect(() => {
        const requestInterceptor = axiosProtect.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${authorization?.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        )

        const responseInterceptor = axiosProtect.interceptors.response.use(
            response => response,
            async(error) => {
                if(error.code === "ERR_CANCELED") return Promise.resolve({status: 499})
                const prevRequest = error?.config
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refreshAccessToken()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosProtect(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosProtect.interceptors.request.eject(requestInterceptor)
            axiosProtect.interceptors.response.eject(responseInterceptor)
        }

    }, [authorization, refreshAccessToken])

    return axiosProtect
}

export default useAxiosProtect