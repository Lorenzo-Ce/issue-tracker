import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuthorization } from "../hooks/useAuthorization"
import useRefreshToken from "../hooks/useRefreshToken"


export const PersistLogin = () => {
    const [ isLoading, setIsLoading ] = useState(true)
    const { authorization, setAuthorization } = useAuthorization()
    const { refreshAccessToken } = useRefreshToken()

    useEffect(() => {
        const verifyToken = async () => {
            try{
                setIsLoading(true)
                const accessToken = await refreshAccessToken()
                setAuthorization(prevAuth => ({...prevAuth, accessToken}))
            } catch (err){
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        
        !authorization.accessToken ? verifyToken() : setIsLoading(false)
    },[])
    return(
        <>
            {isLoading ? <div>Loading ...</div> : <Outlet/>}
        </>
    )
}

export default PersistLogin