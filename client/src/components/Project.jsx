import { useState, useEffect, useRef } from 'react'
import { Grid, GridItem} from '@chakra-ui/react'
import { useOutletContext, useParams } from 'react-router-dom'
import { TeamTable } from './TeamTable'
import { IssueTable } from './IssueTable'
import { ProjectInfo } from './ProjectInfo'
import { IssueGraphic } from '../components/IssueGraphic'

export const Project = () => {
    const {projectId} = useParams()
    const [isLoading, projects] = useOutletContext()
    const isEffectRun = useRef(false)
    const [foundProject, setFoundProject] = useState(()=>{
        console.log(projects.length)
        return projects.length > 0 ?
        projects.find(project => project._id === projectId) :
        JSON.parse(localStorage.getItem(`${projectId}`))
    })

    useEffect(() => { 
            if(!foundProject){
                const projectStored = JSON.parse(localStorage.getItem(`${projectId}`))
                setFoundProject(projectStored)
            } else{
                localStorage.setItem(`${projectId}`, JSON.stringify(foundProject))
            }
    },[])
    
    return( 
        <Grid templateColumns={['repeat(auto-fit, minmax(400px, 1fr))']} gap='1em'>
            <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>     
                <TeamTable members={foundProject?.roles}/>
            </GridItem>
            <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <ProjectInfo project={foundProject}/>
            </GridItem>
            <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <IssueTable issues={foundProject?.issues}/>
            </GridItem>
            <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <IssueGraphic issues={foundProject?.issues}/>
            </GridItem>
        </Grid> 
    )
}