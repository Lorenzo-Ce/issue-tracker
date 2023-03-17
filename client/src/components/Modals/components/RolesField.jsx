import {Box, FormControl, FormHelperText, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, CheckboxGroup, Stack } from '@chakra-ui/react'

export const RolesField = ({members=[], formMembers, setForm, title}) => {  
    return(
        <FormControl id='roles'>
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                    <AccordionButton>
                    <FormHelperText flex='1' textAlign='left' fontSize='18px' fontWeight='600'>
                    {title}
                    </FormHelperText>   
                    <AccordionIcon />
                    </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        <CheckboxGroup colorScheme='blue' 
                            onChange={(members) => setForm(prev => ({...prev, members}))}
                            value={formMembers}
                        >
                            <Stack spacing='1' direction='column'>
                                {members.length > 0 ? 
                                members : 
                                <Box>No members to be added. Add members to the project first.</Box>
                                }
                            </Stack>
                        </CheckboxGroup>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>                  
        </FormControl>                          
    )
}