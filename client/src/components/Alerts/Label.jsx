import { Box } from "@chakra-ui/react"

export const Label = ({children, cursor = false, padding='0.3em 0.5em'}) => {

    const colorPicker = (key) => {
        let color
        switch (key) {
            case 'Open': color = 'green.100'; break;
            case 'Closed': color = 'red.100'; break;
            case 'Critical': color = 'red.300'; break;
            case 'Important' :
            case 'Paused': color = 'orange.300'; break;
            case 'Normal': color = 'green.300'; break;
            case 'Low': color = 'blue.300'; break;
            default: color=''; break;
        }
        return color
    }
    return(
        <Box 
            fontSize='14px'
            display='inline-block'
            cursor={cursor && 'pointer'}
            p={padding} 
            textAlign='center' 
            borderRadius='50vh'
            bgColor= {colorPicker(children)} 
        >
            {children}
        </Box>
    )
}