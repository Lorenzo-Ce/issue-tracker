import {FormControl, FormErrorMessage, Input, Checkbox, Button, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import useAuthorization from '../../hooks/useAuthorization'
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


const issueModal = ({projectMembers, setProject, isOpen, onClose, formValues = initialIssueFormValues, isEdit = false, route = '/projects', method, handleIssueInformation}) => {
    const fieldsToValidate = ['name', 'description', 'imageToAdd', 'openingDate', 'closingDate']
    const {authorization} = useAuthorization()
    const {handleSubmit, payload: updatedIssues, resetMessage, successMessage: successSubmitMessage, submitError, isLoadingSubmit } = useSubmitData(route, method, true)
    const {formValidation, isFormValid, handleValidation, handleFormChange, Form, setForm, setFormValidation } = useForm(formValues, fieldsToValidate)

    useEffect(()=>{
        setForm(() => ({...formValues, author: authorization.username}))
    },[formValues])

    useEffect(() => {
        if(successSubmitMessage !== ""){
            setProject(prevProject => ({...prevProject, issues: updatedIssues }))
            isEdit && handleIssueInformation( Form._id, updatedIssues)
        }
    }, [successSubmitMessage])
    
    const projectMembersList = projectMembers?.length > 0 ? 
        projectMembers?.flatMap( username => 
            username !== authorization.username ? 
            [
                <Checkbox key={username} value={username} checked={Form?.members?.includes(username)}>
                    {username}
                </Checkbox>
            ] : 
            []
        ) : 
        []

    return (
        <BasicModal title={`${isEdit ? 'Edit' : 'Add'} Issue`}
        isOpen={isOpen} 
        onClose={() => {
            resetMessage()
            setFormValidation((prevVal) => ({...prevVal, imageToAdd: false}))
            onClose()
        }} 
        >
        {submitError !== '' && <Error message={submitError} /> }
        {successSubmitMessage !== '' && <Success message={successSubmitMessage} /> }
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
                id='imageToAdd' 
                isInvalid={formValidation.imageToAdd}
            >
                <Input type='file'  
                    name='imageToAdd'
                    accept='image/*'
                    onChange={handleFormChange}
                />             
                <FormErrorMessage>Image must be &lt;0.5MB and JPG file format</FormErrorMessage>
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
                members={projectMembersList}
                formMembers={Form.members}
                setForm={setForm}
                title='Assign Dev to issue?'
            /> 
            <DateField 
                title='Opening'
                id='openingDate'
                validateDate={formValidation.openingDate}
                formDate={Form.openingDate}
                handleFormChange={handleFormChange}
            />  
            <DateField 
                title='Deadline'
                id='closingDate'
                validateDate={formValidation.closingDate}
                formDate={Form.closingDate}
                handleFormChange={handleFormChange}
            />  
            <Button type='submit' mb='5px' 
                colorScheme='blue'
                loadingText='Submitting'
                isLoading={isLoadingSubmit} 
                isDisabled={!isFormValid || authorization.username === 'GuestAccount'}
            >
                Submit Issue
            </Button>
        </VStack>
    </BasicModal>
    )
}

export default issueModal
