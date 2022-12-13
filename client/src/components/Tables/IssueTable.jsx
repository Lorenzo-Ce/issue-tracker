import { Box, Heading, Table, Thead, Tbody, Button, Tr, Th, Td, TableContainer, Flex, Spacer } from "@chakra-ui/react"
import { useEffect } from "react"
import {Label} from '../Alerts/Label'
import useHover from "../../hooks/useHover"
import useDeleteData from "../../hooks/useDeleteData"

    export const IssueTable = ({projectId, issues, onOpen, onEditIssueOpen, handleIssueInfo, setProject}) => {
    const {isHover, onHoverEnter, onHoverLeave} = useHover()
    const {handleDelete, isDeleting, payload} = useDeleteData(`/projects/${projectId}/issues/`)

    useEffect(()=> {
        payload.length > 0 &&                         
        setProject(prevProject => (
            {...prevProject,
            issues: payload
            }
        ))
    }, [payload])


    const issuesList = issues?.map(({_id, name, label, status, priority}) =>                 
        <Tr key={_id}>
            <Td 
                fontWeight='700'
                color={isHover[`${_id}`] ? 'blue.200' : ''}
                data-id={_id} 
                onClick={(e) => handleIssueInfo(_id)}
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
            <Td color='white' textAlign='end'>
                <Button
                    fontSize='sm' 
                    cursor 
                    colorScheme='blue'
                    onClick={() => {handleIssueInfo(_id), onEditIssueOpen()}}
                >
                    Edit
                </Button>
            </Td>
            <Td textAlign='end'>
                <Button 
                    fontSize='sm' 
                    cursor 
                    colorScheme='red'
                    isLoading={ isDeleting }
                    onClick={async () => {
                        await handleDelete(_id) 
                    }}
                >
                    X
                </Button>
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
                    <Th></Th>
                    <Th></Th>
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