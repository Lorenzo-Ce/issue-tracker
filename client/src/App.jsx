import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Box } from "@chakra-ui/react"
import Register from './components/Register'

function App() {
  return (
    <Box as="section">
      <Register />
    </Box>
  )
}

export default App
