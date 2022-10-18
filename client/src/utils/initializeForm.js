// @ fields: object {'field1' : value, 'field2' : value }
// @ value: key value
//@ return: { [field]: key, ...}

const initializeForm = (fields, value) => {
    const keys = Object.keys(fields)
    const initialForm = keys.reduce((form, currentField) =>(
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
    description: '',
    image: {}, 
    status: 'Open',
    label: 'Todo',
    priority: 'Critical', 
    members: [],
    openingDate: '',
    closingDate: '',
    comments: [],
}

export {initializeForm, initialFormValues, initialIssueFormValues}