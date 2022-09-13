import { Route, Routes, Navigate} from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Register from '../components/Register'
import Login from '../components/Login'
import { useAuthorization } from '../hooks/useAuthorization'
import { Dashboard } from './Dashboard'
import { RequireAuthorization } from '../components/RequireAuthorization'

function Home() {
    const {authorization, setAuthorization} = useAuthorization()

    return(
        <Box>
            <Routes>
                <Route path='/' element={<Navigate to='/signup' replace/>}/>
                    {/*Free Routes*/}
                    <Route path='/signup' element={<Register />}/>
                    <Route path='/login' element={<Login />} />
                    {/*Protected Routes*/}
                    <Route element={<RequireAuthorization {...authorization}/>}>
                        <Route path='/dashboard' element={<Dashboard/>}/>
                    </Route>
            </Routes>
        </Box>
    )
}
export default Home
