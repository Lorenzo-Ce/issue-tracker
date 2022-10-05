import { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Image, Heading } from '@chakra-ui/react'
import { Sidebar } from '../components/Sidebar'

export function Dashboard() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(() => {
        return window.innerWidth > 800 ? true : false
    })
    const handleSidebar = () => {setIsSidebarVisible(prevSide => !prevSide)}
    useEffect(() => {
        const showSidebar = e => {
            const {innerWidth} = e.target
            if(innerWidth > 800){
                setIsSidebarVisible(true)
            } 
        }
        window.addEventListener('resize',(e) => showSidebar(e))
        return window.removeEventListener('resize', showSidebar)
    },[])

    return(
        <Box 
            display={'flex'} 
            min-width={'100%'} 
            color='blue.700'
        >
            {isSidebarVisible ? 
                <Sidebar 
                    handleSidebar={handleSidebar} 
                    isSidebarVisible={isSidebarVisible} 
                /> : 
                <Image m='1em 1em' boxSize='24px' cursor='pointer' src='/menuIcon.svg'
                    alt='burger menu' onClick={handleSidebar} 
                /> }
            {/*<Outlet based on link>*/}
            <Box width={['100%']} p='1em 1em'>
                <Heading fontSize='2xl' color='blue.800' mb='1em'>
                    DESK COMPONENT
                </Heading>
                <Outlet />
            </Box>
        </Box>
    )
}
export default Dashboard
