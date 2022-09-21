import { useState, useEffect } from 'react'
import { Box, Image, Heading } from '@chakra-ui/react'
import { Sidebar } from '../components/Sidebar'
import { Desk } from '../components/Desk'

export function Dashboard() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(() => {
        return window.innerWidth > 800 ? true : false
    })

    const handleSidebar = () => {
        setIsSidebarVisible(prevSide => !prevSide)
    }
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
        <Box display={'flex'} min-width={'100%'} >
            {isSidebarVisible ? 
                <Sidebar handleSidebar={handleSidebar} 
                    isSidebarVisible={isSidebarVisible} 
                /> : 
                <Image m='1em 1em' boxSize='24px' cursor='pointer' src='/menuIcon.svg'
                    alt='burger menu' onClick={handleSidebar} 
                /> }
            {/*"DESK" COMPONENT*/}
            <Box width={['100%']} p='1em 1em'>
                <Heading fontSize='3xl'>DESK COMPONENT</Heading>
                <Desk />
            </Box>
        </Box>
    )
}
export default Dashboard
