import { Box } from "@chakra-ui/react"

export const Label = ({children}) => {

    const colorPicker = (key) => {
        let color
        switch (key) {
            case 'Open': color = 'green.100'; break;
            case 'Closed': color = 'red.100'; break;
            case 'Critical': color = 'red.200'; break;
            case 'Important': color = 'orange.200'; break;
            case 'Normal': color = 'green.200'; break;
            case 'Low': color = 'blue.200'; break;
            case 'Edit': color = 'blue.400'; break;
            default: color=''; break;
        }
        return color
    }
    return(
        <Box 
            p='0.5em' 
            textAlign='center' 
            borderRadius='50vh'
            bgColor= {colorPicker(children)} 
        >
            {children}
        </Box>
    )
}