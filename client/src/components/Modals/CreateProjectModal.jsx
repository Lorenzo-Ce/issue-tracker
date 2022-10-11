import {FormControl, FormLabel, FormHelperText, FormErrorMessage, Radio, RadioGroup, Textarea, Input, CheckboxGroup, Checkbox, Button, VStack, Stack, Accordion,
    AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import { useAuthorization } from '../../hooks/useAuthorization'
import useGetData from '../../hooks/useGetData'
import useSubmitData from '../../hooks/useSubmitData'
import { useForm } from '../../hooks/useForm'
import BasicModal from './BasicModal'
import { Error } from '../Alerts/Error'
import { Success } from '../Alerts/Success'
import { initialFormValues } from '../../utils/initializeForm'

export function CreateProjectModal({ isOpen, onClose, formValues = initialFormValues
    }) {
    const {authorization} = useAuthorization()
    const {responseData: usersList } = useGetData('/users')
    const {handleSubmit, resetMessage, successMessage, submitError, isLoadingSubmit } = useSubmitData('/projects', 'post')
    const {formValidation, isFormValid, handleValidation, handleFormChange, Form, setForm } = useForm(() => formValues)
    
    
    const members = usersList.flatMap( ({_id, username}) =>  username !== authorization.username ? 
        [
            <Checkbox key={_id} value={username} checked={Form.members.includes(username)}>
                {username}
            </Checkbox>
        ] : 
        [] 
    )
    return (
    <BasicModal title='Create Project'
        isOpen={isOpen} 
        onClose={() => {
            resetMessage()
            onClose()
        }} 
    >
        {submitError !== '' && <Error message={submitError} /> }
        {successMessage !== '' && <Success message={successMessage} /> }
        <VStack as='form' 
            onSubmit={(e) => handleSubmit(e, Form)} 
            color='blue.800' padding='1em' borderRadius='10px' 
            onChange={(e) => handleValidation(e.target)} 
            spacing='10px'
        >
            <FormControl isRequired 
                id='name' 
                isInvalid={formValidation.name}
            >
                <Input type='text'  
                    name='name'
                    placeholder='Project Name'
                    maxLength={30}
                    value={Form.name}
                    onChange={handleFormChange}
                    
                />             
                <FormErrorMessage>Project Name is required</FormErrorMessage>
            </FormControl>
            <FormControl isRequired 
                id='description' 
                isInvalid={formValidation.description}
            >
                <Textarea maxLength={500}
                    name='description'
                    value={Form.description}
                    onChange={handleFormChange}
                    placeholder='Describe your project'
                />    
                <Stack direction='row' justify='space-between' align='baseline'>  
                    <FormErrorMessage>Project Description is required</FormErrorMessage>              
                    <FormHelperText textAlign='right' color={Form.description.length == 500 && 'red.300'}>
                        {Form.description.length}/500
                    </FormHelperText>
                </Stack>
            </FormControl> 
            <FormControl as='fieldset'
                isRequired
                id='status'
                onChange={handleFormChange}
            >
            <FormLabel as='legend'>Status</FormLabel>
            <RadioGroup
                name='status'
                value={Form.status}
            >
                <Stack direction='row' spacing='1em'>
                <Radio checked={Form.status === 'Open'} value='Open'>Open</Radio>
                <Radio checked={Form.status === 'Paused'} value='Paused'>Paused</Radio>
                <Radio checked={Form.status === 'Closed'} value='Closed'>Closed</Radio>
                </Stack>
            </RadioGroup>
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
            <FormControl isRequired 
                id='startDate' 
                isInvalid={formValidation.startDate}
            >
                <FormLabel>Starting Date</FormLabel>
                <Input type='date'  
                    name='startDate'
                    value={Form.startDate}
                    onChange={handleFormChange}
                />     
            </FormControl>                          
            <FormControl isRequired 
                id='endDate' 
                isInvalid={formValidation.endDate}
            >
                <FormLabel>Target Date</FormLabel>
                <Input type='date'  
                    name='endDate'
                    value={Form.endDate}
                    onChange={handleFormChange}
                />    
                 <FormErrorMessage>Target date must be set after Starting date</FormErrorMessage> 
            </FormControl>
            <Button type='submit' mb='5px' 
                colorScheme='blue'
                loadingText='Submitting'
                isLoading={isLoadingSubmit} 
                isDisabled={!isFormValid}
            >
                Submit Project
            </Button>
        </VStack>
    </BasicModal>
    )
}
export default CreateProjectModal
