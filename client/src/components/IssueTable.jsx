import { Heading, Table, Thead, Tbody, Button, Tr, Th, Td, TableContainer, Box } from "@chakra-ui/react"

export const IssueTable = () => {

    return(
    <>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Heading fontSize='xl' fontWeight='bold'>ISSUES</Heading>
            <Button     
                loadingText='Adding Member'
                isLoading={false} 
                onClick={() => console.log('add Issue') }
            >
                +
            </Button>
        </Box>
        <TableContainer>
            <Table variant='simple'>
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