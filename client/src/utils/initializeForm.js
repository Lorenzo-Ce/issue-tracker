// @ fields: array ['field1', 'field2', ...]
// @ value: key value
//@ return: { 'field1': value, ...}

const initializeFormValidation = (fields, value) => {
    const initialForm = fields.reduce((form, currentField) =>(
        {...form, [currentField]: value}
    ), {})
    
    return initialForm
}

const initialFormValues = {
    'name': '', 
    description: '', 
    status: 'Open',
    members: [], 
    startDate: '',
    endDate: ''
} 

const initialIssueFormValues = {
    'name': '', 
    author: '',
    description: '',
    imageToAdd: {}, 
    status: 'Open',
    label: 'Todo',
    priority: 'Critical', 
    members: [],
    openingDate: '',
    closingDate: '',
    comments: [],
}

export {initializeFormValidation, initialFormValues, initialIssueFormValues}