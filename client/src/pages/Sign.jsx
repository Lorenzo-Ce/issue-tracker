import {Heading, Box, FormControl, FormLabel, Input, Button, VStack, Text } from "@chakra-ui/react"
import { useState } from "react"

export default function Sign (){
    const [registerForm, setForm] = useState({email: '', username: '', password: ''})
    const [confirmPassword, setConfirmPassword] = useState('')
    const REG_USERNAME = "^[A-Za-z][A-Za-z0-9_]{4,20}$"
    const handleFormChange = event => {
        const {value, name} = event.target
        setForm((prevRegisterForm) => (
            {...prevRegisterForm,
                [name]: value
            }
        ))
    }

    const handleSubmit = event => {
        event.preventDefault()
        console.log('submitted')
    }

    const validateValue = (event) => {
       const {value, name} = event.target
       console.log(value)
       if(name === 'username'){

       }
    }

    return(
        <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={'10px'}>
                <Heading>Sign In</Heading>
                <FormControl isRequired id='username'>
                    <FormLabel>Username</FormLabel>
                    <Input type='text' 
                        name="username"
                        value={registerForm.username}
                        onChange={handleFormChange}
                        onBlur={validateValue}
                    />
                </FormControl>
                <FormControl isRequired id='email'>
                    <FormLabel>Email</FormLabel>
                    <Input type='email'  
                        name="email"
                        value={registerForm.email}
                        onChange={handleFormChange}
                    />
                </FormControl>
                <FormControl isRequired id='password'>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input type='password'
                        name="password"
                        value={registerForm.password}
                        onChange={handleFormChange}
                    />
                </FormControl>
                <FormControl isRequired id='confirmPassword'>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type='password'
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormControl>
                <Button type='submit' mb='5px'>Register</Button>
                <Text as="sub" >Already have an account? <a href="#">Login Now</a></Text>
        </VStack>
        
        </Box>
    )
}