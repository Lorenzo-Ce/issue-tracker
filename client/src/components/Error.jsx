import { Box } from '@chakra-ui/react'


export const Error = (props) => {
    const {message} = props
    return(
        <Box textAlign={'left'} p={'.3em'} width="100%" as='span' bg='red.100' color='red.700'>
            {message}
        </Box>
    )
}