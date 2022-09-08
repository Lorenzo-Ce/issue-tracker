import {Heading, Box, FormControl, FormLabel, FormErrorMessage, Input, Button, VStack, Text } from '@chakra-ui/react'
import { useEffect } from "react"
import { useState } from "react"
import { useForm } from '../hooks/useForm'

export default function Register (){
    
    const [formValidation, handleSubmit, 
        isFormValid, handleValidation, 
        handleFormChange, registerForm, 
        ] = useForm()

    useEffect(() => {
        if(registerForm.confirmPassword != ''){
            handleValidation({name: 'confirmPassword', value: registerForm.confirmPassword})
        }
    }, [registerForm.password])
    console.log(registerForm)
    console.log(formValidation)
    console.log(isFormValid)
    return(
        <Box as='form' onSubmit={handleSubmit} width={['100%', '400px']} onChange={(e) => handleValidation(e.target)}>
            <VStack spacing={'10px'}>
                <Heading>Sign In</Heading>
                <FormControl isRequired id='username' isInvalid={formValidation.username}>
                    <FormLabel>Username</FormLabel>
                    <Input type='text' 
                        name='username'
                        value={registerForm.username}
                        onChange={handleFormChange}
                    />
                    <FormErrorMessage>Your username must be alphanumeric, longer than 4 and shorter than 20 characters.</FormErrorMessage>
                </FormControl>
                <FormControl isRequired id='email' isInvalid={formValidation.email}>
                    <FormLabel>Email</FormLabel>
                    <Input type='email'  
                        name='email'
                        value={registerForm.email}
                        onChange={handleFormChange}
                    />             
                     <FormErrorMessage>Please make sure your email is a valid one.</FormErrorMessage>
                </FormControl>
                <FormControl isRequired id='password' isInvalid={formValidation.password}>
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input type='password'
                        name='password'
                        value={registerForm.password}
                        onChange={handleFormChange}
                    />
                    <FormErrorMessage>Your password must be at least 8 characters long, contain at least one number one uppercase, one lowercase letters and one special characters (#?!@%^&*-).</FormErrorMessage>
                </FormControl>
                <FormControl isRequired id='confirmPassword' isInvalid={formValidation.confirmPassword}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type='password'
                        name='confirmPassword'
                        value={registerForm.confirmPassword}
                        onChange={handleFormChange}
                    />
                    <FormErrorMessage>Please make sure the password match.</FormErrorMessage>
                </FormControl>
                <Button type='submit' mb='5px' isActive={isFormValid}>Register</Button>
                <Text as='sub' >Already have an account? <a href='#'>Login Now</a></Text>
        </VStack>
        
        </Box>
    )
}