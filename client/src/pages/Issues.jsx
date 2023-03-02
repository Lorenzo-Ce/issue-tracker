import { Box, Image, Heading } from '@chakra-ui/react'
import { Sidebar } from '../components/Sidebar'
import { IssueUserTable } from '../components/Tables/IssueUserTable'
import useGetData from '../hooks/useGetData'
import useSidebar from '../hooks/useSidebar'

export function Issues() {
    const {responseData: projects, apiError, isLoading} = useGetData('/projects/issues')
    const {isSidebarVisible, handleSidebar} = useSidebar()

    console.log(projects)

    return(
        <Box 
            display={'flex'} 
            min-width={'100%'} 
            color='blue.700'
        >
            {
                isSidebarVisible ? 
                <Sidebar 
                    handleSidebar={handleSidebar} 
                    isSidebarVisible={isSidebarVisible} 
                /> : 
                <Image m='1em 1em' boxSize='24px' cursor='pointer' src='/menuIcon.svg'
                    alt='burger menu' position='sticky' top='1em' onClick={handleSidebar} 
                />
            }
            <Box width={['100%']} p='1em 1em'>
                <Heading fontSize='2xl' color='blue.800' mb='1em'>
                    ISSUES LIST
                </Heading>
            <Box bgColor='white' borderRadius='10px' p='1em' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'>            
                {   isLoading ?
                <Box>Loading</Box> :
                <IssueUserTable projects={projects} />
                }
            </Box>
               </Box>
        </Box>
    )
}
export default Issues
