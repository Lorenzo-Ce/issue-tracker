import { Heading, Box, List, ListItem, Flex } from "@chakra-ui/react"
import { PieChart} from 'react-minimal-pie-chart';


export const IssueGraphic = () => {

    const dataInfo = [
        { title: 'Bugs', value: 30, color: '#E38627' },
        { title: 'Features', value: 10, color: '#C13C37' },
        { title: 'Todos', value: 20, color: '#C13C37' },
        { title: 'Design', value: 10, color: '#6A2135' },
    ]
    const sumValues = 70
    return(
    <>
    <Heading mb='1em' fontSize='xl' fontWeight='bold'>ISSUES GRAPHIC</Heading>
    <Flex justifyContent='center' alignItems='center' gap='1em'>
        <PieChart 
            style={{ height: '160px', width: '180px' }}
            data={dataInfo}
            animate 
            animationDuration={1000}
            label={({ dataEntry }) => `${Math.round(dataEntry.value/70 * 100)} %`}
            labelStyle={{
                fontSize: '10px',
                opacity: '0.75',
                fill: '#FFF'
            }}
            labelPosition={60}
        />

        <List spacing={3}>
            <ListItem display='flex' alignItems='center'>
                <Box boxSize='10px' borderRadius='100%' backgroundColor='gold' mr='5px'/>
                Bugs
            </ListItem>
            <ListItem display='flex' alignItems='center'>
            <Box boxSize='10px' borderRadius='100%' backgroundColor='gold' mr='5px'/>
                Todos
            </ListItem>
            <ListItem display='flex' alignItems='center'>
                <Box boxSize='10px' borderRadius='100%' backgroundColor='gold' mr='5px'/>
                Features
            </ListItem>
            <ListItem display='flex' alignItems='center'>
                <Box boxSize='10px' borderRadius='100%' backgroundColor='gold' mr='5px'/>
                Design
            </ListItem>
        </List>
    </Flex>
    </>
    )
}