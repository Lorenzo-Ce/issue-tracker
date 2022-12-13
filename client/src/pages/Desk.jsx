import { Box, Heading, Spacer, Button, useDisclosure } from '@chakra-ui/react'
import React, { useState, useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import useAxiosProtect from '../hooks/useAxiosProtect'
import useDeleteData from '../hooks/useDeleteData'
import { Error } from '../components/Alerts/Error'
import ProjectModal from '../components/Modals/ProjectModal'
import { ProjectTable } from '../components/Tables/ProjectTable'

export const Desk = () => {
    const [projects, setProjects, apiError, setApiError, isLoading]= useOutletContext()
    const { isOpen: isNewProjectOpen, onOpen: onNewProjectOpen, onClose : onNewProjectClose } = useDisclosure()
    const { isOpen: isEditProjectOpen, onOpen: onEditOpen, onClose: onEditProjectClose } = useDisclosure()
    const [projectEdit, setProjectEdit] = useState({name:'', description:'', status:'', members:[], startDate:'', endDate:''})
    const [hasUpdate, setHasUpdate] = useState(false)
    const axiosProtect = useAxiosProtect()
    const {handleDelete, isDeleting} = useDeleteData('/projects/')
    const refWasModalOpen = useRef(false)

    const handleOpenModal = (id) => {
        const {name, description, status, members, startDate, endDate} = projects.find(project => project._id === id)
        const formatStartDate = startDate.split('T')[0]
        const formatEndDate = endDate.split('T')[0]
        setProjectEdit({id, name, description, status, members, startDate: formatStartDate, endDate: formatEndDate})
    }

    useEffect(() => {
        const updateProjects = async () => {
            try{
                setApiError(``)
                const response = await axiosProtect.get('/projects')
                setProjects(response.data)
            }catch(err){ 
                if(err?.request){
                    setApiError('Network Error. Submit failed, try again later.')
                }
                else if (err?.response){
                    setApiError(`Error ${err?.response?.status}: ${err.response?.statusText} ${err?.response?.data?.error}`)
                }
                else{
                    setApiError(`Ops Something went wrong, refresh the page or try again later`)
                }
            } 
        }
        if(refWasModalOpen.current && (!isEditProjectOpen || !isNewProjectOpen)){
            updateProjects()
        }
        if(hasUpdate){
            updateProjects()
            setHasUpdate(false)
        }
        refWasModalOpen.current = isNewProjectOpen || isEditProjectOpen
        
    },[isNewProjectOpen, isEditProjectOpen, hasUpdate])

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
                    setHasUpdate={setHasUpdate}
            />
            }
        </Box> 
        }
            <ProjectModal 
                isOpen={isNewProjectOpen} 
                onClose={onNewProjectClose} 
                method='post'
            />
            <ProjectModal 
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
