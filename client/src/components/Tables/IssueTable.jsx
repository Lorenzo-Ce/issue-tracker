import { Box, Heading, Button, Flex, Spacer } from "@chakra-ui/react"
import { useEffect, useMemo } from "react"
import { Label } from '../Alerts/Label'
import { Warning } from "../Alerts/Warning"
import useDeleteData from "../../hooks/useDeleteData"
import useAuthorization from "../../hooks/useAuthorization"
import { BasicTable } from "./BasicTable"
import { REGX_DATE } from "../../utils/regex"

export const IssueTable = ({
        projectId, 
        issues, 
        openNewIssueModal, 
        openEditIssueModal, 
        handleIssueInfo, 
        setProject
    }) => {
    const { authorization } = useAuthorization()
    const { username } = authorization
    const {handleDelete, isDeleting, remainingData} = useDeleteData(`/projects/${projectId}/issues/`)
    
    useEffect(()=> {
        if(remainingData){                     
        setProject(prevProject => (
            {...prevProject,
            issues: remainingData?.length > 0 ? remainingData : []
            }
        )) 
    }}, [remainingData])

    const columns = useMemo(() => [
        {
            Header: "Issues",
            columns: [
                {
                    Header: "Issue",
                    accessor: "name",
                    Cell: (props) => (
                        <Box
                            className="routerLink"
                            onClick={() => { 
                                const tableRowId = props.row.id 
                                return handleIssueInfo(props.data[tableRowId]._id, props.data)
                            }}
                        >
                            {props.value}
                        </Box>
                    )
                },
                {
                    Header: "Created By",
                    accessor: "author",
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
                        const closingDate = props.value
                        const closingDateFormat = closingDate.replace(REGX_DATE, "$3/$2/$1")
                        const currentDate =  new Date().toJSON()
                        const isNotClosed = props?.row?.values?.status !== 'Closed' || props?.row?.values?.status !== 'Paused'
                        const isPastDeadline = closingDate <= currentDate && isNotClosed
                        return (
                            <Box fontSize='sm'
                                color={isPastDeadline && 'red.400'}
                                fontWeight={isPastDeadline && 'bold'}
                            >   
                                {closingDateFormat}
                            </Box>
                        )
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
                        onClick={ () => {
                            const tableRowId = props.row.id 
                            handleIssueInfo(props.data[tableRowId]._id, props.data), 
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
                        isDisabled={username === 'GuestAccount'}
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

    const tableData = useMemo(() => 
        issues?.length > 0 ? 
        issues :
        []
    ,[issues])

    return(
    <>
        {
            authorization.username === 'GuestAccount' &&
            <Warning  message="As Guest Account you can't add, delete, or edit Issues or Projects."/>
        }
        <Flex mb='0.5em 0'>
            <Heading fontSize='xl' fontWeight='bold'>ISSUES</Heading>
            <Spacer />
            <Button     
                size='sm' 
                colorScheme='blue'
                isDisabled={username === 'GuestAccount'}
                onClick={openNewIssueModal}
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