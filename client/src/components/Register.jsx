import {Heading, Box, FormControl, FormLabel, FormErrorMessage, Input, Button, VStack, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { Error } from './Error'
import postData from '../utils/postData'

export default function Register (){
    
    const [formValidation,isFormValid, handleValidation, 
        handleFormChange, registerForm, errorMessage, setErrorMessage] = useForm()
        const [isLoading, setIsLoading] = useState(false)
    
        useEffect(() => {
        if(registerForm.confirmPassword !== ''){
            handleValidation({name: 'confirmPassword', value: registerForm.confirmPassword})
        }
    }, [registerForm.password])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMessage('')
        setIsLoading(true)

        try{
            const post = postData
            const {response, responseBody} = await post('register', registerForm)
            setIsLoading(false)
            console.log(response)
        } catch (err){
            setIsLoading(false)
            if(!err?.status){
                setErrorMessage('Network Error. Registration failed, try again later.')
            }
            else{
                setErrorMessage(`Error ${err.status}: ${err.body.error}`)
                console.log(errorMessage)
            }
        }
        
    }

    return(
        <Box as='form' 
            onSubmit={handleSubmit} 
            width={['100%', '400px']} 
            onChange={(e) => handleValidation(e.target)}
        >
            <VStack spacing={'10px'}>
                <Heading>Registration</Heading>
                {errorMessage !== '' && <Error message={errorMessage} /> }
                <FormControl isRequired 
                    id='username' 
                    isInvalid={formValidation.username}
                >
                    <FormLabel>Username</FormLabel>
                    <Input type='text' 
                        name='username'
                        value={registerForm.username}
                        onChange={handleFormChange}
                    />
                    <FormErrorMessage>Your username must be alphanumeric, longer than 4 and shorter than 20 characters.</FormErrorMessage>
                </FormControl>
                <FormControl isRequired 
                    id='email' 
                    isInvalid={formValidation.email}
                >
                    <FormLabel>Email</FormLabel>
                    <Input type='email'  
                        name='email'
                        value={registerForm.email}
                        onChange={handleFormChange}
                    />             
                     <FormErrorMessage>Please make sure your email is a valid one.</FormErrorMessage>
                </FormControl>
                <FormControl isRequired 
                    id='password' 
                    isInvalid={formValidation.password}
                >
                    <FormLabel htmlFor='password'>Password</FormLabel>
                    <Input type='password'
                        name='password'
                        value={registerForm.password}
                        onChange={handleFormChange}
                    />
                    <FormErrorMessage>Your password must be at least 8 characters long, contain at least one number, one uppercase, one lowercase character and one special character (#?!@$%^&*-).</FormErrorMessage>
                </FormControl>
                <FormControl isRequired 
                    id='confirmPassword' 
                    isInvalid={formValidation.confirmPassword}
                >
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type='password'
                        name='confirmPassword'
                        value={registerForm.confirmPassword}
                        onChange={handleFormChange}
                    />
                    <FormErrorMessage>Please make sure the password match.</FormErrorMessage>
                </FormControl>
                <Button type='submit' mb='5px' 
                    isLoading={isLoading} 
                    isActive={!isFormValid}
                    isDisabled={!isFormValid}
                >
                    Register
                </Button>
                <Text as='sub' >Already have an account? <a href='#'>Login Now</a></Text>
        </VStack>
        
        </Box>
    )
}