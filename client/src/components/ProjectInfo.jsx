import { Heading, Text } from "@chakra-ui/react"

export const ProjectInfo = ({name, status, description, openingDate, closingDate}) => {
    return(
    <>
        <Heading fontSize='xl' fontWeight='bold' mb='0.5em'>{name}</Heading>
        <span>
            <Text fontWeight='bold'>Description:</Text>
                <p> {description} </p>
        </span>
        <span>
            <Text fontWeight='bold'>Status:</Text> {status}
        </span>
        <span>
            <Text fontWeight='bold'>Opening Date:</Text> 
            {openingDate ? openingDate : 'To Be Defined'}
        </span>
        <span>
            <Text fontWeight='bold'>Deadline:</Text>
            {closingDate ? closingDate : 'To Be Defined' }
        </span>
    </>
    )
}