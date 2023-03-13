import { Outlet, Navigate, useLocation } from "react-router-dom"


const RequireAuthorization = ({accessToken}) =>{
    const location = useLocation()
    return (
        accessToken ? <Outlet/> : <Navigate to='/login' state={{from: location}} replace/>
    )
}
export default RequireAuthorization