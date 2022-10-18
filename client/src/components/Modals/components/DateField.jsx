import {FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react'

export const DateField = ({id, validateDate, formDate, handleFormChange, title}) => {  
    return(
        <FormControl 
            isRequired 
            id={id} 
            isInvalid={validateDate}
        >
            <FormLabel>
                {title} Date
            </FormLabel>
            <Input 
                type='date'  
                name={id}
                value={formDate}
                onChange={handleFormChange}
            />  
            <FormErrorMessage>
                Target can't be set previous of the previous date.
            </FormErrorMessage>   
        </FormControl>                          
)
}