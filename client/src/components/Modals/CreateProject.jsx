import {FormControl, FormHelperText, Input, Button, VStack } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import BasicModal from './BasicModal'
import { useForm } from '../../hooks/useForm'

export function CreateProject({ isOpen, onClose, children }) {
    const [formValidation,isFormValid, handleValidation, 
        handleFormChange, Form, formError, setFormError] = useForm({'name': '', description: '', roles: []})
    return (
        <BasicModal  
            title='Create Project'
            isOpen={isOpen} 
            onClose={onClose} 
        >
            <VStack
                as='form' 
                onSubmit={() => console.log('submit')} 
                color={'blue.800'} padding={'1em'} borderRadius={'10px'} 
                onChange={(e) => handleValidation(e.target)} 
                spacing={'10px'}
            >
                {formError !== '' && <Error message={formError} /> }
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
                    <Textarea  
                        maxLength={500}
                        name='description'
                        value={Form.description}
                        onChange={handleFormChange}
                        placeholder='Describe your project'
                    />           
                    <FormHelperText textAlign='right' color={Form.description.length == 500 && 'red.300'}>
                        {Form.description.length}/500
                    </FormHelperText>
                </FormControl>               
                <Button type='submit' mb='5px' 
                    colorScheme='blue'
                    loadingText='Logging in'
                    isLoading={false} 
                    isDisabled={!isFormValid}
                >
                    Create Project
                </Button>
            </VStack>
        </BasicModal>
    )
}
export default CreateProject
