import { useState, useEffect, useRef } from 'react'
import { Grid, GridItem, useDisclosure} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { ProjectInfo } from './Infos/ProjectInfo'
import { TeamTable } from './TeamTable'
import { IssueTable } from './IssueTable'
import { IssueGraphic } from '../components/IssueGraphic'
import IssueModal from './Modals/IssueModal'
import useGetData from '../hooks/useGetData'
import useAxiosProtect from '../hooks/useAxiosProtect'
import { IssueInfo } from './Infos/IssueInfo'


export const Project = () => {
    const {projectId} = useParams()
    const axiosProtect = useAxiosProtect()
    const { responseData : project, setResponseData: setProject, apiError, setApiError, isLoading } = useGetData(`/projects/${projectId}`)
    const { isOpen: isNewIssueOpen, onOpen: onNewIssueOpen, onClose : onNewIssueClose } = useDisclosure()
    const { isOpen: isEditIssueOpen, onOpen: onEditIssueOpen, onClose : onEditIssueClose } = useDisclosure()
    const [ issueInfo, setIssueInfo ] = useState({})
    const refWasModalOpen = useRef(false)
    
    const handleIssueInfo = (e) => {
        const issueId = e.target.dataset?.id
        const issues = project?.issues
        const issueInfo = issues.find(issue => issue._id === issueId)
        issueInfo && setIssueInfo(issueInfo)
    }

    useEffect(() => {
        const controller = new AbortController()
        const updateIssues = async () => {
            try{
                setApiError(``)
                const response = await axiosProtect.get(`/projects/${projectId}`, {signal: controller.signal})
                setProject(response.data)
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
        if(refWasModalOpen.current && (!isNewIssueOpen || !isEditIssueOpen)){
            updateIssues()
        }
        // if(hasUpdate){
        //     updateIssues()
        //     setHasUpdate(false)
        // }
        refWasModalOpen.current = isNewIssueOpen || isEditIssueOpen
        return () => {
            controller.abort()
        }
    },[isNewIssueOpen, isEditIssueOpen])
    
    return( 
        isLoading ?
            <div>is Loading</div> 
        :
        <>
        <Grid templateColumns={['repeat(auto-fit, minmax(300px, 1fr))']} gap='1em'>
            <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>     
                <TeamTable 
                    roles={project?.roles}
                />
            </GridItem>
            <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px' >
                <ProjectInfo {...project}/>
            </GridItem>
            <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <IssueGraphic 
                    issueIncrement = {project?.issueIncrement}
                    todoCount = {project?.todoCount}
                    bugCount = {project?.bugCount}
                    featureCount = {project?.featureCount}
                    designCount = {project?.designCount}
                />
            </GridItem>
            <GridItem gridColumn='1/-1' as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <IssueTable 
                    issues={project?.issues}
                    onOpen={onNewIssueOpen}
                    handleIssueInfo={handleIssueInfo}
                />
            </GridItem>

            {
            Object.keys(issueInfo).length > 0 &&   
            <GridItem gridColumn='1/-1' as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <IssueInfo 
                    issueInfo={issueInfo}
                    setIssueInfo={setIssueInfo}
                />
            </GridItem>
            }

        </Grid>
        <IssueModal 
            isOpen={isNewIssueOpen}
            onClose={onNewIssueClose}
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