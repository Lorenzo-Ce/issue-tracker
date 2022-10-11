import useAxiosProtect from './useAxiosProtect'
import { useState } from "react"

const useSubmitData = (url, method) => {
    
    const [successMessage, setSuccessMessage] = useState('')
    const [submitError, setSubmitError] = useState('')
    const [isLoadingSubmit, setIsLoading] = useState(false)
    const axiosProtect = useAxiosProtect()

    const resetMessage = () =>{
        setSuccessMessage('')
        setSubmitError('')
    }

    const handleSubmit = async (event, payload) => {
        event.preventDefault()
        setSubmitError('')
        setSuccessMessage('')
        setIsLoading(true)
        try{
            const data = JSON.stringify(payload)
            const response = await axiosProtect({
                method,
                url, 
                data
            })
            response.status === 201 && setSuccessMessage('Data upload to server!')
        } catch (err){
            if(err?.request){
                setSubmitError('Network Error. Submit failed, try again later.')
            }
            else{
                const errorMessage = await err.json()
                console.log(errorMessage)
                setSubmitError(`Error ${err?.response?.status}: ${errorMessage}`)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return {
        handleSubmit, 
        resetMessage, 
        successMessage, 
        submitError, 
        isLoadingSubmit
    }
}

export default useSubmitData