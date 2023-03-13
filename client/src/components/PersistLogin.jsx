import { Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import {Grid, Spinner} from "@chakra-ui/react"
import useAuthorization from "../hooks/useAuthorization"
import useRefreshToken from "../hooks/useRefreshToken"

const PersistLogin = () => {
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
            {isLoading ?             
                <Grid 
                    placeContent='center'
                    height='80vh'
                >
                <Spinner
                    thickness='7px'
                    speed='0.7s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
                </Grid>  : 
                <Outlet/>}
        </>
    )
}

export default PersistLogin