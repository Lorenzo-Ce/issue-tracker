import { Box } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { useAuthorization } from './hooks/useAuthorization'
import {RequireAuthorization} from './components/RequireAuthorization'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import PersistLogin from './components/PersistLogin'
import { Desk } from './components/Desk'
import { Project } from './components/Project'

function App() {
  const { authorization } = useAuthorization()
  return (
    <Box as='section' height='100vh' display={'grid'} >
      <Routes>
          <Route path='/' element={<Navigate to='/signup' replace/>}/>
              {/*Free Routes*/}
              <Route path='/signup' element={<Register />}/>
              <Route path='/login' element={<Login />} />
              {/*Protected Routes*/}
              <Route element={<PersistLogin />}>
                <Route element={<RequireAuthorization {...authorization}/>}>
                    <Route path='dashboard' element={<Dashboard/>}>
                      <Route path='' element={<Desk/>}/>
                      <Route path=':projectId' element={<Project />}/>                      
                    </Route>
                </Route>
              </Route>
      </Routes>
    </Box>

  )
}

export default App
