import {FormControl, FormErrorMessage, Input, Checkbox, Button, VStack } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useAuthorization } from '../../hooks/useAuthorization'
import useGetData from '../../hooks/useGetData'
import useSubmitData from '../../hooks/useSubmitData'
import { useForm } from '../../hooks/useForm'
import BasicModal from './BasicModal'
import { Error } from '../Alerts/Error'
import { Success } from '../Alerts/Success'
import { initialIssueFormValues } from '../../utils/initializeForm'
import { NameField } from './components/NameField'
import { DescriptionField } from './components/DescriptionField'
import { RadioField } from './components/RadioField'
import { DateField } from './components/DateField'
import { RolesField } from './components/RolesField'


const issueModal = ({ isOpen, onClose, formValues = initialIssueFormValues, isEdit = false, route = '/projects', method}) => {
    const {authorization} = useAuthorization()
    const {responseData: usersList } = useGetData('/users')
    const {handleSubmit, resetMessage, successMessage, submitError, isLoadingSubmit } = useSubmitData(route, method, true)
    const {formValidation, isFormValid, handleValidation, handleFormChange, Form, setForm } = useForm(formValues)

    useEffect(()=>{
        setForm(formValues)
    },[formValues])

    const members = usersList.flatMap( ({_id, username}) =>  username !== authorization.username ? 
        [
            <Checkbox key={_id} value={username} checked={Form.members.includes(username)}>
                {username}
            </Checkbox>
        ] : 
        [] 
    )
    return (
        <BasicModal title={`Add Issue`}
        isOpen={isOpen} 
        onClose={() => {
            resetMessage()
            onClose()
        }} 
        >
        {submitError !== '' && <Error message={submitError} /> }
        {successMessage !== '' && <Success message={successMessage} /> }
        <VStack 
            as='form'   
            encType="multipart/form-data"
            color='blue.800' padding='1em' borderRadius='10px' 
            onSubmit={(e) => {
                const formData = new FormData()
                Object.entries(Form).map( ([key, value]) => {
                    formData.set(
                        `${key}`, 
                        Array.isArray(value) && key !== 'image' ?
                        JSON.stringify(value) :
                        value
                    )
                })
                console.log(formData)
                handleSubmit(e, formData)
            }}
            onChange={(e) => handleValidation(e.target)} 
            spacing='10px'
        >

            <FormControl 
                id='image' 
                isInvalid={formValidation.image}
            >
                <Input type='file'  
                    name='image'
                    accept='image/*'
                    onChange={handleFormChange}
                />             
                <FormErrorMessage>Image must be 0.5MB and JPG file format</FormErrorMessage>
            </FormControl>
            <NameField 
                validateName={formValidation.name}
                formName={Form.name}
                handleFormChange={handleFormChange}
                placeholder='Issue'
            />
            <DescriptionField 
                validateDescription={formValidation.description}
                formDescription={Form.description}
                handleFormChange={handleFormChange}
                placeholder='Issue'
            /> 
            <RadioField 
                title='Issue Status'
                id='status'
                fields = {['Open', 'Paused', 'Closed']}
                formStatus={Form.status}
                handleFormChange={handleFormChange}        
            />
            <RadioField 
                title='Type of issue'
                id='label'
                fields = {['Todo','Bug','Feature','Design']}
                formStatus={Form.label}
                handleFormChange={handleFormChange}        
            />
            <RadioField 
                title='Issue Priority'
                id='priority'
                fields = {['Critical','Important','Normal','Low']}
                formStatus={Form.priority}
                handleFormChange={handleFormChange}        
            />
            <RolesField 
                members={members}
                formMembers={Form.members}
                setForm={setForm}
                title='Assign Member to issue?'
            /> 
            <DateField 
                id='openingDate'
                validateDate={formValidation.openingDate}
                formDate={Form.openingDate}
                handleFormChange={handleFormChange}
            />  
            <Button type='submit' mb='5px' 
                colorScheme='blue'
                loadingText='Submitting'
                isLoading={isLoadingSubmit} 
                isDisabled={!isFormValid}
            >
                Submit Project
            </Button>
        </VStack>
    </BasicModal>
    )
}

export default issueModal
