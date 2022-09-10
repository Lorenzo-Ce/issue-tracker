import { useState } from "react"
import postData from "../utils/postData"
import {REGX_USERNAME, REGX_EMAIL, REGX_PSW} from '../utils/regex'

const useForm = (props) => {
    
    const [registerForm, setForm] = useState({email: '', username: '', password: '', confirmPassword: ''}) 
    const [formValidation, setFormValidation] = useState({email: false, username: false, password: false, confirmPassword: false})
    const [errorMessage, setErrorMessage] = useState('')
    const isFormValid = Object.values(formValidation).every(field => field === false) && Object.values(registerForm).every(field => field !== '')
   
    const handleFormChange = event => {
        const {value, name} = event.target
        setForm((prevRegisterForm) => (
            {...prevRegisterForm,
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
         case 'confirmPassword': isInvalid = value !== registerForm.password; break;
         default: isInvalid = false;
        }
        setFormValidation(prevForm => ({...prevForm, [name]: isInvalid}))
        return isInvalid
    }

    return [formValidation, 
            isFormValid, handleValidation, 
            handleFormChange, registerForm, errorMessage, setErrorMessage ]
}

export {useForm}