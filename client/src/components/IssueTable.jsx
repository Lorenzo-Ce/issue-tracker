import { Heading, Table, Thead, Tbody, Button, Tr, Th, Td, TableContainer, Flex, Spacer } from "@chakra-ui/react"

export const IssueTable = () => {

    return(
    <>
        <Flex mb='0.5em'>
            <Heading fontSize='xl' fontWeight='bold'>ISSUES</Heading>
            <Spacer />
            <Button     
            size='sm' 
            colorScheme='blue'
            onClick={() => console.log('open add issue') }
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
                    <Th>Status</Th>
                    <Th>Priority</Th>
                    <Th>More Info</Th>
                </Tr>
                </Thead>
                <Tbody>
                <Tr>
                    <Td>UI Crash</Td>
                    <Td>Bug</Td>
                    <Td>Open</Td>
                    <Td>Critical</Td>
                    <Td><a href='#'>More Info</a></Td>
                </Tr>
                <Tr>
                    <Td>Implement UI</Td>
                    <Td>Todo</Td>
                    <Td>Closed</Td>
                    <Td>Normal</Td>
                    <Td><a href='#'>More Info</a></Td>
                </Tr>
                <Tr>
                    <Td>Add Project Route</Td>
                    <Td>To do</Td>
                    <Td>Open</Td>
                    <Td>Low</Td>
                    <Td><a href='#'>More Info</a></Td>
                </Tr>
                <Tr>
                    <Td>UI Crash</Td>
                    <Td>Bug</Td>
                    <Td>Open</Td>
                    <Td>Critical</Td>
                    <Td><a href='#'>More Info</a></Td>
                </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    </>
    )
}