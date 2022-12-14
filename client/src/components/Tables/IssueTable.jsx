import { Heading, Table, Thead, Tbody, Button, Tr, Th, Td, TableContainer, Flex, Spacer } from "@chakra-ui/react"
import { useEffect } from "react"
import {Label} from '../Alerts/Label'
import useDeleteData from "../../hooks/useDeleteData"

    export const IssueTable = ({projectId, issues, openNewIssueModal, openEditIssueModal, handleIssueInfo, setProject}) => {
    const {handleDelete, isDeleting, payload} = useDeleteData(`/projects/${projectId}/issues/`)
    
    console.log(issues)
    useEffect(()=> {
        payload.length > 0 &&                         
        setProject(prevProject => (
            {...prevProject,
            issues: payload
            }
        ))
    }, [payload])


    const issuesList = issues && issues?.map(({_id, name, label, status, priority}) =>                 
        <Tr key={_id}>
            <Td 
                data-id={_id} 
                onClick={(e) => handleIssueInfo(_id)}
                cursor='pointer'
                fontWeight='700'
                color=''
                _hover={{color:'blue.200'}}
                transition='color 0.2s'
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
                    onClick={() => {handleIssueInfo(_id), openEditIssueModal()}}
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
                onClick={openNewIssueModal}
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