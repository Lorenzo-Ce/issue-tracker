import { Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Flex } from "@chakra-ui/react"

export const TeamTable = ({roles}) => {
    
    const teamMembers = roles && Object.entries(roles)
    const teamList = teamMembers && teamMembers.map(([role, members]) =>
        members.map(member => 
            <Tr key={`${member}_${role}`}>
                <Td>{member}</Td>
                <Td>{role}</Td>
            </Tr>
        )
    )
    
    return(
    <>
        <Flex>
            <Heading fontSize='xl' fontWeight='bold'>TEAM</Heading>
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
                {teamList}
            </Tbody>
            </Table>
        </TableContainer>
    </>
    )
}