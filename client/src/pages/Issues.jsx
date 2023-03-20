import { useMemo } from 'react'
import { Box, Heading, Grid, GridItem, Spinner } from '@chakra-ui/react'
import useGetData from '../hooks/useGetData'
import { IssueUserTable } from '../components/Tables/IssueUserTable'
import { IssueTypeChart } from '../components/Charts/IssueTypeChart'
import { IssueStatusChart } from '../components/Charts/IssueStatusChart'
import { IssuePriorityChart } from '../components/Charts/IssuePriorityChart'
import { LoadingSpinner } from '../components/LoadingSpinner'

export function Issues() {
    const {responseData: issueList, isLoading} = useGetData('/projects/issues')
    
    const issuesFormat = useMemo(() =>
        issueList ? 
        issueList :
        []
        , [isLoading]
    )

    return(
        <Box width='100%' p='1em 1em'>
            <Heading fontSize='2xl' color='blue.800' mb='1em'>
                MY ISSUES 
            </Heading>
            {   
                isLoading ?
                <LoadingSpinner />  :
                <Box>
                    <Grid templateColumns={['repeat(auto-fit, minmax(250px, 1fr))']} gap='0.5em' mb='1em'>
                    <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                        <IssueTypeChart issues={issuesFormat}/>
                    </GridItem>                            
                    <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                        <IssueStatusChart issues={issuesFormat}/>
                    </GridItem>                            
                    <GridItem as='section' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                        <IssuePriorityChart issues={issuesFormat}/>
                    </GridItem>                            
                    <GridItem as='section' gridColumn='-1/1' bg='#FFF' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                        <IssueUserTable issues={issuesFormat} />
                    </GridItem>                            
                    </Grid>
                </Box>
            }
        </Box>
    )
}

export default Issues
