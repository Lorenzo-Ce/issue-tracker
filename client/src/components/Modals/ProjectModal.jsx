import { Checkbox, Button, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import useAuthorization from '../../hooks/useAuthorization'
import useGetData from '../../hooks/useGetData'
import useSubmitData from '../../hooks/useSubmitData'
import { useForm } from '../../hooks/useForm'
import BasicModal from './BasicModal'
import { Error } from '../Alerts/Error'
import { Success } from '../Alerts/Success'
import { initialFormValues } from '../../utils/initializeForm'
import { NameField } from './components/NameField'
import { DescriptionField } from './components/DescriptionField'
import { RadioField } from './components/RadioField'
import { DateField } from './components/DateField'
import { RolesField } from './components/RolesField'

const ProjectModal = ({ setProjects, isOpen, onClose, formValues = initialFormValues, isEdit = false, route = '/projects', method}) => {
    const {authorization} = useAuthorization()
    const {responseData: usersList } = useGetData('/users')
    const {handleSubmit, payload, resetMessage, successMessage, submitError, isLoadingSubmit } = useSubmitData(route, method)
    const {formValidation, isFormValid, handleValidation, handleFormChange, Form, setForm } = useForm(formValues)
    
    useEffect(()=>{
        setForm(formValues)
    },[formValues])
    useEffect(() => {
        if(successMessage !== ""){
            if(!isEdit){
                setProjects(prevProjects => ([...prevProjects, payload]))
            } else {
                setProjects(prevProjects => {
                    const newProjects = prevProjects.map(project => 
                        project._id ===  payload._id ? 
                        payload : 
                        project)
                
                        return newProjects
                    })
            }
        }
    }, [successMessage])


    const members = usersList.flatMap( ({_id, username}) =>  username !== authorization.username ? 
        [
            <Checkbox key={_id} value={username} checked={Form.members.includes(username)}>
                {username}
            </Checkbox>
        ] : [] 
    )
    return (
        <BasicModal title={`${isEdit ? 'Edit' : 'Create'} Project`}
        isOpen={isOpen} 
        onClose={() => {
            resetMessage()
            onClose()
        }} 
        >
        {submitError !== '' && <Error message={submitError} /> }
        {successMessage !== '' && <Success message={successMessage} /> }
        <VStack as='form'  
            color='blue.800' padding='1em' borderRadius='10px' 
            onSubmit={async (e) =>{ handleSubmit(e, Form)}}
            onChange={(e) => handleValidation(e.target)} 
            spacing='10px'
        >
            <NameField 
                validateName={formValidation.name}
                formName={Form.name}
                handleFormChange={handleFormChange}
                placeholder='Project'
            />
            <DescriptionField 
                validateDescription={formValidation.description}
                formDescription={Form.description}
                handleFormChange={handleFormChange}
                placeholder='Project'
            />
            <RadioField
                title='Status'
                id='status' 
                fields={['Open', 'Paused', 'Closed']}
                formStatus={Form.status}
                handleFormChange={handleFormChange}
            />
            <RolesField 
                members={members}
                formMembers={Form.members}
                setForm={setForm}
                title='Add Members?'
            /> 
            <DateField 
                id='startDate'
                validateDate={formValidation.startDate}
                formDate={Form.startDate}
                handleFormChange={handleFormChange}
                title='Starting'
            />
            <DateField 
                id='endDate'
                validateDate={formValidation.endDate}
                formDate={Form.endDate}
                handleFormChange={handleFormChange}
                title='Target'
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

export default ProjectModal