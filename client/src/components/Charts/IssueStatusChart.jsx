import { Heading, Box, List, ListItem, Flex } from "@chakra-ui/react"
import { PieChart } from 'react-minimal-pie-chart';
import { countIssuesByStatus } from "./utils/countIssuesByStatus";


export const IssueStatusChart = ({issues}) => {
    
    const [openCount, pausedCount, closedCount] = countIssuesByStatus(issues)
    const issuesCount = issues && issues.length

    const dataInfo = [
        { title: 'Open', value: openCount, color: '#5B9F2D' },    
        { title: 'Paused', value: pausedCount, color: '#ffb703' },
        { title: 'Closed', value: closedCount, color: '#F32013' },
    ]

    return(
    <>
    <Heading mb='1em' fontSize='l' fontWeight='bold'>ISSUES BY STATUS</Heading>
    <Flex justifyContent='center' alignItems='center' gap='1em'>
        {
        issuesCount > 0  ?
        <>
            <PieChart 
                style={{ height: '160px', width: '180px' }}
                data={dataInfo}
                animate 
                animationDuration={1000}
                label={({ dataEntry }) => {
                    const result = dataEntry.value /issuesCount * 100
                    return dataEntry.value > 0 ? `${ result < 100 ? result.toFixed(1) : result } %` : ''}}
                labelStyle={{
                    fontSize: '10px',
                    opacity: '0.75',
                    fill: '#FFF'
                }}
                labelPosition={issuesCount > 1 ? 60 : 0}
            />
            
            <List spacing={3}>
                <ListItem display='flex' alignItems='center'>
                    <Box boxSize='10px' 
                        borderRadius='100%' 
                        backgroundColor='#5B9F2D' 
                        mr='5px'
                    />
                    Open
                </ListItem>
                <ListItem display='flex' alignItems='center'>
                    <Box boxSize='10px' 
                        borderRadius='100%' 
                        backgroundColor='#ffb703' 
                        mr='5px'
                    />
                    Paused
                </ListItem>
                <ListItem display='flex' alignItems='center'>
                    <Box boxSize='10px' 
                        borderRadius='100%' 
                        backgroundColor='#F32013' 
                        mr='5px'
                    />
                    Closed
                </ListItem>
            </List>
        </> :
        <PieChart 
            style={{ height: '160px', width: '180px' }}
            data={ [{value: 100, color: '#2b6cb0' }] }
            totalValue={100}
            animate 
            animationDuration={500}
            label={({ dataEntry }) => '0 issues'}
            labelStyle={{
                fontSize: '10px',
                opacity: '0.75',
                fill: '#FFF'
            }}
            labelPosition={0}
        />
        }
    </Flex>
    </>
    )
}