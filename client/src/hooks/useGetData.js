import useAxiosProtect from './useAxiosProtect'
import { useState, useEffect, useRef } from "react"

const useGetData = (url) => {
    
    const [responseData, setResponseData] = useState([])
    const [apiError, setApiError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const axiosProtect = useAxiosProtect()
    const effectRun = useRef(false)

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        const handleData = async () => {
            try{
                setApiError('')
                setIsLoading(true)
                const response = await axiosProtect.get(    
                    url,
                    {signal: controller.signal}
                )
                const result = response.data
                setResponseData(result)
            }catch(err){ 
                if(err?.request){
                    setApiError('Network Error. Submit failed, try again later.')
                }
                else if (err?.response){
                    setApiError(`Error ${err?.response?.status}: ${err.response?.statusText} ${err?.response?.data?.error}`)
                }
                else{
                    setApiError(`Ops Something went wrong, refresh the page or try again later`)
                }
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


    return {responseData, setResponseData, apiError, setApiError, isLoading}
}

export default useGetData