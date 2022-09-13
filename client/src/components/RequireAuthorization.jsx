import { Outlet, Navigate, useLocation } from "react-router-dom"


export const RequireAuthorization = ({authorization}) =>{
    const location = useLocation()
    return (
        authorization?.accessToken ? <Outlet/> : <Navigate to='/login' state={{from: location}} replace/>
    )
}