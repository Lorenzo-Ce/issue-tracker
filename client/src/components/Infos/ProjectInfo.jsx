import { Heading, Text, Box } from "@chakra-ui/react"
import { REGX_DATETIME } from "../../utils/regex"
import { Label } from "../Alerts/Label"

export const ProjectInfo = ({name, status, description, startDate, endDate}) => {
    
    return(
    <>
        <Heading fontSize='xl' fontWeight='bold' mb='0.5em'>{name}</Heading>
        <span>
                <p> {description} </p>
        </span>
        <Box display='flex' gap='1em' flexWrap='wrap' mt='0.5em'>
        <Box>
            <Text fontWeight='bold' fontSize='13px' textTransform='uppercase'>Status</Text> 
            <Label padding='0.1em 0.5em'>{status}</Label> 
        </Box>
        <Box>
            <Text fontWeight='bold' fontSize='13px' textTransform='uppercase'>Opening Date</Text>  
            {startDate ? startDate.replace(REGX_DATETIME, '$3-$2-$1') : ' Not Defined'}
        </Box>
        <Box>
            <Text fontWeight='bold' fontSize='13px' textTransform='uppercase'>Deadline </Text>
            {endDate ? endDate.replace(REGX_DATETIME, '$3-$2-$1') : ' Not Defined' }
        </Box>
        </Box>
    </>
    )
}