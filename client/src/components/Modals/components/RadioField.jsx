import {FormControl, FormLabel, RadioGroup, Radio, Stack } from '@chakra-ui/react'

export const RadioField = ({title, id, fields = [], formStatus, handleFormChange}) => {  
    
    const fieldList = fields.map((field, index) => 
        <Radio
            value={field} 
            checked={formStatus === `${field}`} 
            key={`${field}${index}`}
        >
            {field}
        </Radio>
        )

    return(
        <FormControl as='fieldset'
            isRequired
            id={id}
            onChange={handleFormChange}
        >
            <FormLabel as='legend'>{title}</FormLabel>
            <RadioGroup
                name={id}
                value={formStatus}
            >
                <Stack direction='row' spacing='1em'>
                    {fieldList}
                </Stack>
            </RadioGroup>
        </FormControl>
    )
}