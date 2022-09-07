import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Box, FormControl, FormLabel } from "@chakra-ui/react"
import Sign from './pages/Sign'

function App() {
  return (
    <Box as="section">
      <Sign />
    </Box>
  )
}

export default App
