import {Heading, Box, FormControl, FormLabel, FormErrorMessage, Input, Button, VStack, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useState } from "react"

export default function Sign (){
    const [registerForm, setForm] = useState({email: '', username: '', password: ''})
    const [confirmPassword, setConfirmPassword] = useState('')
    const [formValidation, setFormValidation] = useState({email: false, username: false, password: false, confirmPassword: false})
    const isFormValid = Object.values(formValidation).every(field => field === false)

    const REGX_USERNAME = new RegExp("^[A-Za-z0-9_]{4,20}$")
    // (?=.*?[A-Z]) = One uppercase letter (?=.*?[a-z]) = One uppercase letter (?=.*?[0-9]) = One number (?=.*?[#?!@$%^&*-]) = One Symbol {8,} lenght min 8
    const REGX_PSW = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    
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
    const handleValidation = (event) =>{
        const {value, name} = event.target
        let isInvalid
        console.log(value)
        switch(name) {
         case 'username': isInvalid = !REGX_USERNAME.test(value); break;
         case 'password': isInvalid = !REGX_PSW.test(value); break;
         case 'confirmPassword': isInvalid = value != registerForm.password; break;
         default: isInvalid = false
        }
        setFormValidation(prevForm => ({...prevForm, [name]: isInvalid}))
    }
    useEffect(() => {
    console.log(Object.values(formValidation))
    console.log(isFormValid)
    },[isFormValid])
    return(
        <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={'10px'}>
                <Heading>Sign In</Heading>
                <FormControl isRequired id='username' isInvalid={formValidation.username == "" ? false : formValidation.username}>
                    <FormLabel>Username</FormLabel>
                    <Input type='text' 
                        name="username"
                        value={registerForm.username}
                        onChange={handleFormChange}
                        onBlur={handleValidation}
                    />
                    <FormErrorMessage>Your username must be alphanumeric, longer than 8 and shorter than 20 characters.</FormErrorMessage>
                </FormControl>
                <FormControl isRequired id='email' isInvalid={formValidation.email}>
                    <FormLabel>Email</FormLabel>
                    <Input type='email'  
                        name="email"
                        value={registerForm.email}
                        onChange={handleFormChange}
                    />               
                </FormControl>
                <FormControl isRequired id='password' isInvalid={formValidation.password == "" ? false : formValidation.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input type='password'
                        name="password"
                        value={registerForm.password}
                        onChange={handleFormChange}
                        onBlur={handleValidation}
                    />
                    <FormErrorMessage>Your password must be at least 8 characters long, contain at least one number one uppercase, one lowercase letters and one special characters (#?!@$%^&*-).</FormErrorMessage>
                </FormControl>
                <FormControl isRequired id='confirmPassword' isInvalid={formValidation.password == "" ? false : formValidation.password}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type='password'
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={handleValidation}
                    />
                    <FormErrorMessage>Please make sure the password match.</FormErrorMessage>
                </FormControl>
                <Button type='submit' mb='5px' isActive={isFormValid}>Register</Button>
                <Text as="sub" >Already have an account? <a href="#">Login Now</a></Text>
        </VStack>
        
        </Box>
    )
}