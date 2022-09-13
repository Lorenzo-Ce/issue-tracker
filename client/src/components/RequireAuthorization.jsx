import { Outlet, Navigate, useLocation } from "react-router-dom"


export const RequireAuthorization = ({accessToken}) =>{
    const location = useLocation()
    return (
        accessToken ? <Outlet/> : <Navigate to='/login' state={{from: location}} replace/>
    )
}