import './App.css'
import { Box } from "@chakra-ui/react"
import Register from './components/Register'
import Home from './pages/Home'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (

    <BrowserRouter>
     <Home />
    </BrowserRouter>
  )
}

export default App
