import { Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Flex, Spacer } from "@chakra-ui/react"

export const TeamTable = ({members}) => {
    const teamMembers = Object.entries(members)
    const teamList = teamMembers.map(([role, members]) => 
        members.forEach(member => 
        <Tr>
            <Th>{member}</Th>
            <Th>{role}</Th>
        </Tr>
        )
    )
    return(
    <>
    <Flex>
        <Heading fontSize='xl' fontWeight='bold'>TEAM</Heading>
        <Spacer/>
        <Button     
            size='sm' 
            colorScheme='blue'
            loadingText='Adding Member'
            isLoading={false} 
            onClick={() => console.log('add member') }
        >
            Add Member
        </Button>
    </Flex>

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
    </>
    )
}