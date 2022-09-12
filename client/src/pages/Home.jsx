import { Route, Routes, Navigate} from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Register from '../components/Register'
import Login from '../components/Login'

function Home() {
    return(
        <Box>
            <Routes>
                <Route path='/' element={<Navigate to='/signup' replace/>}/>
                <Route path='/signup' element={<Register />}/>
                <Route path='/login' element={<Login />} />
            </Routes>
        </Box>
    )
}
export default Home
