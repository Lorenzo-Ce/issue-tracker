import { Box } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { useAuthorization } from './hooks/useAuthorization'
import {RequireAuthorization} from './components/RequireAuthorization'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'

function App() {
  const { authorization } = useAuthorization()

  return (
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

export default App
