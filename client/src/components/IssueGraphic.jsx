import { Heading, Box, List, ListItem } from "@chakra-ui/react"
import { PieChart} from 'react-minimal-pie-chart';


export const IssueGraphic = () => {

    const dataInfo = [
        { title: 'Bugs', value: 30, color: '#E38627' },
        { title: 'Features', value: 10, color: '#C13C37' },
        { title: 'Todos', value: 20, color: '#C13C37' },
        { title: 'Design', value: 10, color: '#6A2135' },
    ]
    return(
    <>
    <Heading mb='1em' fontSize='xl' fontWeight='bold'>ISSUES GRAPHIC</Heading>
    <Box display='flex'>
        <PieChart
            style={{ height: '280px' }}
            data={dataInfo}
            animate 
            animationDuration={1000}
            lengthAngle={-180}
        />

        <List spacing={3}>
            <ListItem display='flex' alignItems='center' font>
                <Box boxSize='10px' borderRadius='100%' backgroundColor='gold' mr='5px'/>
                Bugs
            </ListItem>
            <ListItem display='flex' alignItems='center' font>
            <Box boxSize='10px' borderRadius='100%' backgroundColor='gold' mr='5px'/>
                Todos
            </ListItem>
            <ListItem display='flex' alignItems='center' font>
                <Box boxSize='10px' borderRadius='100%' backgroundColor='gold' mr='5px'/>
                Features
            </ListItem>
            <ListItem display='flex' alignItems='center' font>
                <Box boxSize='10px' borderRadius='100%' backgroundColor='gold' mr='5px'/>
                Design
            </ListItem>
        </List>
    </Box>
    </>
    )
}