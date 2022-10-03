import { Heading, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Flex, Spacer, propNames } from "@chakra-ui/react"
import { useEffect } from "react"

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
                {teamList}
            </Tbody>
            </Table>
        </TableContainer>
    </>
    )
}