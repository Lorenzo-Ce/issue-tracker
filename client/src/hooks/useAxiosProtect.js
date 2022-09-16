import { axiosProtect } from "../utils/axios"
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"
import { useAuthorization } from "./useAuthorization"

const useAxiosProtect = () => {
    const {refreshAccessToken} = useRefreshToken()
    const { authorization } = useAuthorization()

    useEffect(() => {
        const requestInterceptor = axiosPrivate.interceptors.request.use(
            (config) => {
                console.log(config)
                if (!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        )

        const responseInterceptor = axiosPrivate.interceptors.response.use(
            response => response,
            async(error) => {
                const prevRequest = error?.config
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true
                    const newAccessToken = await refreshAccessToken()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestInterceptor)
            axiosPrivate.interceptors.response.eject(responseInterceptor)
        }

    }, [authorization, refresh])

    return axiosProtect
}

export default useAxiosProtect