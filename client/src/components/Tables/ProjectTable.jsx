import { Table, Thead, Tbody, Button, Tr, Th, Td, TableContainer } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import {Label} from '../Alerts/Label'

export const ProjectTable = (
    {   projects, 
        handleOpenModal, 
        onEditOpen, 
        handleDelete,
        isDeleting,
        setHasUpdate
    }) => {

    
    const ProjectList = projects.length > 0 && projects.map(project => {
        const members = project.members.toString().replace(/[,]/g, ', ')
        const id = project._id
        return (
            <Tr key={id}>
                <Td color='blue.600'>
                    <Link to={id}>{project.name}</Link> 
                </Td>
                <Td>{members}</Td>
                <Td><Label>{project.status}</Label></Td>
                <Td color='white' textAlign='end'>
                    <Button
                        fontSize='sm' 
                        cursor 
                        colorScheme='blue'
                        onClick={() => {
                            handleOpenModal(id)
                            onEditOpen()
                        }}
                    >
                        Edit
                    </Button>
                </Td>
                <Td textAlign='end'>
                    <Button 
                        fontSize='sm' 
                        cursor 
                        colorScheme='red'
                        isLoading={isDeleting}
                        onClick={async () => {
                            await handleDelete(id) 
                            setHasUpdate(true)
                        }}
                    >
                        X
                    </Button>
                </Td>
            </Tr>
        )
    })
    return(
        <TableContainer>
            <Table variant='simple' size='sm'>
                <Thead>
                <Tr backgroundColor='#ededed'>
                    <Th>Project</Th>
                    <Th>Team Members</Th>
                    <Th textAlign='center'>Status</Th>
                    <Th ></Th>
                    <Th></Th>
                </Tr>
                </Thead>
                <Tbody>
                    {ProjectList}
                </Tbody>
            </Table>
        </TableContainer>
    )
}