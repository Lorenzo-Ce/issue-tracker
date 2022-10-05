import {Heading, Box, FormControl, FormLabel, FormErrorMessage, Input, Button, VStack, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import { useAuthorization } from '../hooks/useAuthorization'
import { Error } from './Error'
import axios from '../utils/axios'

export default function Login (){
    
    const [formValidation,isFormValid, handleValidation, 
        handleFormChange, Form, formError, setFormError] = useForm({email:'', password:''})
    const [isLoading, setIsLoading] = useState(false)
    const {authorization, setAuthorization} = useAuthorization()
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setFormError('')
        setIsLoading(true)

        try{
            const response = await axios.post('/login', JSON.stringify(Form))   
            setAuthorization(prevAuth => (
                {...prevAuth, 
                    accessToken: response?.data?.accessToken,
                    username: response?.data?.username
                }))
            
            navigate('/dashboard', {replace: true})
            
        } catch (err){
            if(err?.request){
                setFormError('Network Error. Registration failed, try again later.')
            }
            else{
                const formError = await err.json()
                setFormError(`Error ${err?.response?.status}: ${formError}`)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <Box as='form' 
            onSubmit={handleSubmit} 
            color={'blue.800'} w={['95%', '400px']} padding={'1em'} borderRadius={'10px'} boxShadow={'rgba(0, 0, 0, 0.1) 0px 4px 12px'}
            bgColor='#FFF' placeSelf='center'
            onChange={(e) => handleValidation(e.target)}
        >
            <VStack spacing={'10px'}>
                <Heading>Login</Heading>
                {formError !== '' && <Error message={formError} /> }
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
                <Button type='submit' mb='5px' 
                    colorScheme='blue'
                    loadingText='Logging in'
                    isLoading={isLoading} 
                    isDisabled={!isFormValid}
                >
                    Login
                </Button>
        </VStack>
        <VStack mt='1em' mb='1em'gap='1em' >
            <Text as='sub'>
                Login as <Link to='/login'>GUEST ACCOUNT</Link>
            </Text>
            <Text as='sub'>
                Need an account? <Link to='/signup'>Register Now</Link>
            </Text>
        </VStack>        
 
        </Box>
    )
}