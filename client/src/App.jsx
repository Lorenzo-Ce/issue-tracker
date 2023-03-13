import './App.css'
import { Box } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy } from 'react'
import Register from './components/Register'
import useAuthorization from './hooks/useAuthorization'
import load from './utils/load'
import RequireAuthorization from './components/RequireAuthorization' 
import PersistLogin from './components/PersistLogin' 
const Login = lazy(() => import('./components/Login'))
const Issues = lazy(() => import('./pages/Issues')) 
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Desk = lazy(() => import('./pages/Desk')) 
const Project = lazy(() => import('./pages/Project')) 

function App() {
  const { authorization } = useAuthorization()
  const SuspenseLogin = load(Login)
  const SuspensePersistLogin = load(PersistLogin)
  const SuspenseIssues = load(Issues)
  const SuspenseDashboard = load(Dashboard)
  const SuspenseDesk = load(Desk)
  const SuspenseProject = load(Project)


  return (
    <Box as='section' height='100vh' display={'grid'} >
      <Routes>
          <Route path='/' element={<Navigate to='/signup' replace/>}/>
          {/*Free Routes*/}
            <Route path='/signup' element={ <Register/> }/>
            <Route path='/login' element={ <SuspenseLogin/> }/>
          {/*Protected Routes*/}
            <Route element={ <PersistLogin /> }>
              <Route element={ <RequireAuthorization {...authorization} />}>
                  <Route path='issues' element={ <SuspenseIssues/> }/>
                  <Route path='dashboard' element={ <SuspenseDashboard/> }>
                      <Route path='' element={ <SuspenseDesk/> }/>
                      <Route path=':projectId'element={ <SuspenseProject /> }/>
                  </Route>                      
              </Route>
            </Route>
      </Routes>
    </Box>

  )
}

export default App
