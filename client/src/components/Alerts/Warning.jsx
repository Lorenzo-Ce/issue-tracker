import { Alert, AlertIcon} from '@chakra-ui/react'

export const Warning = ({message}) => {
    return(
        <Alert status='warning'>
            <AlertIcon />
            {message}
        </Alert>
    )
}