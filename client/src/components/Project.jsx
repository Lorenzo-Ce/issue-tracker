import { useState, useEffect } from 'react'
import { Grid, GridItem, useDisclosure} from '@chakra-ui/react'
import { useOutletContext, useParams } from 'react-router-dom'
import { ProjectInfo } from './ProjectInfo'
import { TeamTable } from './TeamTable'
import { IssueTable } from './IssueTable'
import { IssueGraphic } from '../components/IssueGraphic'
import useGetData from '../hooks/useGetData'
import IssueModal from './Modals/IssueModal'

export const Project = () => {
    const {projectId} = useParams()
    const [projects] = useOutletContext()
    const [currentProject, setCurrentProject] = useState({})
    const {responseData: projectData} = useGetData(`/projects/${projectId}`)
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() =>{
        const hasProject = projects?.length > 0
        if(hasProject){
            const foundProject = projects.find(project => project._id === projectId)
            setCurrentProject(foundProject)
        } else{
            setCurrentProject(projectData)
        }  
    },[projects])
    
    return( 
        <>
        <Grid templateColumns={['repeat(auto-fit, minmax(300px, 1fr))']} gap='1em'>
            <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>     
                <TeamTable {...currentProject}/>
            </GridItem>
            <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <ProjectInfo {...currentProject}/>
            </GridItem>
            <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <IssueGraphic {...currentProject}/>
            </GridItem>
            <GridItem gridColumn='1/-1' as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <IssueTable 
                    currentProject={currentProject}
                    onOpen={onOpen}
                />
            </GridItem>
        </Grid>
        <IssueModal 
            isOpen={isOpen}
            onClose={onClose}
            method='post'
            route={`projects/${projectId}/issues`}
            formValues= {{
                'name': '', 
                description: '',
                image: {}, 
                status: 'Open',
                label: 'Todo',
                priority: 'Critical', 
                members: [],
                openingDate: '',
                comments: [],
            }}
        />       
        </>
    )
}