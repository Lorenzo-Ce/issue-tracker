import { Outlet } from 'react-router-dom'
import { Box, Image, Heading } from '@chakra-ui/react'
import { Sidebar } from '../components/Sidebar'
import useSidebar from '../hooks/useSidebar'

export function Dashboard() {
    const {isSidebarVisible, handleSidebar} = useSidebar()

    return(
        <Box 
            display='flex'
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
            <Box p='1em 1em' width='100%'>
                <Heading fontSize='2xl' color='blue.800' mb='1em'>
                    DESK COMPONENT
                </Heading>
                <Outlet />
            </Box>
        </Box>
    )
}
export default Dashboard
