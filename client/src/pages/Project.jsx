import { useState } from 'react'
import { Spinner, Grid, GridItem, useDisclosure} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import useGetData from '../hooks/useGetData'
import { ProjectInfo } from '../components/Infos/ProjectInfo'
import { TeamTable } from '../components/Tables/TeamTable'
import { IssueTable } from '../components/Tables/IssueTable'
import { IssueTypeChart } from '../components/Charts/IssueTypeChart'
import IssueModal from '../components/Modals/IssueModal'
import { IssueInfo } from '../components/Infos/IssueInfo'

const Project = () => {

    const emptyIssueFields = { 'name': '', author: '', description: '', image: '', imageToAdd: {}, status: 'Open', label: 'Todo', priority: 'Critical', members: [], openingDate: '', closingDate: '', comments: [] }
    const {projectId} = useParams()
    const { responseData : project, setResponseData: setProject, apiError, isLoading } = useGetData(`/projects/${projectId}`)
    const { isOpen: isNewIssueOpen, onOpen: openNewIssueModal, onClose : closeNewIssueModal } = useDisclosure()
    const { isOpen: isEditIssueOpen, onOpen: openEditIssueModal, onClose : closeEditIssue } = useDisclosure()
    const [issueInfo, setIssueInfo ] = useState(emptyIssueFields)
    
    //Find and format issue information based on id for preview and edit
    const handleIssueInformation = (issueId, issueList, openEdit = false) => {
        const foundIssue = issueList?.find(issue => issue._id === issueId)
        console.log(foundIssue)
        if(foundIssue){
            setIssueInfo((() => ({
                ...foundIssue,
                imageToAdd: {}
            })))
        }
    }
    
    return( 
        isLoading ?
            <Grid 
                placeContent='center'
                height='80vh'
            >
                <Spinner
                    thickness='7px'
                    speed='0.7s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
            </Grid> : 
            project &&
        <>
        <Grid templateColumns={['repeat(auto-fit, minmax(250px, 1fr))']} gap='1em'>
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
                <IssueTypeChart 
                    issues= {project?.issues}
                />
            </GridItem>
            <GridItem gridColumn='1/-1' as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                {project.issues ?
                <IssueTable 
                    projectId={project?._id}
                    issues={project?.issues}
                    openNewIssueModal={openNewIssueModal}
                    openEditIssueModal={openEditIssueModal}
                    handleIssueInfo={handleIssueInformation}
                    setProject={setProject}
                /> :
                "No Issue Here"
                }
            </GridItem>

            {
                issueInfo?.name !== '' &&
                <GridItem gridColumn='1/-1' as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                    <IssueInfo 
                        projectId={project?._id}
                        issueInfo={issueInfo}
                        setIssueInfo={setIssueInfo}
                        setProject={setProject}
                    />
                </GridItem> 
            }

        </Grid>
        <IssueModal
            projectMembers={project?.members}
            setProject={setProject}    
            isOpen={isNewIssueOpen}
            onClose={closeNewIssueModal}
            method='post'
            route={`projects/${projectId}/issues`}
        />
        <IssueModal
            projectMembers={project?.members}
            setProject={setProject}
            handleIssueInformation={handleIssueInformation}
            isEdit
            isOpen={isEditIssueOpen}
            onClose={closeEditIssue}
            formValues={issueInfo}
            method='put'
            route={`projects/${projectId}/issues`}
        />
        </> 
        )
}

export default Project