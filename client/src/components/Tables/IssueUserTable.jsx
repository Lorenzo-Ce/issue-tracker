import { Box } from "@chakra-ui/react"
import { useMemo } from "react"
import { BasicTable } from "./BasicTable"
import { Label } from '../Alerts/Label'
import { REGX_DATETIME } from "../../utils/regex"
import { Link } from "react-router-dom"

export const IssueUserTable = ({projects}) => {

    const columns = useMemo(() => [
        {
            Header: "Issues",
            columns: [
                {
                    Header: "Title",
                    accessor: "name",
                    Cell: (props) => (
                        <Box
                            cursor='pointer'
                            fontSize='14px'
                            fontWeight='700'
                            color=''
                            _hover={{color:'blue.200'}}
                            transition='color 0.2s' 
                            onClick={() => console.log(props)}
                        >
                            <Link to={`/dashboard/${props.data[props.row.id].projectId}`}>{props.value}</Link> 
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
                        const closingDateFormat = closingDate.replace(REGX_DATETIME, "$3/$2/$1")
                        const currentDate =  new Date().toJSON()
                        const isPastDeadline = closingDate <= currentDate
                        return (
                            <Box fontSize='12px'
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
    
    const tableData = useMemo(() => {
        if( projects.length > 0) { 
            const result = projects.flatMap(({_id, issues}) => 
                issues.map( issue => ({projectId: _id, ...issue}))
            )
           return result
        }
        else{
            return []
        }
    }
    ,[projects])

    return(
    <>
        <BasicTable columns={columns} tableData={tableData} tablePageSize={7}/>
    </>
    )
}