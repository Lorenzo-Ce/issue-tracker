import { Box, Heading, Table, Thead, Tbody, Button, Tr, Th, Td, TableContainer, Flex, Spacer } from "@chakra-ui/react"
import {Label} from './Label'

export const IssueTable = ({issues, onOpen}) => {

    const issuesList = issues?.map(({_id, name, label, status, priority}) =>                 
        <Tr key={_id}>
            <Td fontWeight='700'>{name}</Td>
            <Td>{label}</Td>
            <Td>
                <Label>{status}</Label>
            </Td>
            <Td>                
                <Label>{priority}</Label>
            </Td>
            <Td><a href='#'>More Info</a></Td>
        </Tr>
    )
    return(
    <>
        <Flex mb='0.5em'>
            <Heading fontSize='xl' fontWeight='bold'>ISSUES</Heading>
            <Spacer />
            <Button     
                size='sm' 
                colorScheme='blue'
                onClick={onOpen}
            >
                Add Issue
            </Button>
        </Flex>
        <TableContainer>
            <Table variant='simple' size='sm'>
                <Thead>
                <Tr>
                    <Th>Issue</Th>
                    <Th>Type</Th>
                    <Th textAlign='center'>Status</Th>
                    <Th textAlign='center'>Priority</Th>
                    <Th>More Info</Th>
                </Tr>
                </Thead>
                <Tbody>
                    {issuesList}
                </Tbody>
            </Table>
        </TableContainer>
    </>
    )
}