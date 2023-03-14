import { Box, Heading, Button, Flex, Spacer } from "@chakra-ui/react"
import { useEffect, useMemo } from "react"
import {Label} from '../Alerts/Label'
import useDeleteData from "../../hooks/useDeleteData"
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
    const {handleDelete, isDeleting, remainingData} = useDeleteData(`/projects/${projectId}/issues/`)
    
    useEffect(()=> {
        if(remainingData){                     
        setProject(prevProject => (
            {...prevProject,
            issues: remainingData?.length > 0 ? remainingData : []
            }
        )) 
    }
    }, [remainingData])

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
                            _hover={{color:'blue.200'}}
                            transition='color 0.2s' 
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
                            <Box fontSize='12px'
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
                        onClick={() => {
                            const tableRowId = props.row.id 
                            return handleIssueInfo(props.data[tableRowId]._id, props.data), 
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

    const tableData = useMemo(() => 
        issues?.length > 0 ? 
        issues :
        []
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
        <BasicTable 
            columns={columns} 
            tableData={tableData}
        />
    </>
    )
}