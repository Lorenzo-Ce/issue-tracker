import {FormControl, FormErrorMessage, Input } from '@chakra-ui/react'

export const NameField = ({validateName, formName, handleFormChange, placeholder}) => {  
    return(
        <FormControl isRequired 
            id='name' 
            isInvalid={validateName}
        >
            <Input type='text'  
                name='name'
                placeholder={`${placeholder} Name`}
                maxLength={30}
                value={formName}
                onChange={handleFormChange}
                
            />             
            <FormErrorMessage>{placeholder} name is required</FormErrorMessage>
        </FormControl>
    )
}