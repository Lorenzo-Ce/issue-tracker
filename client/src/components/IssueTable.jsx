import { Box, Heading, Table, Thead, Tbody, Button, Tr, Th, Td, TableContainer, Flex, Spacer } from "@chakra-ui/react"
import {Label} from './Label'
import useHover from "../hooks/useHover"

export const IssueTable = ({issues, onOpen, handleIssueInfo}) => {
    const {isHover, onHoverEnter, onHoverLeave} = useHover()
    
    const issuesList = issues?.map(({_id, name, label, status, priority}) =>                 
        <Tr key={_id}>
            <Td 
                fontWeight='700'
                color={isHover[`${_id}`] ? 'blue.200' : ''}
                data-id={_id} 
                onClick={handleIssueInfo}
                cursor='pointer'
                onMouseEnter={(e) => onHoverEnter(e, _id)}
                onMouseLeave={(e) => onHoverLeave(e, _id)}
            >     
                {name}
            </Td>
            <Td>{label}</Td>
            <Td>
                <Label>{status}</Label>
            </Td>
            <Td>                
                <Label>{priority}</Label>
            </Td>
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
                    <Th>Status</Th>
                    <Th>Priority</Th>
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