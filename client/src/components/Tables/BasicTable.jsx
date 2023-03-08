import { Box, TableContainer, Table, Thead, Tbody, Tr, Th, Td, Flex, Tooltip, Select, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, IconButton, Text } from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon, ArrowRightIcon, ArrowLeftIcon, ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, usePagination } from "react-table";

export const BasicTable = ({columns, tableData, tablePageSize=5}) => {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, 
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
        } = useTable(
        {
            columns,
            data: tableData,
            initialState: { pageIndex: 0,  pageSize: tablePageSize },
        },
        useSortBy,
        usePagination
        )

    return(
    <TableContainer overflowX='scroll'>
        <Table size='sm' {...getTableProps()} overflowX='scroll'>
            <Thead overflowX='scroll'>
            {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                    <Th
                    userSelect="none"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                    <Flex alignItems="center">
                        {column.render("Header")}
                        {column.isSorted ? (
                        column.isSortedDesc ? (
                            <ChevronDownIcon ml={1} w={4} h={4} />
                        ) : (
                            <ChevronUpIcon ml={1} w={4} h={4} />
                        )
                        ) : (
                        ""
                        )}
                    </Flex>
                    </Th>
                ))}
                </Tr>
            ))}
            </Thead>
            <Tbody {...getTableBodyProps()} >
            {page.map((row, i) => {
                prepareRow(row);
                return (
                <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                    return (
                        <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                    );
                    })}
                </Tr>
                );
            })}
            </Tbody>
        </Table>
        <Flex justifyContent="spaceBetween" m={4} alignItems="center">
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
            />
          </Tooltip>
          <Tooltip label="Previous Page">
            <IconButton
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center" >
          <Text flexShrink="0" mr={8}>
            Page{" "}
            <Text fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>{" "}
            of{" "}
            <Text fontWeight="bold" as="span">
              {pageOptions.length}
            </Text>
          </Text>
          <Text flexShrink="0">Go to page:</Text>{" "}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            max={pageOptions.length}
            onChange={(value) => {
              const page = value ? value - 1 : 0;
              gotoPage(page);
            }}
            defaultValue={pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </TableContainer>
    )
    
}