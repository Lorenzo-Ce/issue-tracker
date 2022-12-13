import useAxiosProtect from './useAxiosProtect'
import { useState } from "react"

const useSubmitData = (url, method, isMultipart = false) => {
    
    const [successMessage, setSuccessMessage] = useState('')
    const [submitError, setSubmitError] = useState('')
    const [isLoadingSubmit, setIsLoading] = useState(false)
    const axiosProtect = useAxiosProtect()

    const resetMessage = () =>{
        setSuccessMessage('')
        setSubmitError('')
    }

    const handleSubmit = async (event, payload) => {
        event?.preventDefault()
        setSubmitError('')
        setSuccessMessage('')
        setIsLoading(true)
        try{
            const data = !isMultipart ? JSON.stringify(payload) : payload
            const response = await axiosProtect({
                method,
                url, 
                data,
                headers: {
                    'Content-Type': !isMultipart ? 
                        'application/json'
                        :`multipart/form-data`, 
                    'Accept': 'application/json' }
            })
            if(response.status >= 200 && response.status < 300){  
                setSuccessMessage('Data upload to server!')
                return response?.data
            }    
        } catch (err){
            if (err?.response && err?.response?.status !== 0){
                setSubmitError(`Error ${err?.response?.status}: ${err.response?.statusText} ${err?.response?.data?.error}`)
            }
            else if(err?.request){
                setSubmitError('Network Error. Submit failed, try again later.')
            }
            else{
                setSubmitError('Error something went wrong with your request. Try again later.')
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