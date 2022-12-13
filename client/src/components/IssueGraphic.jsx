import { Heading, Box, List, ListItem, Flex } from "@chakra-ui/react"
import { PieChart } from 'react-minimal-pie-chart';


export const IssueGraphic = ({issueIncrement, issues}) => {

    let featureCount = 0
    let designCount = 0
    let todoCount = 0
    let bugCount = 0

    issues && issues.map(issue => {
        if (issue ==='Todo'){
            todoCount++
        }
        else if(issue ==='Bug'){
            bugCount++
        }
        else if(issue === 'Feature'){
            featureCount++
        }
        else {
            designCount++
        }
    })

    const dataInfo = [
        { title: 'Features', value: featureCount, color: '#8ecae6' },
        { title: 'Design', value: designCount, color: '#219ebc' },
        { title: 'Todos', value: todoCount, color: '#ffb703' },
        { title: 'Bugs', value: bugCount, color: '#fb8500' },
    ]
    
    const issuesSum = issueIncrement && issueIncrement > 0 
    return(
    <>
    <Heading mb='1em' fontSize='xl' fontWeight='bold'>ISSUES GRAPHIC</Heading>
    <Flex justifyContent='center' alignItems='center' gap='1em'>
        {
        issuesSum ?
        <>
            <PieChart 
                style={{ height: '160px', width: '180px' }}
                data={dataInfo}
                animate 
                animationDuration={1000}
                label={({ dataEntry }) => {
                    const result = dataEntry.value /issueIncrement * 100
                    return dataEntry.value > 0 ? `${ result < 100 ? result.toFixed(1) : result } %` : ''}}
                labelStyle={{
                    fontSize: '10px',
                    opacity: '0.75',
                    fill: '#FFF'
                }}
                labelPosition={issueIncrement > 1 ? 60 : 0}
            />
            <List spacing={3}>
                <ListItem display='flex' alignItems='center'>
                    <Box boxSize='10px' borderRadius='100%' backgroundColor='#8ecae6' mr='5px'/>
                    Features
                </ListItem>
                <ListItem display='flex' alignItems='center'>
                        <Box boxSize='10px' borderRadius='100%' backgroundColor='#219ebc' mr='5px'/>
                        Design
                </ListItem>
                <ListItem display='flex' alignItems='center'>
                <Box boxSize='10px' borderRadius='100%' backgroundColor='#ffb703' mr='5px'/>
                    Todos
                </ListItem>
                <ListItem display='flex' alignItems='center'>
                    <Box boxSize='10px' borderRadius='100%' backgroundColor='#fb8500' mr='5px'/>
                    Bugs
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