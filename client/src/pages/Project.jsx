import { useState, useEffect, useRef } from 'react'
import { Grid, GridItem, useDisclosure} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { ProjectInfo } from '../components/Infos/ProjectInfo'
import { TeamTable } from '../components/Tables/TeamTable'
import { IssueTable } from '../components/Tables/IssueTable'
import { IssueGraphic } from '../components/IssueGraphic'
import IssueModal from '../components/Modals/IssueModal'
import useGetData from '../hooks/useGetData'
import useAxiosProtect from '../hooks/useAxiosProtect'
import { IssueInfo } from '../components/Infos/IssueInfo'

export const Project = () => {
    const {projectId} = useParams()
    const axiosProtect = useAxiosProtect()
    const { responseData : project, setResponseData: setProject, apiError, setApiError, isLoading } = useGetData(`/projects/${projectId}`)
    const { isOpen: isNewIssueOpen, onOpen: onNewIssueOpen, onClose : onNewIssueClose } = useDisclosure()
    const { isOpen: isEditIssueOpen, onOpen: onEditIssueOpen, onClose : onEditIssueClose } = useDisclosure()
    const [ issueInfo, setIssueInfo ] = useState({})
    const refWasModalOpen = useRef(false)

    //Gets and format the issue information for preview and edit
    const handleIssueInformation = (issueId) => {
        const issues = project?.issues
        const issueInfo = issues.find(issue => issue._id === issueId)
        if(issueInfo){
            issueInfo.openingDate = issueInfo.openingDate?.split('T')[0] 
            issueInfo.closingDate = issueInfo.closingDate?.split('T')[0] 
            setIssueInfo(issueInfo)
        }
    }
    //Updates issues after modals close
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
                <ProjectInfo 
                    {...project}
                />
            </GridItem>
            <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <IssueGraphic 
                    issueIncrement = {project?.issueIncrement}
                    issues= {project?.issues}
                />
            </GridItem>
            <GridItem gridColumn='1/-1' as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <IssueTable 
                    projectId={project?._id}
                    issues={project?.issues}
                    onOpen={onNewIssueOpen}
                    onEditIssueOpen={onEditIssueOpen}
                    handleIssueInfo={handleIssueInformation}
                    setProject={setProject}
                />
            </GridItem>

            {
                issueInfo && Object.keys(issueInfo).length > 0 ?
                <GridItem gridColumn='1/-1' as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                    <IssueInfo 
                        projectId={project?._id}
                        issueInfo={issueInfo}
                        setIssueInfo={setIssueInfo}
                    />
                </GridItem> :
                <div></div>
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
                closingDate: '',
                comments: [],
            }}
        />
        <IssueModal 
            isEdit
            isOpen={isEditIssueOpen}
            onClose={onEditIssueClose}
            formValues={{...issueInfo, members: []}}
            method='put'
            route={`projects/${projectId}/issues`}
        />
        </>
    
    )
}