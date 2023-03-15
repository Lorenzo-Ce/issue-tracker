import { useMemo } from "react"
import { Box, Flex, Spacer, Heading, Button } from "@chakra-ui/react"
import { NavLink } from 'react-router-dom'
import useAuthorization from "../../hooks/useAuthorization"
import { Label } from '../Alerts/Label'
import { Warning } from "../Alerts/Warning"
import { BasicTable } from "./BasicTable"
import { REGX_DATE } from '../../utils/regex'

export const ProjectTable = (
    {   projects,
        onNewProjectOpen,
        handleOpenModal, 
        onEditOpen, 
        handleDelete,
        isDeleting,
    }) => {

    const { authorization } = useAuthorization()
    
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
                                <NavLink to={projectId}
                                    className='routerLink'
                                >
                                    {props.value}
                                </NavLink>  
                        )
                    }
                },
                {
                    Header: "Team Members",
                    accessor: "members",
                },
                {
                    Header: "Start Date",
                    accessor: "startDate",
                    Cell: (props) => {
                        const startDate = props.value
                        const startDateFormat = startDate.replace(REGX_DATE, "$3/$2/$1")
                        return <>{startDateFormat}</>
                    }
                },
                {
                    Header: "DeadLine",
                    accessor: "endDate",
                    Cell: (props) => {
                        const endDate = props.value
                        const endDateFormat = endDate.replace(REGX_DATE, "$3/$2/$1")
                        const currentDate =  new Date().toJSON()
                        const isNotClosed = props?.row?.values?.status !== 'Closed' && props?.row?.values?.status !== 'Paused'
                        const isPastDeadline = endDate <= currentDate && isNotClosed
                        return (
                            <Box fontSize='12px'
                                color={isPastDeadline && 'red.400'}
                                fontWeight={isPastDeadline && 'bold'}
                            >   
                                {endDateFormat}
                            </Box>
                        )
                    }
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
                        isDisabled={authorization.username === 'GuestAccount'}
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
    ], [projects])

const tableData = useMemo(() => 
        projects?.length > 0 ? 
        projects :
        [], [projects])

    return(     
    <>
        {
            authorization.username === 'GuestAccount' &&
            <Warning  message="As Guest Account you can't add, delete, or edit Issues or Projects."/>
        }
        <Flex m='0.5em 0'>
            <Heading as='h3' color='blue.800' fontSize='1rem' textTransform='uppercase'>
                    Projects
            </Heading>
            <Spacer />
            <Button     
                size='sm' 
                colorScheme='blue'
                onClick={onNewProjectOpen}
            >
                Add Project
            </Button>
        </Flex> 
        <BasicTable 
            columns={columns} 
            tableData={tableData}
        />    
    </>
    )
}