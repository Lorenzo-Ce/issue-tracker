import useAxiosProtect from './useAxiosProtect'
import { useState, useEffect } from "react"

const useGetData = (url) => {
    
    const [responseData, setResponseData] = useState([])
    const [apiError, setApiError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const axiosProtect = useAxiosProtect()

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
                if (err?.response && err?.response?.status !== 0){
                    setApiError(`Error ${err?.response?.status}: ${err.response?.statusText} ${err?.response?.data?.error}`)
                }
                else if(err?.request){
                    setApiError('Network Error. Request failed, try again later.')
                }
                else{
                    setApiError('Error something went wrong with your request. Try again later.')
                }
            } finally {
                isMounted && setIsLoading(false)
            }
        }
            handleData()      

           
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])


    return {responseData, setResponseData, apiError, setApiError, isLoading}
}

export default useGetData