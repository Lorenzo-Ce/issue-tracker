import { useState } from "react"

const useForm = (props) => {
    
    const [registerForm, setForm] = useState({email: '', username: '', password: '', confirmPassword: ''}) 
    const [formValidation, setFormValidation] = useState({email: false, username: false, password: false, confirmPassword: false})
    const isFormValid = Object.values(formValidation).every(field => field === false)

    const REGX_USERNAME = new RegExp("^[A-Za-z0-9_]{4,20}$")
    // (?=.*?[A-Z]) = One uppercase letter (?=.*?[a-z]) = One uppercase letter (?=.*?[0-9]) = One number (?=.*?[#?!@$%^&*-]) = One Symbol {8,} lenght min 8
    const REGX_PSW = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@%^&*-]).{8,}$')
    const REGX_EMAIL = new RegExp('^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&’*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$')
   
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
    const handleSubmit = (event) => {
        event.preventDefault()

        console.log('submitted form')
    }
    return [formValidation, handleSubmit, 
            isFormValid, handleValidation, 
            handleFormChange, registerForm ]
}

export {useForm}