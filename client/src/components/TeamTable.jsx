import { Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Box } from "@chakra-ui/react"

export const TeamTable = () => {

    return(
    <>
    <Heading fontSize='xl' fontWeight='bold'>TEAM</Heading>
    <TableContainer>
        <Table variant='striped' colorScheme='blue'>
            <Thead>
            <Tr>
                <Th>Member</Th>
                <Th>Role</Th>
            </Tr>
            </Thead>
            <Tbody>
            <Tr>
                <Td>Elmo</Td>
                <Td>Manager</Td>
            </Tr>
            <Tr>
                <Td>John Doe</Td>
                <Td>Developer</Td>
            </Tr>
            <Tr>
                <Td>Jane Doe</Td>
                <Td>Designer</Td>
            </Tr>
        </Tbody>
        </Table>
    </TableContainer>
    <Box display='flex' mt='1em' justifyContent='space-between'>
        <Button     
            mb='5px' 
            colorScheme='blue'
            loadingText='Adding Member'
            isLoading={false} 
            onClick={() => console.log('add member') }
        >
            Add Member
        </Button>
        <Button     
            mb='5px' 
            colorScheme='red'
            loadingText='Logging out'
            isLoading={false} 
            onClick={() => console.log('remove member') }
        >
            Remove Member
        </Button> 
    </Box>
    </>
    )
}