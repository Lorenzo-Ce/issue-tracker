import './App.css'
import Home from './pages/Home'
import { BrowserRouter } from 'react-router-dom'
import {AuthorizationContextProvider} from './context/AuthorizationContext'

function App() {
  
  

  return (

    <BrowserRouter>
     <AuthorizationContextProvider>
        <Home />
     </AuthorizationContextProvider>
    </BrowserRouter>
  )
}

export default App
