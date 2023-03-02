import { useMemo } from "react"
import { Box, Table, Thead, Tbody, Button, Tr, Th, Td, TableContainer } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import {Label} from '../Alerts/Label'
import { BasicTable } from "./BasicTable"

export const ProjectTable = (
    {   projects, 
        handleOpenModal, 
        onEditOpen, 
        handleDelete,
        isDeleting,
        setHasUpdate
    }) => {

    const columns = useMemo(() => [
        {
            Header: "Projects",
            columns: [
                {
                    Header: "Project",
                    accessor: "name",
                    Cell: (props) => (
                        <Box
                            cursor='pointer'
                            fontSize='14px'
                            fontWeight='700'
                            color=''
                            _hover={{color:'blue.200'}}
                            transition='color 0.2s' 
                        >
                            <Link to={props.data[props.row.id]._id}>{props.value}</Link>  
                        </Box>
                    )
                },
                {
                    Header: "Team Members",
                    accessor: "members",
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
                            return handleOpenModal(projectId), onEditOpen()
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
                            setHasUpdate(true)
                        }}
                    >
                        X
                    </Button>)
                }
            ]
        }
    ], [])

    const tableData = useMemo(() => 
        projects.length > 0 ? 
        projects.map(project => ({
            ...project, edit: "edit", delete: "x"
        })) : 
        []
    , [projects])




    return(
        <>
            <BasicTable columns={columns} tableData={tableData}/>            
        </>
    )
}