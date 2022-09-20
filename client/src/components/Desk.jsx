import { Text, Grid, GridItem} from '@chakra-ui/react'
import { TeamTable } from './TeamTable'
import { IssueTable } from './IssueTable'
import { ProjectInfo } from './ProjectInfo'

export const Desk = () => {

    return(
        <Grid templateColumns='repeat(auto-fit, minmax(400px, 1fr))' gap='1em'>
            <GridItem as='section' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>     
                <TeamTable />
            </GridItem>
            <GridItem as='section' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <ProjectInfo />
            </GridItem>
            <GridItem as='section' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
                <IssueTable />
            </GridItem>
            <GridItem as='section' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>
            <Text fontSize='xl'>ISSUES GRAPHIC</Text>
            </GridItem>
        </Grid>
    )
}