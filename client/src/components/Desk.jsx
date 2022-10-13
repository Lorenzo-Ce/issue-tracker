import { Box, Heading, Spacer, Table, Thead, Tbody, Button, Tr, Th, Td, TableContainer, useDisclosure } from '@chakra-ui/react'
import React, { useState, useEffect, useRef } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import useAxiosProtect from '../hooks/useAxiosProtect'
import { Error } from './Alerts/Error'
import { Label } from './Label'
const ProjectModal = React.lazy(() => import('./Modals/ProjectModal'))

export const Desk = () => {
    const [projects, setProjects, apiError, setApiError, isLoading]= useOutletContext()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
    const [projectEdit, setProjectEdit] = useState({name:'', description:'', status:'', members:[], startDate:'', endDate:''})
    const axiosProtect = useAxiosProtect()
    const refPreviousIsOpen = useRef(isOpen)
    const refPreviousIsEditOpen = useRef(isEditOpen)

    const handleOpenModal = (id) => {
        const {name, description, status, members, startDate, endDate} = projects.find(project => project._id === id)
        const formatStartDate = startDate.split('T')[0]
        const formatEndDate = endDate.split('T')[0]
        setProjectEdit({id, name, description, status, members, startDate: formatStartDate, endDate: formatEndDate})
    }

    const ProjectList = projects.length > 0 && projects.map(project => {
        const members = project.members.toString().replace(/[,]/g, ', ')
        const id = project._id
        return (
            <Tr key={id}>
                <Td color='blue.600'>
                    <Link to={id}>{project.name}</Link> 
                </Td>
                <Td>{members}</Td>
                <Td><Label>{project.status}</Label></Td>
                <Td color='white' display='flex' justifyContent='flex-end' pr='0'>
                    <Button cursor colorScheme='blue'
                        onClick={() => {
                            handleOpenModal(id)
                            onEditOpen()
                        }}
                    >
                        Edit
                    </Button>
                </Td>
            </Tr>
        )
    })
    useEffect(() => {
        const getProjects = async () => {
            try{
                setApiError(``)
                const response = await axiosProtect.get('/projects')
                setProjects(response.data)
            }catch(err){
                if(err?.response){
                    const error = err.response 
                    setApiError(`Error ${error?.status}: ${error?.statusText} ${error?.errorText}`)
                } else setApiError(`Network Error. Try to refresh or try again later.'`)  
            }
        }
        if(refPreviousIsOpen.current && !isOpen){
            getProjects()
        }
        if(refPreviousIsEditOpen.current && !isEditOpen){
            getProjects()
        }
        refPreviousIsOpen.current = isOpen
        refPreviousIsEditOpen.current = isEditOpen
    },[isOpen, isEditOpen])

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
                        <Th>Team Members</Th>
                        <Th textAlign='center'>Status</Th>
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
            <ProjectModal 
                isOpen={isOpen} 
                onClose={onClose} 
                method='post'
            />
            <ProjectModal 
                isOpen={isEditOpen} 
                onClose={onEditClose} 
                formValues={projectEdit}
                method='put' 
                route={`projects/${projectEdit.id}`}
                isEdit
            />
        </>
    )
}
