import { Box } from "@chakra-ui/react"
import { useMemo } from "react"
import { BasicTable } from "./BasicTable"
import { Label } from '../Alerts/Label'
import { REGX_DATETIME } from "../../utils/regex"
import { NavLink } from "react-router-dom"

export const IssueUserTable = ({issues}) => {

    const columns = useMemo(() => [
        {
            Header: "Issues",
            columns: [
                {
                    Header: "Title",
                    accessor: "name",
                    Cell: (props) => (
                        <NavLink to={`/dashboard/${props.data[props.row.id].projectId}`}
                            className='routerLink'
                        >
                            {props.value}
                        </NavLink> 
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
                    Header: "Assigned To",
                    accessor: "members",
                    Cell: (props) => (
                        <>{
                            props?.value?.length > 0 ?
                            <Box maxHeight='30px' overflowX='auto' overflowY='scroll'>
                                {props?.value?.map(member => (<Box key={member}>{member}</Box>))}
                            </Box> : 
                            "Not assigned"
                        }</>
                    )
                },
                {
                    Header: "Target Date",
                    accessor: "closingDate",
                    Cell: (props) =>{              
                        const closingDate = props.value
                        const closingDateFormat = closingDate.replace(REGX_DATETIME, "$3/$2/$1")
                        const currentDate =  new Date().toJSON()
                        const isNotClosed = props.row.values.status !== 'Closed'
                        const isPastDeadline = closingDate <= currentDate && isNotClosed
                        return (
                            <Box 
                                fontSize='sm'
                                color={isPastDeadline && 'red.400'}
                                fontWeight={isPastDeadline && 'bold'}
                            >
                                {closingDateFormat}
                            </Box>)
                    }
                },
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
            <BasicTable 
                columns={columns} 
                tableData={tableData} 
                tablePageSize={5}
            />
        </>
    )
}