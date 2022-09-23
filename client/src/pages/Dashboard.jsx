import { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Image, Heading } from '@chakra-ui/react'
import { useAuthorization } from '../hooks/useAuthorization'
import useAxiosProtect from '../hooks/useAxiosProtect'
import { Sidebar } from '../components/Sidebar'


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

    const [isLoading, setIsLoading] = useState(false)
    const [projects, setProjects] = useState([])
    const [issues, setIssues] = useState([])
    const {authorization} = useAuthorization()
    const axiosProtect = useAxiosProtect()
    const effectRun = useRef(false)

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        const getProjects = async () => {
            try{
                setIsLoading(true)
                const response = await axiosProtect.get('/projects', 
                    {signal: controller.signal })
                setProjects(response.data)
            }catch(e){ 
                console.error(e) 
            } finally {
                isMounted && setIsLoading(false)
            }
        } 
        if(effectRun.current){
            getProjects()      
        }        
        return () => {
            isMounted = false
            effectRun.current = true
            controller.abort()
        }
    }, [])

    return(
        <Box display={'flex'} min-width={'100%'} >
            {isSidebarVisible ? 
                <Sidebar handleSidebar={handleSidebar} 
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
                <Outlet context={[isLoading, projects]}/>
            </Box>
        </Box>
    )
}
export default Dashboard
