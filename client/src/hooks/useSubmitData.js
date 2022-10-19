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
        event.preventDefault()
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
            }    
        } catch (err){
            if(err?.request){
                setSubmitError('Network Error. Submit failed, try again later.')
            }
            else{
                // TODO: fix error handling
                const errorMessage = err
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