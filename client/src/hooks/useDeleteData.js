import useAxiosProtect from './useAxiosProtect'
import { useState } from "react"

const useDeleteData = (baseUrl) => {
    
    const axiosProtect = useAxiosProtect()
    const [successMessage, setSuccessMessage] = useState('')
    const [deleteError, setDeleteError] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const [ payload, setPayload ] = useState({})

    const resetMessage = () =>{
        setSuccessMessage('')
        setDeleteError('')
    }

    const handleDelete = async (id) => {
        setDeleteError('')
        setSuccessMessage('')
        setPayload({})
        setIsDeleting(true)
        try{
            const response = await axiosProtect({
                method: 'delete',
                url: `${baseUrl}${id}`, 
            })
            if(response.status >= 200 && response.status < 300){  
                setSuccessMessage('Data deleted!')
                setPayload(response?.data)
            }    
        } catch (err){
            if(err?.request){
                setDeleteError('Network Error. Delete failed, try again later.')
            }
            else{
                console.log(err)
                setDeleteError(`Error ${err?.response?.status}: ${err?.response?.data}`)
            }
        } finally {
            setIsDeleting(false)
        }
    }

    return {
        handleDelete, 
        resetMessage, 
        successMessage, 
        deleteError, 
        isDeleting,
        payload
    }
}

export default useDeleteData