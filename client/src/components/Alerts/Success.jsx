import { Alert, AlertTitle, AlertIcon} from '@chakra-ui/react'

export const Success = ({message}) => {  
    return(
        <Alert status='success'>
                <AlertIcon />
                <AlertTitle>Success!</AlertTitle>
            {message}
        </Alert>
    )
}