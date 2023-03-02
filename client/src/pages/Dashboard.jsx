import { Outlet } from 'react-router-dom'
import { Box, Image, Heading } from '@chakra-ui/react'
import { Sidebar } from '../components/Sidebar'
import useGetData from '../hooks/useGetData'
import useSidebar from '../hooks/useSidebar'

export function Dashboard() {
    const {responseData: projects, setResponseData: setProjects, apiError, setApiError, isLoading} = useGetData('/projects')
    const {isSidebarVisible, handleSidebar} = useSidebar()

    return(
        <Box 
            display='flex' 
            min-width='100%' 
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
            {/*<Outlet based on link>*/}
            <Box width={['100%']} p='1em 1em'>
                <Heading fontSize='2xl' color='blue.800' mb='1em'>
                    DESK COMPONENT
                </Heading>
                <Outlet context={[projects, setProjects, apiError, setApiError, isLoading]}/>
            </Box>
        </Box>
    )
}
export default Dashboard
