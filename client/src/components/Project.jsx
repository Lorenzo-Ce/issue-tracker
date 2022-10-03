import { useState, useEffect } from 'react'
import { Grid, GridItem} from '@chakra-ui/react'
import { useOutletContext, useParams } from 'react-router-dom'
import { ProjectInfo } from './ProjectInfo'
import { TeamTable } from './TeamTable'
import { IssueTable } from './IssueTable'
import { IssueGraphic } from '../components/IssueGraphic'

export const Project = () => {
    const {projectId} = useParams()
    const [projects] = useOutletContext()
    const [currentProject, setCurrentProject] = useState({})
    useEffect(() =>{
        const hasProject = projects?.length > 0
        if(hasProject){
            const foundProject = projects.find(project => project._id === projectId)
            setCurrentProject(foundProject)
        }  
    },[projects])
    
    return( 
        <Grid templateColumns={['repeat(auto-fit, minmax(400px, 1fr))']} gap='1em'>
            <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>     
                <TeamTable {...currentProject}/>
            </GridItem>
            <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <ProjectInfo {...currentProject}/>
            </GridItem>
            <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <IssueTable {...currentProject}/>
            </GridItem>
            <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <IssueGraphic {...currentProject}/>
            </GridItem>
        </Grid>
    )
}