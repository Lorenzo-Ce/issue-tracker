import { useState, useEffect } from 'react'

const useSidebar = () => {
    
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
    
    return {isSidebarVisible, setIsSidebarVisible, handleSidebar}
}

export default useSidebar