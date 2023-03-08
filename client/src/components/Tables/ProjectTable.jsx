import { useMemo } from "react"
import { Box, Flex, Spacer, Heading, Button } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import {Label} from '../Alerts/Label'
import { BasicTable } from "./BasicTable"

export const ProjectTable = (
    {   projects,
        onNewProjectOpen,
        handleOpenModal, 
        onEditOpen, 
        handleDelete,
        isDeleting,
    }) => {

    const columns = useMemo(() => [
        {
            Header: "Projects",
            columns: [
                {
                    Header: "Project",
                    accessor: "name",
                    Cell: (props) => {
                        const tableRowId = props.row.id 
                        const projectId = props.data[tableRowId]._id
                        return(
                            <Box
                                cursor='pointer'
                                fontSize='sm'
                                fontWeight='700'
                                _hover={{color:'blue.200'}}
                                transition='color 0.2s' 
                            >
                                <Link to={projectId}>{props.value}</Link>  
                            </Box>
                        )
                    }
                },
                {
                    Header: "Team Members",
                    accessor: "members",
                },
                {
                    Header: "DeadLine",
                    accessor: "endDate",
                },
                {
                    Header: "Status",
                    accessor: "status",
                    Cell: (props) => (<Label>{props.value}</Label>)

                },
                {
                    Header: "",
                    accessor: "edit",
                    Cell: (props) => (
                    <Button          
                        fontSize='sm' 
                        cursor 
                        colorScheme='blue'
                        onClick={() => {
                            const tableRowId = props.row.id 
                            const projectId = props.data[tableRowId]._id
                            handleOpenModal(projectId, props.data), onEditOpen()
                        }}
                    >
                        Edit
                    </Button>)
                },
                {
                    Header: "",
                    accessor: "delete",
                    Cell: (props) => (
                    <Button          
                        fontSize='sm' 
                        cursor 
                        colorScheme='red'
                        isLoading={ isDeleting }
                        onClick={async () => {
                            const tableRowId = props.row.id
                            const projectId = props.data[tableRowId]._id
                            await handleDelete(projectId) 
                        }}
                    >
                        X
                    </Button>)
                }
            ]
        }
    ], [])

const tableData = useMemo(() => 
        projects?.length > 0 ? 
        projects :
        [], [projects])

    return(     
    <>
        <Flex mb='0.5em'>
            <Heading as='h3' color='blue.800' fontSize='1rem' textTransform='uppercase'>
                    Projects
            </Heading>
            <Spacer />
            <Button     
                size='sm' 
                colorScheme='blue'
                onClick={onNewProjectOpen}
            >
                Add Issue
            </Button>
        </Flex> 
        <BasicTable 
            columns={columns} 
            tableData={tableData}
        />    
    </>
    )
}