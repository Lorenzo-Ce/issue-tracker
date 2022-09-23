import { Heading, Text } from "@chakra-ui/react"
import { Project } from "./Project"

export const ProjectInfo = ({project}) => {
    return(
    <>
        <Heading fontSize='xl' fontWeight='bold' mb='0.5em'>{project?.name}</Heading>
        <span>
            <Text fontWeight='bold'>Description:</Text>
                <p>
                {project?.description}
                </p>
        </span>
        <span>
            <Text fontWeight='bold'>Status:</Text> {project?.status}
        </span>
        <span>
            <Text fontWeight='bold'>Opening Date:</Text> 
            {project?.openingDate ? project?.openingDate : 'To Be Defined'}
        </span>
        <span>
            <Text fontWeight='bold'>Deadline:</Text>
            {project?.closingDate ? project?.closingDate : 'To Be Defined' }
        </span>
    </>
    )
}