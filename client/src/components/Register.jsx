import {Heading, Box, FormControl, FormLabel, FormErrorMessage, Input, Button, VStack, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { Error } from './Alerts/Error'
import axios from '../utils/axios'

export default function Register (){
    
    const {formValidation,isFormValid, handleValidation, 
        handleFormChange, Form, errorMessage, setErrorMessage} = useForm({email:'', username:'', password:'', confirmPassword:''})
    const [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()
    useEffect(() => {
        if(Form.confirmPassword !== ''){
            handleValidation({name: 'confirmPassword', value: Form.confirmPassword})
        }
    }, [Form.password])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMessage('')
        setIsLoading(true)
        
        try{
            const response = await axios.post('/register', JSON.stringify(Form))
            navigate('/login', {replace: true})
        } catch (err){
            if(err?.response && err?.response?.status !== 0){
                setErrorMessage(`Error ${err?.response?.status}: ${err?.response?.data?.error}.`)
            }
            else if(err?.request){
                setErrorMessage('Network Error. Registration failed, try again later.')                
            }
            else{
                setErrorMessage('Error something went wrong with your request. Try again later.')
            }
        } finally {
            setIsLoading(false)
        }
        
    }

    return(
        <Box as='form' 
            onSubmit={handleSubmit} 
            color='blue.800' 
            w={['90%', '400px']} 
            padding='1em' 
            borderRadius='10px' 
            boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
            bgColor='#FFF' placeSelf='center'
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
                        value={Form.username}
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
                        value={Form.email}
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
                        value={Form.password}
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
                        value={Form.confirmPassword}
                        onChange={handleFormChange}
                    />
                    <FormErrorMessage>Please make sure the password match.</FormErrorMessage>
                </FormControl>
                <Button type='submit' mb='5px' 
                    colorScheme='blue'
                    isLoading={isLoading} 
                    isDisabled={!isFormValid}
                >
                    Register
                </Button>
        </VStack>
        <VStack  p='1em' gap='1em' >
                <Text as='sub'>
                    Already have an account? <Link to='/login'>Login Now</Link>
                </Text>
                <Text as='sub'>
                    Login as <Link to='/login'>GUEST ACCOUNT</Link>
                </Text>
        </VStack>        
        </Box>
    )
}