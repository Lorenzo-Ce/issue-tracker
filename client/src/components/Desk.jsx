import { Box, Heading, Spacer, Table, Thead, Tbody, Button, Tr, Th, Td, TableContainer} from '@chakra-ui/react'
import { Link, useOutletContext } from 'react-router-dom'

export const Desk = () => {
    const [isLoading, projects, issues] = useOutletContext()
    const ProjectList = projects.map(project => {
            const members = project.members.toString().replace(/[,]/g, ', ')
            const id = project._id
            return (
            <Tr key={id}>
                <Td color='blue.600'>
                    <Link to={id}>{`${project.name}`}</Link> </Td>
                <Td>{`${project.description}`} </Td>
                <Td>{`${members}`}</Td>
                <Td><a href='#'>More Info</a></Td>
            </Tr>)
        }
    )
    return(
        <>
        { isLoading ? 
        <Box h='80%'>Loading</Box> : 
            <Box as='section' m='0 1em' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
            <Box mb='0.5em' display='flex' flexDirection='row' alignItems='center'>
                <Heading as='h3' color='blue.800' fontSize='1rem' textTransform='uppercase'>
                    Projects
                </Heading>
            <Spacer/>
            <Button size='sm'
                    colorScheme='blue'
                    onClick={() => console.log('open new window and create project')}
            >
                    Add Project
                </Button>
            </Box>

             <TableContainer>
                <Table variant='simple' size='sm'>
                    <Thead>
                    <Tr backgroundColor='#ededed'>
                        <Th>Project</Th>
                        <Th>Description</Th>
                        <Th>Team Members</Th>
                        <Th width='min-content'></Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {ProjectList}
                    </Tbody>
                </Table>
            </TableContainer> 
        </Box> 
        }
        </>
    )
}
