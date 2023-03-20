import './App.css'
import { Box } from '@chakra-ui/react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy } from 'react'
import useAuthorization from './hooks/useAuthorization'
import load from './utils/load'
import ErrorBoundary from './components/Alerts/ErrorBoundaries'
import RequireAuthorization from './pages/RequireAuthorization' 
import PersistLogin from './pages/PersistLogin' 
import Register from './pages/Register'
const Login = lazy(() => import('./pages/Login'))
const Issues = lazy(() => import('./pages/Issues')) 
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Desk = lazy(() => import('./pages/Desk')) 
const Project = lazy(() => import('./pages/Project')) 
const NoMatch = lazy(() => import('./pages/NoMatch')) 

function App() {
  const { authorization } = useAuthorization()
  const SuspenseLogin = load(Login)
  const SuspenseIssues = load(Issues)
  const SuspenseDashboard = load(Dashboard)
  const SuspenseDesk = load(Desk)
  const SuspenseProject = load(Project)
  const SuspenseNoMatch = load(NoMatch)

  return (
    <Box as='section' height='100vh' display={'grid'} >
      <ErrorBoundary>
      <Routes>
          <Route path='/' element={<Navigate to='/signup' replace/>}/>
          {/*Free Routes*/}
            <Route path='/signup' element={ <Register/> }/>
            <Route path='/login' element={ <SuspenseLogin/> }/>
          {/*Protected Routes*/}
            <Route element={ <PersistLogin /> }>
              <Route element={ <RequireAuthorization {...authorization} />}>
                  <Route path='dashboard' element={ <SuspenseDashboard/> }>
                    <Route path='' element={ <SuspenseDesk/> }/> 
                    <Route path=':projectId'element={ <SuspenseProject /> }/>
                    <Route path='myIssues' element={ <SuspenseIssues/> }/>
                    <Route path="*" element={<SuspenseNoMatch />} />
                  </Route>                      
              </Route>
            </Route>
            <Route path="*" element={<SuspenseNoMatch />} />
      </Routes>
      </ErrorBoundary>
    </Box>

  )
}

export default App
