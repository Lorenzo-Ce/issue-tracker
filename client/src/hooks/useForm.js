import { useState } from "react"
import {initializeForm} from "../utils/initializeForm"
import {REGX_USERNAME, REGX_EMAIL, REGX_PSW} from '../utils/regex'

export const useForm = (formFields) => {

    const [Form, setForm] = useState(() => formFields) 
    const [formValidation, setFormValidation] = useState(() => initializeForm(formFields, false))
    const [errorMessage, setErrorMessage] = useState('')
    const isFormValid = Object.values(formValidation).every(field => field === false) && Object.values(Form).every(field => field !== '')
    
    const handleFormChange = event => {
        const {value, name, type, files} = event.target
        setForm((prevForm) => (
            {...prevForm,
                [name]: type === 'file' 
                    ? files[0] :
                    value
            }
        ))
    }

    const handleValidation = ({value, name, files}) =>{   
        let isInvalid
        const file = files && files[0]
        const FILE_SIZE_LIMIT = 1024 * 512
        switch(name) {
         case 'name': isInvalid = value === ''; break;
         case 'description': isInvalid = value === ''; break;
         case 'username': isInvalid = !REGX_USERNAME.test(value); break;
         case 'email': isInvalid = !REGX_EMAIL.test(value); break;
         case 'password': isInvalid = !REGX_PSW.test(value); break;
         case 'confirmPassword': isInvalid = value !== Form.password; break;
         case 'endDate': isInvalid = value < Form.startDate; break;
         case 'image' : isInvalid = file.type !=='image/jpeg' || file.size >= FILE_SIZE_LIMIT; break;
         default: isInvalid = false;
        }
        setFormValidation(prevForm => ({...prevForm, [name]: isInvalid}))
        return isInvalid
    }

    return {formValidation, 
            isFormValid, handleValidation, 
            handleFormChange, Form, setForm, errorMessage, setErrorMessage }
}
