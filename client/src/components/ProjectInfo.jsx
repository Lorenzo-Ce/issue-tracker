import { Heading, Text, Box } from "@chakra-ui/react"

export const ProjectInfo = ({name, status, description, openingDate, closingDate}) => {
    return(
    <>
        <Heading fontSize='xl' fontWeight='bold' mb='0.5em'>{name}</Heading>
        <span>
            <Text fontWeight='bold'>Description:</Text>
                <p> {description} </p>
        </span>
        <Box display='flex'>
            <Text fontWeight='bold' me='5px'>Status:</Text> 
            {status}
        </Box>
        <Box display='flex'>
            <Text fontWeight='bold' me='5px'>Opening Date:</Text>  
            {openingDate ? openingDate : ' To Be Defined'}
        </Box>
        <Box display='flex'>
            <Text fontWeight='bold' me='5px'>Deadline: </Text>
            {closingDate ? closingDate : ' To Be Defined' }
        </Box>
    </>
    )
}