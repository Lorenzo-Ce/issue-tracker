import { Route, Routes, Navigate} from 'react-router-dom'
import { useState } from 'react'
import { Box, Text, Image } from '@chakra-ui/react'
import { Sidebar } from '../components/Sidebar'
import { useEffect } from 'react'

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
                <Image m='1em 1em' w='24px' h='24px' cursor='pointer' src='/menuIcon.svg'
                    onClick={handleSidebar} 
                /> }
            {/*"DESK" COMPONENT*/}
            <Box width={'70%'}>
                <Text fontSize='3xl'>DESK COMPONENT</Text>
            </Box>
        </Box>
    )
}
export default Dashboard
