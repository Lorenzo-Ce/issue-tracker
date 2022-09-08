import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Box, FormControl, FormLabel } from "@chakra-ui/react"
import Register from './pages/Register'

function App() {
  return (
    <Box as="section">
      <Register />
    </Box>
  )
}

export default App
