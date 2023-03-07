import { Box, Heading, Spacer, Button, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useDeleteData from '../hooks/useDeleteData'
import { Error } from '../components/Alerts/Error'
import ProjectModal from '../components/Modals/ProjectModal'
import { ProjectTable } from '../components/Tables/ProjectTable'
import useGetData from '../hooks/useGetData'

export const Desk = () => {
    const {responseData: projects, setResponseData: setProjects, apiError, setApiError, isLoading} = useGetData('/projects')
    const { isOpen: isNewProjectOpen, onOpen: onNewProjectOpen, onClose : onNewProjectClose } = useDisclosure()
    const { isOpen: isEditProjectOpen, onOpen: onEditOpen, onClose: onEditProjectClose } = useDisclosure()
    const [projectEdit, setProjectEdit] = useState({name:'', description:'', status:'', members:[], startDate:'', endDate:''})
    const {handleDelete, remainingData, deleteMessage, isDeleting} = useDeleteData('/projects/')

    const handleOpenModal = (id, projectsList) => {
        const foundProject = projectsList.find(project => project._id === id)
        if(foundProject){         
            const {name, description, status, members, startDate, endDate} = foundProject
            setProjectEdit({id, name, description, status, members, startDate, endDate})
        }
    }

    useEffect(() => {
        if(deleteMessage !== ''){
            if(deleteMessage === 'Data deleted'){
                setProjects(remainingData)
            } else {
                setApiError(deleteMessage)
            }
        }
    }, [isDeleting])

    return(
        <>
        { isLoading ? 
        <Box h='80%'>Loading</Box> : 
        <Box as='section' maxWidth='900px' m='0 1em' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
            <Box mb='0.5em' display='flex' flexDirection='row' alignItems='center'>
                <Heading as='h3' color='blue.800' fontSize='1rem' textTransform='uppercase'>
                    Projects
                </Heading>
                <Spacer/>
                <Button size='sm'
                    colorScheme='blue'
                    onClick={onNewProjectOpen}
                >
                    Add Project
                </Button>
            </Box>
            {
                apiError !== '' ? 
                <Error message={apiError} /> :
                <ProjectTable 
                    projects={projects} 
                    handleOpenModal={handleOpenModal} 
                    onEditOpen={onEditOpen}
                    handleDelete={handleDelete}
                    isDeleting={isDeleting}
            />
            }
        </Box> 
        }
            <ProjectModal 
                setProjects ={setProjects}
                isOpen={isNewProjectOpen} 
                onClose={onNewProjectClose} 
                method='post'
            />
            <ProjectModal 
                setProjects ={setProjects}
                isOpen={isEditProjectOpen} 
                onClose={onEditProjectClose} 
                formValues={projectEdit}
                method='put' 
                route={`projects/${projectEdit.id}`}
                isEdit
            />
        </>
    )
}
