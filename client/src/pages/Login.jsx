import {Heading, Box, FormControl, FormLabel, FormErrorMessage, Input, Button, VStack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm'
import useAuthorization from '../hooks/useAuthorization'
import { Error } from '../components/Alerts/Error'
import axios from '../utils/axios'

const Login = () => {
    const fieldsToValidate = ['email', 'password']
    const {formValidation,isFormValid, handleValidation, 
        handleFormChange, Form, errorMessage, setErrorMessage} = useForm({email:'', password:''}, fieldsToValidate)
    const [isLoading, setIsLoading] = useState(false)
    const { setAuthorization} = useAuthorization()
    const navigate = useNavigate()

    const handleSubmit = async (event, form) => {
        event.preventDefault()
        setErrorMessage('')
        setIsLoading(true)
        try{
            const response = await axios.post('/login', JSON.stringify(form))   
            setAuthorization(prevAuth => (
                {...prevAuth, 
                    accessToken: response?.data?.accessToken,
                    username: response?.data?.username
                }))
            
            navigate('/dashboard', {replace: true})
            
        } catch (err){
            if(err?.response && err?.response?.status !== 0){
                setErrorMessage(`Error ${err?.response?.status}: ${err?.response?.data?.error}.`)
            }
            else if(err?.request){
                setErrorMessage('Network Error. Login failed, try again later.')                
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
            onSubmit={(e) => handleSubmit(e, Form)} 
            color='blue.800' 
            w={['90%', '400px']} 
            bgColor='#FFF'
            padding='1em' 
            borderRadius='10px' 
            boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px' 
            placeSelf='center'
            onChange={(e) => handleValidation(e.target)}
        >
            <VStack 
                spacing='10px'
            >
                <Heading>Login</Heading>
                {errorMessage !== '' && <Error message={errorMessage} /> }
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
        <VStack p='1em' gap='1em' >
            <Text as='sub'>
                Log in as&nbsp;
                <Box 
                    cursor='pointer'
                    display='inline-block'
                    fontWeight='bold'
                    color='blue.700'
                    _hover={{
                        color: 'blue.400'
                    }}
                    onClick={async (e) => {
                        const guestCredentials = {
                            email:'guestaccount@guest.com', 
                            password:'GuestAccount@01'
                        }
                        await handleSubmit(e, guestCredentials)
                    }}
                >
                    GUEST ACCOUNT
                </Box>
            </Text>
            <Text as='sub'>
                Need an account?&nbsp; 
                <NavLink to='/signup'
                    className='routerLink'
                >    
                    Register Now
                </NavLink>
            </Text>
        </VStack>        
 
        </Box>
    )
}

export default Login