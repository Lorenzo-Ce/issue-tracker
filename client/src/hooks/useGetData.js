import useAxiosProtect from './useAxiosProtect'
import { useState, useEffect, useRef } from "react"

const useGetData = (route) => {
    
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const axiosProtect = useAxiosProtect()
    const effectRun = useRef(false)

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        const getData = async () => {
            try{
                setIsLoading(true)
                const response = await axiosProtect.get(
                    route, 
                    { signal: controller.signal }
                )
                const data = response?.data
                setData(data)
            }catch(e){ 
                console.error(e) 
            } finally {
                isMounted && setIsLoading(false)
            }
        }
        if(effectRun.current) { 
            getData()      
        }
           
        return () => {
            effectRun.current = true
            isMounted = false
            controller.abort()
        }
    }, [])


    return {data, isLoading}
}

export default useGetData