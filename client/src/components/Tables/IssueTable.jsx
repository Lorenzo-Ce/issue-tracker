import { Box, Heading, Button, Flex, Spacer } from "@chakra-ui/react"
import { useEffect, useMemo } from "react"
import {Label} from '../Alerts/Label'
import useDeleteData from "../../hooks/useDeleteData"
import { BasicTable } from "./BasicTable"
import { REGX_DATETIME } from "../../utils/regex"

export const IssueTable = ({
        projectId, 
        issues, 
        openNewIssueModal, 
        openEditIssueModal, 
        handleIssueInfo, 
        setProject
    }) => {
    const {handleDelete, isDeleting, payload} = useDeleteData(`/projects/${projectId}/issues/`)
    
    useEffect(()=> {
        payload.length > 0 &&                         
        setProject(prevProject => (
            {...prevProject,
            issues: payload
            }
        ))
    }, [payload])

    const columns = useMemo(() => [
        {
            Header: "Issues",
            columns: [
                {
                    Header: "Issue",
                    accessor: "name",
                    Cell: (props) => (
                        <Box
                            cursor='pointer'
                            fontSize='14px'
                            fontWeight='700'
                            color=''
                            _hover={{color:'blue.200'}}
                            transition='color 0.2s' 
                            onClick={() => { 
                                const tableRowId = props.row.id 
                                return handleIssueInfo(props.data[tableRowId]._id)
                            }}
                        >
                            {props.value}
                        </Box>
                    )
                },
                {
                    Header: "Type",
                    accessor: "label",
                },
                {
                    Header: "Status",
                    accessor: "status",
                    Cell: (props) => (<Label>{props.value}</Label>)

                },
                {
                    Header: "Priority",
                    accessor: "priority",
                    Cell: (props) => (<Label>{props.value}</Label>)
                },
                {
                    Header: "Target Date",
                    accessor: "closingDate",
                    Cell: (props) =>{
                        const value = props.value.replace(REGX_DATETIME, "$3/$2/$1")
                        return (<Box fontSize='12px'>{value}</Box>)
                    }
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
                            return handleIssueInfo(props.data[tableRowId]._id), 
                            openEditIssueModal()}}
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
                            const issueId = props.data[tableRowId]._id
                            await handleDelete(issueId) 
                        }}
                    >
                        X
                    </Button>)
                }
            ]
        }
    ], [])

    const tableData = useMemo(() => {
        return issues.length > 0 ? 
        issues.map(({_id, name, label, status, priority, closingDate}) => ({
            _id, name, label, status, priority, closingDate, edit: "edit", delete: "x"
        })) :
        []
    }
    ,[issues])

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
        <BasicTable columns={columns} tableData={tableData}/>
    </>
    )
}