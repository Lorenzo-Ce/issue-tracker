import useAxiosProtect from './useAxiosProtect'
import { useState, useEffect, useRef } from "react"

const useApiCall = (url, method, data = {}) => {
    
    const [responseData, setResponseData] = useState([])
    const [apiError, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const axiosProtect = useAxiosProtect()
    const effectRun = useRef(false)

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        const handleData = async () => {
            try{
                setError('')
                setIsLoading(true)
                const response = await axiosProtect({
                    method,    
                    url,
                    data, 
                    signal: controller.signal
                })
                const result = response.data
                console.log(result)
                setResponseData(result)
            }catch(err){ 
                console.error(err)
                setError(`Error ${err.response?.status}: ${err.response?.statusText} ${err.response?.data?.error}`) 
            } finally {
                isMounted && setIsLoading(false)
            }
        }
        if(effectRun.current) { 
            handleData()      
        }
           
        return () => {
            effectRun.current = true
            isMounted = false
            controller.abort()
        }
    }, [])


    return {responseData, apiError, isLoading}
}

export default useApiCall