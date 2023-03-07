import useAxiosProtect from './useAxiosProtect'
import { useState } from "react"

const useDeleteData = (baseUrl) => {
    
    const axiosProtect = useAxiosProtect()
    const [deleteMessage, setDeleteMessage] = useState('')
    const [deleteError, setDeleteError] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const [ remainingData, setRemainingData ] = useState([])

    const resetMessage = () =>{
        setDeleteMessage('')
        setDeleteError('')
    }

    const handleDelete = async (id) => {
        setDeleteError('')
        setDeleteMessage('')
        setRemainingData([])
        setIsDeleting(true)
        try{
            const response = await axiosProtect({
                method: 'delete',
                url: `${baseUrl}${id}`, 
            })
            setDeleteMessage('Data deleted!')
            if(response.status === 200){
                setDeleteMessage('Data deleted')
                setRemainingData(response?.data)
            } else {
                setDeleteMessage('Data not present in Database, try to refresh')             
            }
            
        } catch (err){
            if (err?.response && err?.response?.status !== 0){
                setDeleteError(`Error ${err?.response?.status}: ${err.response?.statusText} ${err?.response?.data?.error}`)
            }
            else if(err?.request){
                setDeleteError('Network Error. Delete failed, try again later.')
            }
            else{
                setDeleteError('Error something went wrong with your request. Try again later.')
            }
        } finally {
            setIsDeleting(false)
        }
    }

    return {
        handleDelete, 
        resetMessage, 
        deleteMessage, 
        deleteError, 
        isDeleting,
        remainingData
    }
}

export default useDeleteData