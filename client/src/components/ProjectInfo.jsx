import { Heading, Text, Box } from "@chakra-ui/react"
import { REGX_DATE } from "../utils/regex"

export const ProjectInfo = ({name, status, description, startDate, endDate}) => {
    
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
            {startDate ? startDate.replace(REGX_DATE, '$3-$2-$1') : ' Not Defined'}
        </Box>
        <Box display='flex'>
            <Text fontWeight='bold' me='5px'>Deadline: </Text>
            {endDate ? endDate.replace(REGX_DATE, '$3-$2-$1') : ' Not Defined' }
        </Box>
    </>
    )
}