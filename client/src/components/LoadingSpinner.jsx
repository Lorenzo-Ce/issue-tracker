import { Grid, Spinner} from "@chakra-ui/react"

export const LoadingSpinner = () => {
    
    return(
        <Grid 
        placeContent='center'
        height='80vh'
    >
        <Spinner
            thickness='7px'
            speed='0.7s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
        />
    </Grid>
    )
}