import { Route, Routes, Navigate} from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Register from '../components/Register'
import Login from '../components/Login'
import { useAuthorization } from '../hooks/useAuthorization'

function Home() {
    const { auth } = useAuthorization()



    return(
        <Box>
            <Routes>
                <Route path='/' element={<Navigate to='/signup' replace/>}>
                    {/*Free Routes*/}
                    <Route path='signup' element={<Register />}/>
                    <Route path='login' element={<Login />} />
                    {/*Protected Routes*/}

                </Route>
            </Routes>
        </Box>
    )
}
export default Home
