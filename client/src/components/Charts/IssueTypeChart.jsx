import { Heading, Box, List, ListItem, Flex } from "@chakra-ui/react"
import { PieChart } from 'react-minimal-pie-chart';
import { countIssuesByType } from "./utils/countIssuesByType";


export const IssueTypeChart = ({issues}) => {
    
    const [featureCount, bugCount, todoCount, designCount] = countIssuesByType(issues)
    const issuesCount = issues && issues.length

    const dataInfo = [
        { title: 'Bugs', value: bugCount, color: '#fb8500' },
        { title: 'Todos', value: todoCount, color: '#ffb703' },
        { title: 'Features', value: featureCount, color: '#8ecae6' },
        { title: 'Design', value: designCount, color: '#219ebc' },
    ]

    return(
    <>
    <Heading mb='1em' fontSize='l' fontWeight='bold'>ISSUES BY TYPE</Heading>
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
                        backgroundColor='#8ecae6' 
                        mr='5px'
                    />
                    Features
                </ListItem>
                <ListItem display='flex' alignItems='center'>
                    <Box boxSize='10px' 
                        borderRadius='100%' 
                        backgroundColor='#219ebc' 
                        mr='5px'
                    />
                    Design
                </ListItem>
                <ListItem display='flex' alignItems='center'>
                    <Box boxSize='10px' 
                        borderRadius='100%' 
                        backgroundColor='#ffb703' 
                        mr='5px'
                    />
                    Todos
                </ListItem>
                <ListItem display='flex' alignItems='center'>
                    <Box boxSize='10px' 
                        borderRadius='100%' 
                        backgroundColor='#fb8500' 
                        mr='5px'
                    />
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