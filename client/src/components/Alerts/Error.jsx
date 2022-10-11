import { Alert, AlertIcon} from '@chakra-ui/react'

export const Error = ({message}) => {
    return(
        <Alert status='error'>
            <AlertIcon />
            {message}
        </Alert>
    )
}