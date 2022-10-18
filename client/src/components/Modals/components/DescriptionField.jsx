import {FormControl, FormErrorMessage, FormHelperText, Textarea, Stack } from '@chakra-ui/react'

export const DescriptionField = ({validateDescription, formDescription, handleFormChange, placeholder}) => {  
    const descriptionLength = formDescription.length
    return(
        <FormControl isRequired 
        id='description' 
        isInvalid={validateDescription}
        >
            <Textarea maxLength={500}
                name='description'
                value={formDescription}
                onChange={handleFormChange}
                placeholder={`Describe your ${placeholder}`}
            />    
            <Stack direction='row' justify='space-between' align='baseline'>  
                <FormErrorMessage>{placeholder} Description is required</FormErrorMessage>              
                <FormHelperText textAlign='right' color={descriptionLength == 500 && 'red.300'}>
                    {descriptionLength}/500
                </FormHelperText>
            </Stack>
        </FormControl>
    )
}