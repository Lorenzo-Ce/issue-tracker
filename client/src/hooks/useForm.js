import { useState } from "react"
import initializeForm from "../utils/initializeForm"
import {REGX_USERNAME, REGX_EMAIL, REGX_PSW} from '../utils/regex'

export const useForm = (formFields) => {

    const [Form, setForm] = useState(() => formFields) 
    const [formValidation, setFormValidation] = useState(() => initializeForm(formFields, false))
    const [formError, setFormError] = useState('')
    const isFormValid = Object.values(formValidation).every(field => field === false) && Object.values(Form).every(field => field !== '')

    const handleFormChange = event => {
        const {value, name} = event.target
        setForm((prevForm) => (
            {...prevForm,
                [name]: value
            }
        ))
    }
    const handleValidation = ({value, name}) =>{   
        let isInvalid
        switch(name) {
         case 'username': isInvalid = !REGX_USERNAME.test(value); break;
         case 'email': isInvalid = !REGX_EMAIL.test(value); break;
         case 'password': isInvalid = !REGX_PSW.test(value); break;
         case 'confirmPassword': isInvalid = value !== Form.password; break;
         default: isInvalid = false;
        }
        setFormValidation(prevForm => ({...prevForm, [name]: isInvalid}))
        return isInvalid
    }

    return [formValidation, 
            isFormValid, handleValidation, 
            handleFormChange, Form, formError, setFormError ]
}
