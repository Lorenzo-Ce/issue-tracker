import { useState } from "react"

const useHover = () => {
    const [isHover, setIsHover] = useState({})
    const onHoverEnter = (e, id) => {
        setIsHover(prev => ({...prev, [id] : true}))
    } 
    const onHoverLeave = (e, id) => {
        setIsHover(prev => ({...prev, [id] : false}))
    } 
    const onHoverSwitch = (e, id) => {
        setIsHover(prev => {
            prev[id] ? prev[id] : {...prev, [id] : !prev[id]} 
        
        })
    } 

    return {
        isHover, 
        onHoverEnter, 
        onHoverLeave,
        onHoverSwitch
    }
}

export default useHover