import { Box, Heading, Spacer, Table, Thead, Tbody, Button, Tr, Th, Td, TableContainer, useDisclosure } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import CreateProjectModal from './Modals/CreateProjectModal'
import { Label } from './Label'
import {Error} from './Alerts/Error'
import useAxiosProtect from '../hooks/useAxiosProtect'


export const Desk = () => {
    const [projects, setProjects, apiError, setApiError, isLoading]= useOutletContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const axiosProtect = useAxiosProtect()
    const refPreviousIsOpen = useRef(isOpen)

    const ProjectList = projects.map(project => {
        const members = project.members.toString().replace(/[,]/g, ', ')
        const id = project._id
        return (
            <Tr key={id}>
                <Td color='blue.600'>
                    <Link to={id}>{project.name}</Link> </Td>
                <Td>{project.description} </Td>
                <Td>{members}</Td>
                <Td color='white'>
                    <Label>Edit</Label>
                </Td>
            </Tr>
        )
    })
    useEffect(() => {
        console.log(isOpen)
        const getProjects = async () => {
            try{
                setApiError(``)
                const response = await axiosProtect.get('/projects')
                setProjects(response.data)
            }catch(err){
                if(err?.response){
                    const error = err.response 
                    setApiError(`Error ${error?.status}: ${error?.statusText} ${error?.errorText}`)
                } else if(err?.request){
                    setApiError(`Network Error. Try to refresh or try again later.'`)
                }     
            }
        }
        if(refPreviousIsOpen.current && !isOpen){
            getProjects()
            console.log('update projects')                        
        }
        refPreviousIsOpen.current = isOpen

    },[isOpen])

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
                    onClick={onOpen}
                >
                        Add Project
                </Button>
            </Box>
            {apiError !== '' ? 
            <Error message={apiError} /> :
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
            </TableContainer>} 
        </Box> 
        }
            <CreateProjectModal isOpen={isOpen} onClose={onClose} />

        </>
    )
}
