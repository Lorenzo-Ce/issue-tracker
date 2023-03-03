import { Heading, Box, List, ListItem, Flex } from "@chakra-ui/react"
import { PieChart } from 'react-minimal-pie-chart';
import { countIssuesByPriority } from "./utils/countIssuesByPriority";


export const IssuePriorityChart = ({issues}) => {
    
    const [criticalCount, importantCount, normalCount, lowCount]
    = countIssuesByPriority(issues)
    const issuesCount = issues && issues.length

    const dataInfo = [
        { title: 'Normal', value: normalCount, color: '#5B9F2D' },
        { title: 'Low', value: lowCount, color: '#219ebc' },
        { title: 'Critical', value: criticalCount, color: '#F32013' },
        { title: 'Important', value: importantCount, color: '#ffb703' },
    ]

    return(
    <>
    <Heading mb='1em' fontSize='l' fontWeight='bold'>ISSUES BY PRIORITY</Heading>
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
                        backgroundColor='#F32013' 
                        mr='5px'
                    />
                    Critical
                </ListItem>
                <ListItem display='flex' alignItems='center'>
                    <Box boxSize='10px' 
                        borderRadius='100%' 
                        backgroundColor='#ffb703'
                        mr='5px'
                    />
                    Important
                </ListItem>
                <ListItem display='flex' alignItems='center'>
                    <Box boxSize='10px' 
                        borderRadius='100%' 
                        backgroundColor='#5B9F2D' 
                        mr='5px'
                    />
                    Normal
                </ListItem>
                <ListItem display='flex' alignItems='center'>
                    <Box boxSize='10px' 
                        borderRadius='100%' 
                        backgroundColor='#219ebc' 
                        mr='5px'
                    />
                    Low
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