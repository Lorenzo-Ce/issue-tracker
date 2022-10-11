import {FormControl, FormHelperText, Textarea, Input, CheckboxGroup, Checkbox, Button, VStack, Stack, Accordion,
    AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import useGetData from '../../hooks/useGetData'
import { useAuthorization } from '../../hooks/useAuthorization'
import useAxiosProtect from '../../hooks/useAxiosProtect'
import BasicModal from './BasicModal'
import { Error } from '../Alerts/Error'
import { Success } from '../Alerts/Success'


export function EditProjectModal({ isOpen, onClose }) {
    const {authorization} = useAuthorization()
    const axiosProtect = useAxiosProtect()
    const {formValidation, isFormValid, handleValidation, handleFormChange, Form, setForm, errorMessage, setErrorMessage } = useForm({'name': '', description: '', members: []})
    const { responseData: usersList } = useGetData('/users')
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const members = usersList.flatMap( ({_id, username}) =>  username !== authorization.username ? 
        [
            <Checkbox key={_id} value={username} checked={Form.members.includes(username)}>
                {username}
            </Checkbox>
        ] : 
        [] 
    )

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMessage('')
        setSuccessMessage('')
        setIsLoading(true)

        try{
            const response = await axiosProtect.put('/projects', JSON.stringify(Form))
            response.status === 201 && setSuccessMessage('Data uploaded to server!')
        } catch (err){
            if(err?.request || err?.request){
                setErrorMessage('Network Error. Submit failed, try again later.')
            }
            else{
                const errorMessage = await err.json()
                console.log(errorMessage)
                setErrorMessage(`Error ${err?.response?.status}: ${errorMessage}`)
            }
        } finally {
            setIsLoading(false)
        }
        
    }

    return (
        <BasicModal title='Create Project'
            isOpen={isOpen} 
            onClose={() => {
                setErrorMessage('')
                setSuccessMessage('')
                onClose()
            }} 
        >
            {errorMessage !== '' && <Error message={errorMessage} /> }
            {successMessage !== '' && <Success message={successMessage} /> }
            <VStack as='form' 
                onSubmit={handleSubmit} 
                color='blue.800' padding='1em' borderRadius='10px' 
                onChange={(e) => handleValidation(e.target)} 
                spacing='10px'
            >
                <FormControl isRequired 
                    id='name' 
                    isInvalid={formValidation.name}
                >
                    <Input type='name'  
                        name='name'
                        placeholder='Project Name'
                        maxLength={30}
                        value={Form.name}
                        onChange={handleFormChange}
                        
                    />             
                </FormControl>
                <FormControl isRequired 
                    id='description' 
                    isInvalid={formValidation.name}
                >
                    <Textarea maxLength={500}
                        name='description'
                        value={Form.description}
                        onChange={handleFormChange}
                        placeholder='Describe your project'
                    />           
                    <FormHelperText textAlign='right' color={Form.description.length == 500 && 'red.300'}>
                        {Form.description.length}/500
                    </FormHelperText>
                </FormControl>     
                <FormControl id='roles'>
                <Accordion allowToggle>
                    <AccordionItem>
                        <h2>
                        <AccordionButton>
                        <FormHelperText flex='1' textAlign='left' fontSize='18px' fontWeight='600'>
                            Add Member ?
                        </FormHelperText>   
                        <AccordionIcon />
                        </AccordionButton>
                        </h2>
                        <AccordionPanel>
                            <CheckboxGroup colorScheme='blue' 
                                onChange={(members) => setForm(prev => ({...prev, members}))}
                            >
                                <Stack spacing='1' direction='column'>
                                    {members.length > 0 ? 
                                    members : 
                                    "There are no members to be added"}
                                </Stack>
                            </CheckboxGroup>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>                  
                </FormControl>          
                <Button type='submit' mb='5px' 
                    colorScheme='blue'
                    loadingText='Submitting'
                    isLoading={isLoading} 
                    isDisabled={!isFormValid}
                >
                    Submit Project
                </Button>
            </VStack>
        </BasicModal>
    )
}
export default CreateProjectModal