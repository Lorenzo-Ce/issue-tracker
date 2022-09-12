// @ fields: array of strings
// @ value: key value
//@ return: { [field]: key, ...}

const initializeForm = (fields, value) => {
    
    const initialForm = fields.reduce((form, currentField) =>(
        {...form, [currentField]: value}
    ), {})
    
    return initialForm
}

export default initializeForm