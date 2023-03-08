import { Box, Flex, Grid, GridItem, useDisclosure } from '@chakra-ui/react'
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
        <Grid gap='1em' >
           <GridItem
                overflowX='auto' 
                gridColumn='1/-1'
                as='section' bg='#FFF' 
                borderRadius='10px' p='1em' 
                boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px' 
            >
                {
                    apiError !== '' ? 
                    <Error message={apiError} /> :
                    <ProjectTable 
                        projects={projects} 
                        onNewProjectOpen={onNewProjectOpen}
                        handleOpenModal={handleOpenModal} 
                        onEditOpen={onEditOpen}
                        handleDelete={handleDelete}
                        isDeleting={isDeleting}
                    />
                   
            }
             </GridItem>
        </Grid>
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
