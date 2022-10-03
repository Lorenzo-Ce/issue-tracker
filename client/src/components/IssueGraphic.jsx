import { Heading, Box, List, ListItem, Flex } from "@chakra-ui/react"
import { PieChart} from 'react-minimal-pie-chart';


export const IssueGraphic = ({issues}) => {

    const dataInfo = [
        { title: 'Bugs', value: 0, color: '#fb8500' },
        { title: 'Features', value: 0, color: '#ffb703' },
        { title: 'Todos', value: 0, color: '#8ecae6' },
        { title: 'Design', value: 0, color: '#219ebc' },
    ]
    issues && issues.forEach( ({label}) => {
        switch (label) {
            case 'Bug': dataInfo[0].value++; break;
            case 'Feature': dataInfo[1].value++; break;
            case 'Todo': dataInfo[2].value++; break;
            case 'Design': dataInfo[3].value++; break;
            default: break;
        }
    })
    const sumValues = issues && issues.length
    return(
    <>
    <Heading mb='1em' fontSize='xl' fontWeight='bold'>ISSUES GRAPHIC</Heading>
    <Flex justifyContent='center' alignItems='center' gap='1em'>
        {
        sumValues > 0 ?
        <>
            <PieChart 
                style={{ height: '160px', width: '180px' }}
                data={dataInfo}
                animate 
                animationDuration={1000}
                label={({ dataEntry }) => dataEntry.value > 0 ? `${Math.round(dataEntry.value/sumValues * 100)} %` : ''}
                labelStyle={{
                    fontSize: '10px',
                    opacity: '0.75',
                    fill: '#FFF'
                }}
                labelPosition={60}
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