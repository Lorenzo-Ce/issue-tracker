import { useState } from "react"

const useForm = () => {
    const [registerForm, setForm] = useState({email: '', username: '', password: ''})
    
    const [formValidation, setFormValidation] = useState({email: false, username: false, password: false, confirmPassword: false})
    
    const isFormValid = Object.values(formValidation).every(field => field === false)

    const REGX_USERNAME = new RegExp("^[A-Za-z0-9_]{4,20}$")
    // (?=.*?[A-Z]) = One uppercase letter (?=.*?[a-z]) = One uppercase letter (?=.*?[0-9]) = One number (?=.*?[#?!@$%^&*-]) = One Symbol {8,} lenght min 8
    const REGX_PSW = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
    const REGX_EMAIL = new RegExp('[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}')
    const handleFormChange = event => {
        const {value, name} = event.target
        setForm((prevRegisterForm) => (
            {...prevRegisterForm,
                [name]: value
            }
        ))
    }

    const [confirmPassword, setConfirmPassword] = useState('')
    const handleConfirmPassword = (event) => {
        const newConfirmPassword = event.target.value
        setConfirmPassword(newConfirmPassword)
    }

    const handleValidation = (event) =>{
        const {value, name} = event.target
        console.log(value + name)
        let isInvalid
        console.log(value)
        switch(name) {
         case 'username': isInvalid = !REGX_USERNAME.test(value); break;
         case 'email': isInvalid = ! REGX_EMAIL.test(value); break;
         case 'password': isInvalid = !REGX_PSW.test(value); break;
         case 'confirmPassword': isInvalid = value !== registerForm.password; break;
         default: isInvalid = false
        }
        console.log(isInvalid)
        setFormValidation(prevForm => ({...prevForm, [name]: isInvalid}))
        console.log(formValidation)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event)
    }
    return [formValidation, handleSubmit, 
            isFormValid, handleValidation, 
            handleFormChange, registerForm, 
            confirmPassword, handleConfirmPassword
            ]
}

export {useForm}